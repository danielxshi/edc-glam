import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_UPDATE } from "@/lib/customer-queries";

const ALLOWED = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "acceptsMarketing",
  "password",          // optional, for password change
] as const;

function pickAllowed(o: any) {
  const out: any = {};
  for (const k of ALLOWED) {
    if (o?.[k] !== undefined && o[k] !== "") out[k] = o[k];
  }
  return out;
}

export async function POST(req: Request) {
  const jar = await cookies();
  const token = jar.get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const payload = await req.json().catch(() => ({}));
  const customer = pickAllowed(payload);

  const r = await shopifyFetch({
    query: MUT_CUSTOMER_UPDATE,
    variables: { accessToken: token, customer },
    cache: "no-store",
  });

  const data = r?.body?.data?.customerUpdate;
  const errs = data?.customerUserErrors;
  if (errs?.length) {
    return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });
  }

  // If Shopify returned a new access token (e.g., password/email change), persist it
  const newTok = data?.customerAccessToken?.accessToken;
  const exp = data?.customerAccessToken?.expiresAt;
  if (newTok && exp) {
    jar.set("sf_customer_token", newTok, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      expires: new Date(exp),
    });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
