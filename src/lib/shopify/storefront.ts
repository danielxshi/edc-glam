// lib/shopify-storefront.ts
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(`https://${process.env.SHOPIFY_STORE_DOMAIN}/api/${process.env.SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    ...init,
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Shopify error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data as T;
}
