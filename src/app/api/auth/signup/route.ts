import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_CREATE, MUT_LOGIN } from "@/lib/customer-queries";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();

  // 1) Create the customer (with password)
  const create = await shopifyFetch<any>({
    query: MUT_CUSTOMER_CREATE,
    variables: { input: { email, password, firstName, lastName } },
    cache: "no-store",
  });

  const ce = create?.body?.data?.customerCreate?.customerUserErrors || [];
  if (ce.length) {
    return NextResponse.json({ error: ce[0].message }, { status: 400 });
  }

  // 2) Login immediately (some shops may still require activation – handle below)
  const login = await shopifyFetch<any>({
    query: MUT_LOGIN,
    variables: { email, password },
    cache: "no-store",
  });

  const lr = login?.body?.data?.customerAccessTokenCreate;
  const le = lr?.customerUserErrors || [];
  if (le.length || !lr?.customerAccessToken) {
    // If the account is disabled/needs activation, you'll get an error here.
    const msg = le[0]?.message || "Account requires activation. Check your email.";
    return NextResponse.json({ error: msg }, { status: 202 }); // 202 = created but not logged in
  }

  const { accessToken, expiresAt } = lr.customerAccessToken;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sf_customer_token", accessToken, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/",
    expires: new Date(expiresAt),
  });
  return res;
}
