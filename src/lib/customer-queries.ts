// Queries & mutations for Shopify Storefront API (2024-04+)

export const MUT_CUSTOMER_CREATE = /* GraphQL */ `
  mutation CustomerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const MUT_LOGIN = /* GraphQL */ `
  mutation Login($email: String!, $password: String!) {
    customerAccessTokenCreate(input: { email: $email, password: $password }) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const MUT_LOGOUT = /* GraphQL */ `
  mutation Logout($accessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $accessToken) {
      deletedAccessToken
      userErrors {
        field
        message
      }
    }
  }
`;

// ✅ make sure this is exported
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

// lib/customer-queries.ts
export const QUERY_CUSTOMER_ORDERS = /* GraphQL */ `
  query CustomerOrders($accessToken: String!, $first: Int!, $after: String) {
    customer(customerAccessToken: $accessToken) {
      id
      orders(
        first: $first
        after: $after
        sortKey: PROCESSED_AT
        reverse: true
      ) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            id
            orderNumber
            processedAt
            statusUrl
            financialStatus
            fulfillmentStatus
            totalPriceV2 {
              amount
              currencyCode
            }
            subtotalPriceV2 {
              amount
              currencyCode
            }
            totalShippingPriceV2 {
              amount
              currencyCode
            }
            totalTaxV2 {
              amount
              currencyCode
            }
            lineItems(first: 6) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  title
                  quantity
                  variant {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

// Fetch addresses (and defaultAddress)
export const QUERY_CUSTOMER_ADDRESSES = /* GraphQL */ `
  query CustomerAddresses($accessToken: String!, $first: Int!) {
    customer(customerAccessToken: $accessToken) {
      id
      defaultAddress {
        id
      }
      addresses(first: $first) {
        edges {
          node {
            id
            firstName
            lastName
            address1
            address2
            city
            province
            zip
            country
            phone
          }
        }
      }
    }
  }
`;

export const MUT_CUSTOMER_ADDRESS_CREATE = /* GraphQL */ `
  mutation CreateAddress(
    $accessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $accessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const MUT_CUSTOMER_ADDRESS_UPDATE = /* GraphQL */ `
  mutation UpdateAddress(
    $accessToken: String!
    $id: ID!
    $address: MailingAddressInput!
  ) {
    customerAddressUpdate(
      customerAccessToken: $accessToken
      id: $id
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const MUT_CUSTOMER_ADDRESS_DELETE = /* GraphQL */ `
  mutation DeleteAddress($accessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $accessToken, id: $id) {
      deletedCustomerAddressId
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

export const MUT_CUSTOMER_DEFAULT_ADDRESS = /* GraphQL */ `
  mutation SetDefaultAddress($accessToken: String!, $addressId: ID!) {
    customerDefaultAddressUpdate(
      customerAccessToken: $accessToken
      addressId: $addressId
    ) {
      customer {
        id
      }
      customerUserErrors {
        field
        message
        code
      }
    }
  }
`;

// Read details for the form
export const QUERY_ACCOUNT_DETAILS = /* GraphQL */ `
  query AccountDetails($accessToken: String!) {
    customer(customerAccessToken: $accessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
    }
  }
`;

// Update name/email/phone/password/acceptsMarketing
export const MUT_CUSTOMER_UPDATE = /* GraphQL */ `
  mutation CustomerUpdate(
    $accessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $accessToken
      customer: $customer
    ) {
      customer {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
      }
      customerAccessToken {        # Shopify may return a new token (e.g., password change)
        accessToken
        expiresAt
      }
      customerUserErrors { field message code }
    }
  }
`;
