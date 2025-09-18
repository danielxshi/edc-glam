// src/lib/shopify/mutations/customer.ts
export const customerActivateMutation = /* GraphQL */ `
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
        firstName
        lastName
        email
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`;
