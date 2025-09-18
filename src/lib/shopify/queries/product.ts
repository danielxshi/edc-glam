// src/lib/shopify/queries/product.ts
import { productFragment } from "../fragments/product";

export const getProductsQuery = /* GraphQL */ `
  ${productFragment}
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: 100, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges { node { ...product } }
    }
  }
`;

export const getProductQuery = /* GraphQL */ `
  ${productFragment}
  query getProduct($handle: String!) {
    product(handle: $handle) { ...product }
  }
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  ${productFragment}
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...product
    }
  }
`;
