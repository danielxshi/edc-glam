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

    // Shopify Admin API needs a GID, not the raw numeric id from the email link
    const gid = id.startsWith("gid://") ? id : `gid://shopify/Customer/${id}`;

    const result = await activateCustomer({ id: gid, token, password });

    // If Shopify returns userErrors, show the first one to the client
    const userErrors = result?.userErrors || [];
    if (userErrors.length) {
      return NextResponse.json(
        { ok: false, error: userErrors[0]?.message || "Activation failed", result },
        { status: 400 }
      );
    }

    // Optional: set a session cookie if you want auto-login after activation
    const at = result.customerAccessToken;
    if (at?.accessToken && at?.expiresAt) {
      const maxAge =
        Math.max(1, Math.floor((+new Date(at.expiresAt) - Date.now()) / 1000)) ||
        60 * 60 * 24 * 14;

      (await cookies()).set("sf_customer_token", at.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge,
        path: "/",
      });
    }

    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("activate API error", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Activation error" },
      { status: 400 }
    );
  }
}
