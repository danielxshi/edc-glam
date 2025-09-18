// src/app/api/account/activate/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { activateCustomer } from "@/lib/shopify";


export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();
    if (!id || !token || !password) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const { customerAccessToken, userErrors } = await activateCustomer({ id, token, password });

    if (userErrors?.length) {
      return NextResponse.json({ ok: false, result: { userErrors } }, { status: 400 });
    }

    if (customerAccessToken?.accessToken) {
      const ttl =
        Math.max(1, Math.floor((+new Date(customerAccessToken.expiresAt) - Date.now()) / 1000)) ||
        60 * 60 * 24 * 14;

      // Next 14+ cookies() is sync; remove await
      (await cookies()).set("sf_customer_token", customerAccessToken.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: ttl,
        path: "/",
      });
    }

    return NextResponse.json({ ok: true, result: { customerAccessToken } });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Activation error" }, { status: 400 });
  }
}
