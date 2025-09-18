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
          }`,
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
  if (
    !res.ok ||
    json.errors ||
    json.data.customerActivate.userErrors.length
  ) {
    console.error(json);
    throw new Error("Activation failed");
  }

  return json.data.customerActivate;
}
