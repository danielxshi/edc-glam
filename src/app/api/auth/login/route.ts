import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_LOGIN } from "@/lib/customer-queries";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const r = await shopifyFetch<any>({
    query: MUT_LOGIN,
    variables: { email, password },
    cache: "no-store",
  });

  const data = r?.body?.data?.customerAccessTokenCreate;
  if (data?.customerUserErrors?.length || !data?.customerAccessToken) {
    return NextResponse.json(
      { error: data?.customerUserErrors?.[0]?.message || "Invalid login" },
      { status: 401 }
    );
  }

  const { accessToken, expiresAt } = data.customerAccessToken;
  const res = NextResponse.json({ ok: true });
  res.cookies.set("sf_customer_token", accessToken, {
    httpOnly: true, sameSite: "lax", secure: true, path: "/",
    expires: new Date(expiresAt),
  });
  return res;
}
