// app/api/account/addresses/default/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_DEFAULT_ADDRESS } from "@/lib/customer-queries";

export async function POST(req: Request) {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await req.json(); // addressId

  const r = await shopifyFetch<any>({
    query: MUT_CUSTOMER_DEFAULT_ADDRESS,
    variables: { accessToken: token, addressId: id } as any, // <-- TS-safe cast
    cache: "no-store",
  });

  const errs = r?.body?.data?.customerDefaultAddressUpdate?.customerUserErrors;
  if (errs?.length) {
    return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
