// src/lib/shopify/queries/collection.ts
import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";
import productFragment from "../fragments/product";
import collectionFragment from "../fragments/collection";

export const getCollectionsQuery = /* GraphQL */ `
  ${seoFragment}
  ${collectionFragment}
  query getCollections {
    collections(first: 100, sortKey: TITLE) {
      edges { node { ...collection } }
    }
  }
`;

export const getCollectionProductsQuery = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
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
