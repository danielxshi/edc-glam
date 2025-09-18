import { productFragment } from "../fragments/product";
import { cartFragment } from "../fragments/cart";

export const getCartQuery = /* GraphQL */ `
  ${productFragment}
  ${cartFragment}
  query getCart($cartId: ID!) {
    cart(id: $cartId) { ...cart }
  }
`;
