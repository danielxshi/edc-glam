// components/product/ProductGridItems.tsx
"use client";

import { Product } from "../../lib/shopify/types";
import Grid from "../grid";
import Link from "next/link";
import { GridTileImage } from "../grid/tile";
import { motion } from "framer-motion";

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle}>
          <Link
            href={`/product/${product.handle}`}
            className="relative block h-full w-full overflow-hidden rounded-md"
            prefetch={false}
          >
            {/* image container with a subtle scale/opacity rise */}
            <motion.div
              initial={{ scale: 1.05, opacity: 0.6 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="relative h-full w-full"
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                // Next/Image lazy-loads by default when not priority.
                // If your GridTileImage forwards props to <Image>, this enforces it:
                loading="lazy" // safe no-op if not forwarded
                decoding="async"
              />
            </motion.div>

            {/* mask reveal: a sliding block that uncovers the image */}
            <motion.span
              aria-hidden
              className="absolute inset-0 z-10 block bg-neutral-200 "
              initial={{ x: 0 }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform" }}
            />

            {/* optional: a second, thinner mask to create a crisp trailing edge */}
            <motion.span
              aria-hidden
              className="absolute inset-0 z-10 block bg-white "
              initial={{ x: 0 }}
              whileInView={{ x: "101%" }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              viewport={{ once: true, amount: 0.3 }}
              style={{ willChange: "transform" }}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
