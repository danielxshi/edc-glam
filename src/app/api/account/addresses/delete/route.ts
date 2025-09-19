// app/api/account/addresses/delete/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_ADDRESS_DELETE } from "@/lib/customer-queries";

export async function POST(req: Request) {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id } = await req.json();

  const r = await shopifyFetch<any>({
    query: MUT_CUSTOMER_ADDRESS_DELETE,
    variables: { accessToken: token, id } as any, // <-- fix: cast variables
    cache: "no-store",
  });

  const errs = r?.body?.data?.customerAddressDelete?.customerUserErrors;
  if (errs?.length) return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
