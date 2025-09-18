import { NextResponse } from "next/server";
import { activateCustomer } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();
    if (!id || !token || !password) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    const { customerAccessToken } = await activateCustomer({ id, token, password });
    const accessToken = customerAccessToken?.accessToken;
    const expiresAt = customerAccessToken?.expiresAt;

    if (!accessToken || !expiresAt) {
      return NextResponse.json({ ok: false, error: "No access token returned" }, { status: 400 });
    }

    // Compute cookie maxAge (seconds)
    const maxAge =
      Math.max(1, Math.floor((+new Date(expiresAt) - Date.now()) / 1000)) ||
      60 * 60 * 24 * 14;

    // Create the response and set the cookie on it
    const res = NextResponse.json({ ok: true });

    res.cookies.set("sf_customer_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Activation error" },
      { status: 400 }
    );
  }
}
