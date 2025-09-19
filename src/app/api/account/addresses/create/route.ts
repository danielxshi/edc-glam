// app/api/account/addresses/create/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { MUT_CUSTOMER_ADDRESS_CREATE } from "@/lib/customer-queries";

const ALLOWED = [
  "firstName",
  "lastName",
  "company",
  "address1",
  "address2",
  "city",
  "province",
  "zip",
  "country",
  "phone",
] as const;

const sanitize = (a: any) =>
  Object.fromEntries(
    (ALLOWED as readonly string[]).flatMap((k) =>
      a?.[k] != null && a[k] !== "" ? [[k, a[k]]] : []
    )
  );

export async function POST(req: Request) {
  const token = (await cookies()).get("sf_customer_token")?.value; // Await cookies() to resolve the Promise
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const addr = await req.json();
  const address = sanitize(addr); // strips unknown keys like "id"

  const r = await shopifyFetch<any>({
    query: MUT_CUSTOMER_ADDRESS_CREATE,
    variables: { accessToken: token, address } as any, // ✅ TS-safe cast (matches your shopifyFetch typing)
    cache: "no-store",
  });

  const errs = r?.body?.data?.customerAddressCreate?.customerUserErrors;
  if (errs?.length) {
    return NextResponse.json({ error: errs[0].message, errs }, { status: 400 });
  }

  return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
