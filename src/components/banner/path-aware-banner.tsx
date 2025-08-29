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
    : "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";

  return <ShortBanner title={title} backgroundImage={backgroundImage} />;
}
