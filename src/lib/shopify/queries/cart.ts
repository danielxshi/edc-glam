import imageFragment from "../fragments/image";
import seoFragment from "../fragments/seo";
import productFragment from "../fragments/product";
import cartFragment from "../fragments/cart";

export const getCartQuery = /* GraphQL */ `
  ${imageFragment}
  ${seoFragment}
  ${productFragment}
  ${cartFragment}
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cart
    }
  }
`;
