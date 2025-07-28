// File: app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer/footer";
import { CartProvider } from "@/components/cart/cart-context";
import { cookies } from "next/headers";
import { getCart } from "../lib/shopify";
import PageWrapper from "@/components/layout/page-wrapper";
import { TransitionProvider } from "@/components/layout/transition/transition-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EDCGLAM",
  description: "Salon quality press on nails, press on nail art.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider cartPromise={cart}>
          {/* <TransitionProvider> */}
            <Navbar />
            <PageWrapper>{children}</PageWrapper>
            <Footer />
          {/* </TransitionProvider> */}
        </CartProvider>
      </body>
    </html>
  );
}