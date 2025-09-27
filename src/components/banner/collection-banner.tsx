"use client";

import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import FallbackImage from "@/components/fallback-image";

const fetcher = (u: string) => fetch(u).then((r) => r.json());

// 1) Map friendly/ambiguous handles to your API's canonical handles.
//    If your API accepts "all" already, keep it mapped to "all".
//    If your API wants "all-products", change the value below.
const HANDLE_ALIASES: Record<string, string> = {
  all: "all", // change to "all-products" if that's what your API expects
  "all-products": "all", // tolerate both forms inbound; fetch canonical "all"
};

// 2) Normalize incoming handles from route/search to a clean Shopify handle
function normalizeHandle(raw?: string | null): string {
  if (!raw) return "";
  let h = raw.trim();

  // Strip full URLs or path-like values (/collections/foo, collections/foo, /foo)
  try {
    // If raw is a path or full URL, URL() will normalize it
    const u = new URL(h, "https://example.com");
    h = u.pathname || h;
  } catch {
    // ignore if not a URL
  }
  h = h
    .replace(/^\/+/, "")
    .replace(/^collections\//, "")
    .replace(/^\/?collections\//, "")
    .replace(/^\/+/, "");

  // Remove trailing slashes or query junk just in case
  h = h.replace(/\/+$/, "").split("?")[0];

  // Lowercase for consistency
  h = h.toLowerCase();

  // Apply alias mapping
  if (HANDLE_ALIASES[h]) return HANDLE_ALIASES[h];
  return h;
}

export default function CollectionBanner({
  defaultHandle = "test",
  className = "",
}: {
  defaultHandle?: string;
  className?: string;
}) {
  const params = useParams(); // /search/[collection]
  const sp = useSearchParams(); // ?collection=...

  // Raw inputs (could be "", "all", "/collections/all", etc.)
  const routeHandleRaw = (params?.collection as string) || "";
  const queryHandleRaw = sp?.get("collection") || "";

  // Normalize everything
  const handle = useMemo(() => {
    const fromRoute = normalizeHandle(routeHandleRaw);
    const fromQuery = normalizeHandle(queryHandleRaw);
    const fromDefault = normalizeHandle(defaultHandle);
    return fromRoute || fromQuery || fromDefault;
  }, [routeHandleRaw, queryHandleRaw, defaultHandle]);

  useEffect(() => {
    // Helpful diagnostics in dev
    // eslint-disable-next-line no-console
    console.log("[CollectionBanner] handles:", {
      routeHandleRaw,
      queryHandleRaw,
      defaultHandle,
      normalizedHandle: handle,
    });
  }, [routeHandleRaw, queryHandleRaw, defaultHandle, handle]);

  const { data, error, isLoading } = useSWR(
    handle ? `/api/collections/${handle}?first=24` : null,
    fetcher
  );

  if (isLoading) {
    return (
      <div className={`h-64 md:h-96 w-full bg-neutral-100 animate-pulse ${className}`} />
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
    <section className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative h-64 md:h-80 mt-[8rem]">
        <FallbackImage
          src={
            collection.image?.url ||
            "/images/fleur-model-name.jpg" // default image if none on collection
          }
          alt={collection.image?.altText ?? collection.title ?? "Collection"}
          width={collection.image?.width || 1600}
          height={collection.image?.height || 900}
          className="absolute inset-0 h-full w-full object-cover scale-[1.1] -translate-y-[30px]"
          priority
        />
        <div className="absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-3 text-white bottom-8 absolute left-6">
            <p>Current Collection</p>
            <h1 className="text-center text-white text-3xl font-bold uppercase text-shadow-hero tracking-tight">
              VIEWING OUR <span>{collection.title || "Collection"}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
