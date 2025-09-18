import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_ME } from "@/lib/customer-queries";

export async function GET() {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return NextResponse.json({ customer: null });

  const r = await shopifyFetch<any>({
    query: QUERY_ME,
    variables: { accessToken: token },
    cache: "no-store",
  });

  return NextResponse.json({ customer: r?.body?.data?.customer || null });
}
