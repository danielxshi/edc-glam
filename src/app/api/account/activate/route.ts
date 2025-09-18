import { NextResponse } from "next/server";
import { activateCustomer } from "@/lib/shopify";

export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();

    if (!id || !token || !password) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Convert numeric id -> GraphQL GID
    const gid = id.startsWith("gid://")
      ? id
      : `gid://shopify/Customer/${id}`;

    // Decode the token from the URL
    const decodedToken = decodeURIComponent(token);

    const result = await activateCustomer({
      id: gid,
      token: decodedToken,
      password,
    });

    // If Shopify returns userErrors, surface them so we can see the cause
    const errs = result?.userErrors ?? [];
    if (errs.length) {
      return NextResponse.json(
        {
          ok: false,
          error: errs.map(e => e.message).join("; "),
          userErrors: errs,
        },
        { status: 400 }
      );
    }

    // If you also set a cookie here, keep it — but not required for success:
    // const { accessToken, expiresAt } = result.customerAccessToken ?? {};
    // ...

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Activation error" },
      { status: 400 }
    );
  }
}
