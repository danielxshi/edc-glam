// src/lib/shopify/queries/product.ts
import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";
import productFragment from "../fragments/product";

export const getProductsQuery = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  query getProducts($sortKey: ProductSortKeys, $reverse: Boolean, $query: String) {
    products(first: 100, sortKey: $sortKey, reverse: $reverse, query: $query) {
      edges { node { ...product } }
    }
  }
`;

export const getProductQuery = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  query getProduct($handle: String!) {
    product(handle: $handle) { ...product }
  }
`;

export const getProductRecommendationsQuery = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) { ...product }
  }
`;
