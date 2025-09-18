// Queries & mutations for Shopify Storefront API (2024-04+)

export const MUT_CUSTOMER_CREATE = /* GraphQL */ `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id email }
      customerUserErrors { field message code }
    }
  }
`;

export const MUT_LOGIN = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { field message code }
    }
  }
`;

export const MUT_LOGOUT = /* GraphQL */ `
  mutation Logout($accessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $accessToken) {
      deletedAccessToken
      userErrors { field message }
    }
  }
`;

export const QUERY_ME = /* GraphQL */ `
  query Me($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      email
      firstName
      lastName
    }
  }
`;
