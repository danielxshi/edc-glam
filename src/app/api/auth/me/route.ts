// app/api/auth/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_ME } from "@/lib/customer-queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const token = (await cookies()).get("sf_customer_token")?.value;
  const headers = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0" };

  if (!token) return NextResponse.json({ customer: null }, { headers });

  const r = await shopifyFetch<any>({
    query: QUERY_ME,
    variables: { accessToken: token },
    cache: "no-store",
  });

  return NextResponse.json({ customer: r?.body?.data?.customer || null }, { headers });
}
