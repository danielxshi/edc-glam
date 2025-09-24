// NavbarClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "../../../lib/shopify/types";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "../../../components/layout/logo-square";
import CartModal from "@/components/cart/modal";
import Link from "next/link";
import ShopMegaMenu from "./mega-menu";
import { usePathname } from "next/navigation";
import AccountMenu from "@/components/layout/navbar/account-menu";

interface Props {
  menu: Menu[];
  collectionsMenu: Menu[];
  nailShapeMenu: Menu[];
  nailLengthMenu: Menu[];
  generalMenu: Menu[];
  siteName: string;
}

export default function NavbarClient({
  menu,
  siteName,
  collectionsMenu,
  nailShapeMenu,
  nailLengthMenu,
  generalMenu,
}: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const headerHeightPx = isHome ? (scrolled ? 48 : 56) : 48;
  const styleThis = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const thresholdDown = 120,
      thresholdUp = 80;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled((prev) => (prev ? y > thresholdUp : y > thresholdDown));
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/password") return null;

  const onHero = isHome && !scrolled;

  const baseLink = "text-xxs transition-colors duration-300 hover:opacity-70";
  // ⬇️ Add shadow on hero (home + not scrolled)
  const navLinkClassHome = `${baseLink} ${scrolled ? "text-black" : "text-white"} ${onHero ? "text-shadow-hero" : ""}`;
  const navLinkClassNotHome = `${baseLink} text-black`;
  const triggerClass = isHome ? navLinkClassHome : navLinkClassNotHome;

  return (
    <nav
      className={[
        isHome
          ? "fixed mt-8 top-2 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[80vw] max-w-[1200px] rounded-full border"
          : "fixed inset-x-0 rounded-none",
        "z-[20]",
        "backdrop-blur-sm",
        scrolled
          ? "bg-[#fff9f9f4] shadow-md"
          : !isHome
            ? "bg-white/70 shadow-md"
            : "bg-transparent",
        "transition-colors duration-300 mt-7",
        onHero ? "text-shadow-hero" : "", // harmless here, real effect is on links
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center justify-between",
          scrolled ? "h-12 px-4" : "h-[3.5rem] px-6",
          "transition-[height,padding] duration-300",
        ].join(" ")}
      >
        <MobileMenu menu={menu} />

        <Link href="/">
          <div
            className={`lg:flex hidden space-x-2 transition-transform duration-300 ${scrolled ? "scale-90" : "scale-100"}`}
          >
            <LogoSquare />
          </div>
        </Link>

        <div className="flex lg:hidden justify-center">
          <Link href="/">
            <div
              className={`flex items-center space-x-2 transition-transform duration-300 ${scrolled ? "scale-90" : "scale-100"}`}
            >
              <LogoSquare />
            </div>
          </Link>
        </div>

        <div className="flex justify-center uppercase font-normal h-full align-middle items-center">
          {menu.length > 0 && (
            <ul className="*:mx-1 hidden gap-3 text-xxs font-normal nav-text lg:flex h-full align-middle items-center">
              {menu.map((item: Menu) => (
                <li className="whitespace-nowrap h-full align-middle items-center self-center my-auto flex" key={item.title}>
                  {item.title?.toLowerCase() === "shop" ? (
                    <ShopMegaMenu
                      collectionsMenu={collectionsMenu}
                      nailShapeMenu={nailShapeMenu}
                      nailLengthMenu={nailLengthMenu}
                      generalMenu={generalMenu}
                      label="Shop"
                      scrolled={isHome ? scrolled : true}
                      headerHeightPx={headerHeightPx}
                    />
                  ) : isHome ? (
                    <Link href={item.path} className={navLinkClassHome}>
                      {item.title}
                    </Link>
                  ) : (
                    <Link href={item.path} className={navLinkClassNotHome}>
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right: search + cart + account */}
        <div className="flex justify-center gap-x-3">
          <div className="hidden lg:block">
            <Search linkClassName={triggerClass} />
          </div>
          <CartModal linkClassName={triggerClass} />
          <AccountMenu linkClassName={triggerClass} />
        </div>
      </div>
    </nav>
  );
}
