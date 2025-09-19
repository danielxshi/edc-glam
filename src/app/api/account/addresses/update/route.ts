// app/api/account/addresses/update/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_ADDRESS_UPDATE } from "@/lib/customer-queries";

const ALLOWED = [
  "firstName", "lastName", "company", "address1", "address2",
  "city", "province", "zip", "country", "phone",
] as const;

function sanitize(addr: any) {
  const out: any = {};
  for (const k of ALLOWED) if (addr?.[k] != null && addr[k] !== "") out[k] = addr[k];
  return out;
}

export async function POST(req: Request) {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const { id, address } = await req.json(); // { id, address }
  const addressInput = sanitize(address);    // drop id/unknown keys

  const r = await shopifyFetch<any>({
    query: MUT_CUSTOMER_ADDRESS_UPDATE,
    variables: { accessToken: token, id, address: addressInput } as any, // TS-safe cast
    cache: "no-store",
  });

  const errs = r?.body?.data?.customerAddressUpdate?.customerUserErrors;
  if (errs?.length) return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
