// src/lib/shopify/mutations/cart.ts
import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";
import productFragment from "../fragments/product";
import cartFragment from "../fragments/cart";

// Create
export const createCartMutation = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  ${cartFragment}
  mutation createCart {
    cartCreate { cart { ...cart } }
  }
`;

// Add lines
export const addToCartMutation = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  ${cartFragment}
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...cart }
    }
  }
`;

// Update lines
export const editCartItemsMutation = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  ${cartFragment}
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...cart }
    }
  }
`;

// Remove lines
export const removeFromCartMutation = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  ${cartFragment}
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...cart }
    }
  }
`;
