// src/components/banner/collection-banner.tsx
"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import FallbackImage from "@/components/fallback-image";

type ShopifyImage = {
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function CollectionBanner({
  defaultHandle = "test",
  className = "",
  hardFallbackSrc = "/images/default-collection-hero.jpg", // put this file in /public/images/
}: {
  defaultHandle?: string;
  className?: string;
  hardFallbackSrc?: string;
}) {
  const sp = useSearchParams();
  const handle = sp?.get("collection") || defaultHandle;

  const { data, error, isLoading } = useSWR(
    handle ? `/api/collections/${handle}?first=24` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div className={`h-48 md:h-64 w-full bg-neutral-100 animate-pulse ${className}`} />
    );
  }

  if (error || !data) {
    return (
      <div className={`h-48 md:h-64 w-full bg-neutral-100 grid place-items-center ${className}`}>
        <h2 className="text-lg font-semibold">Collection</h2>
      </div>
    );
  }

  const { collection, products } = data as {
    collection: { title?: string; image?: ShopifyImage | null } | null;
    products: Array<{ featuredImage?: ShopifyImage | null }>;
  };

  // Build a safe hero image: collection cover -> first product image -> hard fallback
  const hero: ShopifyImage | null =
    collection?.image ??
    products?.[0]?.featuredImage ??
    (hardFallbackSrc
      ? { url: hardFallbackSrc, altText: collection?.title ?? "Collection" }
      : null);

  return (
    <section className={`relative w-full overflow-hidden ${className}`}>
      {hero?.url ? (
        <div className="relative h-48 md:h-64">
          <FallbackImage
            src={collection?.image?.url ?? hero.url}
            alt={hero.altText ?? collection?.title ?? "Collection"}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="px-3 text-center text-white text-xl md:text-3xl font-bold tracking-wide">
              {collection?.title ?? "Collection"}
            </h1>
          </div>
        </div>
      ) : (
        <div className="h-48 md:h-64 w-full bg-neutral-100 grid place-items-center">
          <h1 className="text-xl md:text-3xl font-bold">
            {collection?.title ?? "Collection"}
          </h1>
        </div>
      )}
    </section>
  );
}
