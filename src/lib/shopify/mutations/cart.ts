// src/lib/shopify/mutations/cart.ts
import { productFragment } from "../fragments/product";
import { cartFragment } from "../fragments/cart";

export const createCartMutation = /* GraphQL */ `
  ${productFragment}
  ${cartFragment}
  mutation createCart {
    cartCreate { cart { ...cart } }
  }
`;

export const addToCartMutation = /* GraphQL */ `
  ${productFragment}
  ${cartFragment}
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ...cart } }
  }
`;

export const editCartItemsMutation = /* GraphQL */ `
  ${productFragment}
  ${cartFragment}
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ...cart } }
  }
`;

export const removeFromCartMutation = /* GraphQL */ `
  ${productFragment}
  ${cartFragment}
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ...cart } }
  }
`;
