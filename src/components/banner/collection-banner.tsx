"use client";

import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import FallbackImage from "@/components/fallback-image";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function CollectionBanner({
  defaultHandle = "test",
  className = "",
}: {
  defaultHandle?: string;
  className?: string;
}) {
  const params = useParams(); // /search/[collection]
  const sp = useSearchParams(); // ?collection=...
  const routeHandle = (params?.collection as string) || "";
  const queryHandle = sp?.get("collection") || "";
  const handle = routeHandle || queryHandle || defaultHandle;

  useEffect(() => {
    console.log("[CollectionBanner] handle:", {
      routeHandle,
      queryHandle,
      defaultHandle,
      handle,
    });
  }, [routeHandle, queryHandle, defaultHandle, handle]);

  const { data, error, isLoading } = useSWR(
    handle ? `/api/collections/${handle}?first=24` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div
        className={`h-64 md:h-96 w-full bg-neutral-100 animate-pulse ${className}`}
      />
    );
  }

  if (error || !data?.collection) {
    return (
      <div
        className={`h-64 md:h-96 w-full bg-neutral-100 grid place-items-center ${className}`}
      >
        <h2 className="text-lg font-semibold">Collection</h2>
      </div>
    );
  }

  const { collection } = data;

  return (
    <section className={`relative w-full overflow-hidden  ${className}`}>
      <div className="relative h-64 md:h-96 mt-[10.75rem]">
        <FallbackImage
          src={
            collection.image?.url ||
            "https://nailcissist.com/cdn/shop/files/Homepage_Banner.png?v=1732345686&width=1728"
          } // <-- leave empty string so you can set your own later
          alt={collection.image?.altText ?? collection.title}
          width={collection.image?.width || 1600}
          height={collection.image?.height || 900}
          className="absolute inset-0 h-full w-full object-cover scale-[1.3] -translate-y-[35px]"
          priority
        />
        <div className="absolute inset-0 " />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="px-3 text-center text-white text-xl md:text-3xl font-bold tracking-wide">
            {collection.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
