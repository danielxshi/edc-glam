import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STOREFRONT_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2024-10/graphql.json`;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function POST(req: Request) {
  try {
    const { id, token, password } = await req.json();

    // Basic validation
    if (!id || !token || !password) {
      return NextResponse.json(
        { ok: false, error: "Missing fields" },
        { status: 400 }
      );
    }
    if (!STOREFRONT_TOKEN || !process.env.SHOPIFY_STORE_DOMAIN) {
      return NextResponse.json(
        { ok: false, error: "Server is missing Storefront API env vars" },
        { status: 500 }
      );
    }

    // Shopify requires a GID format for the ID
    const gid =
      typeof id === "string" && id.startsWith("gid://shopify/Customer/")
        ? id
        : `gid://shopify/Customer/${id}`;

    const body = {
      query: `
        mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
          customerActivate(id: $id, input: $input) {
            customer { id email }
            customerAccessToken { accessToken expiresAt }
            userErrors { field message }
          }
        }
      `,
      variables: {
        id: gid,
        input: {
          activationToken: token,
          password,
        },
      },
    };

    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN!,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await res.json();

    console.log("Activate request vars:", JSON.stringify(body.variables));
    console.log("Shopify activate response:", JSON.stringify(json, null, 2));

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: "Storefront API request failed" },
        { status: 502 }
      );
    }

    if (json.errors?.length) {
      return NextResponse.json(
        { ok: false, error: json.errors[0]?.message || "GraphQL error" },
        { status: 400 }
      );
    }

    const payload = json?.data?.customerActivate;
    if (!payload) {
      return NextResponse.json(
        { ok: false, error: "Unexpected Storefront API response" },
        { status: 500 }
      );
    }

    const { userErrors, customerAccessToken } = payload;

    if (userErrors?.length) {
      const msg =
        userErrors[0]?.message ||
        (Array.isArray(userErrors[0]?.field)
          ? userErrors[0].field.join(".")
          : "Activation failed");
      return NextResponse.json({ ok: false, error: msg }, { status: 400 });
    }

    if (!customerAccessToken?.accessToken) {
      return NextResponse.json(
        { ok: false, error: "No access token returned" },
        { status: 400 }
      );
    }

    const maxAge =
      Math.max(
        1,
        Math.floor(
          (new Date(customerAccessToken.expiresAt).getTime() - Date.now()) / 1000
        )
      ) || 60 * 60 * 24 * 14;

    const c = await cookies();
    c.set("sf_customer_token", customerAccessToken.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Activation route error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown server error" },
      { status: 500 }
    );
  }
}
