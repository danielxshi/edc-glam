export async function activateCustomer({
  id,
  token,
  password,
}: {
  id: string;
  token: string;
  password: string;
}) {
  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Must be the Admin API access token (private app/custom app)
        "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!,
      },
      body: JSON.stringify({
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
          id,
          input: {
            activationToken: token,
            password,
          },
        },
      }),
    }
  );

  const json = await res.json();

  // Let the caller decide — return the whole payload
  if (!res.ok || json.errors) {
    // network/GraphQL errors
    throw new Error(JSON.stringify(json.errors ?? json, null, 2));
  }

  return json.data.customerActivate;
}
