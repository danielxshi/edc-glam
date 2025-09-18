// lib/shopify-storefront.ts
export async function shopifyFetch<T>(query: string, variables?: Record<string, any>) {
  const domain  = process.env.SHOPIFY_STORE_DOMAIN;            // edc-glam.myshopify.com
  const version = process.env.SHOPIFY_STOREFRONT_API_VERSION;  // e.g. 2024-10
  const token   = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN; // Storefront token (server-side)

  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!, // <-- correct header
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.errors) {
    console.error("Storefront error", { status: res.status, body: json });
    throw new Error("Shopify Storefront request failed");
  }
  return json.data as T;
}
