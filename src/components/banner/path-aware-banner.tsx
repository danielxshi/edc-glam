"use client";

import { usePathname } from "next/navigation";
import ShortBanner from "@/components/banner/short-banner";

export default function PathAwareBanner() {
  const pathname = usePathname() || "/";

  const isSearch = pathname === "/search";
  const isBest =
    pathname.endsWith("/best-sellers") || pathname.endsWith("best-sellers");

  const title = isSearch
    ? "All Collection"
    : isBest
      ? "Best Sellers"
      : "Search Results";

  const backgroundImage = isBest
    ? ""
    : "/images/fleur-model.jpg";

  return <ShortBanner title={title} backgroundImage={backgroundImage} />;
}
