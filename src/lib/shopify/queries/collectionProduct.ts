import { productFragment } from "../fragments/product";
import { collectionFragment } from "../fragments/collection";

export const GET_COLLECTION_PRODUCTS = /* GraphQL */ `
  ${productFragment}
  ${collectionFragment}
  query getCollectionProducts(
    $handle: String!
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $first: Int = 100
  ) {
    collection(handle: $handle) {
      ...collection
      products(first: $first, sortKey: $sortKey, reverse: $reverse) {
        edges { node { ...product } }
      }
    }
  }
`;
