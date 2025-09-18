// Server-only helper
export async function activateCustomer(params: {
  id: string;          // numeric or gid ok
  token: string;
  password: string;    // we will generate one if you don't pass it
}) {
  const { id, token, password } = params;

  // Ensure GID format for Admin GraphQL
  const gid = id.startsWith("gid://")
    ? id
    : `gid://shopify/Customer/${id}`;

  const res = await fetch(
    `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2024-10/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token":
          process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({
        query: `
          mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
            customerActivate(id: $id, input: $input) {
              customer { id email }
              customerAccessToken { accessToken expiresAt }
              userErrors { field message code }
            }
          }`,
        variables: {
          id: gid,
          input: {
            activationToken: token,
            password,
          },
        },
      }),
    }
  );

  const json = await res.json();

  // Network/GraphQL errors
  if (!res.ok || json.errors) {
    throw new Error(
      `Admin API error: ${JSON.stringify(json.errors ?? json, null, 2)}`
    );
  }

  const act = json.data?.customerActivate;
  const ue = act?.userErrors ?? [];
  if (ue.length) {
    // Common codes: CUSTOMER_ALREADY_ENABLED, INVALID
    const msg = ue.map((e: any) => e.message).join("; ");
    const code = ue.map((e: any) => e.code).filter(Boolean).join(", ");
    const err = new Error(`Activation failed: ${msg}${code ? ` (${code})` : ""}`);
    (err as any).userErrors = ue;
    throw err;
  }

  return act as {
    customer: { id: string; email: string };
    customerAccessToken: { accessToken: string; expiresAt: string } | null;
  };
}
