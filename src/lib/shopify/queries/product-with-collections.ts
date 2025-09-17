export const getProductWithCollectionsQuery = /* GraphQL */ `
  query getProductWithCollections($handle: String!, $first: Int = 1) {
    product(handle: $handle) {
      id
      title
      description
      handle
      featuredImage {
        url
        altText
        width
        height
      }
      tags
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
`;
