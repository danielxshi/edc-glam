// src/lib/shopify/fragments/collection.ts
export const collectionFragment = /* GraphQL */ `
  fragment collection on Collection {
    handle
    title
    description
    updatedAt
    image { url altText width height }
    seo {                       # ← inline SEO fields here to avoid a second 'seo' fragment
      title
      description
    }
  }
`;
