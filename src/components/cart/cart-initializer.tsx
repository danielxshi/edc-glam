// app/components/cart/CartInitializer.tsx
import { cookies } from "next/headers";
import { getCart } from "@/lib/shopify";
import { CartProvider } from "./cart-context";

export default async function CartInitializer({ children }: { children: React.ReactNode }) {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = await getCart(cartId);
  return <CartProvider cartPromise={Promise.resolve(cart)}>{children}</CartProvider>;
}
