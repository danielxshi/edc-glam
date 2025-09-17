"use client";

import { useEffect, useState } from "react";
import { Menu } from "../../../lib/shopify/types";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "../../../components/layout/logo-square";
import CartModal from "@/components/cart/modal";
import Link from "next/link";
import ShopMegaMenu from "./shop-mega-menu";
import { usePathname } from "next/navigation";

interface Props {
  menu: Menu[];
  siteName: string;
}

export default function NavbarClient({ menu, siteName }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname === "/password") return null;

  return (
    <nav
      className={[
        isHome
          ? "fixed top-2 left-1/2 -translate-x-1/2 w-[92vw] sm:w-[80vw] max-w-[1200px] rounded-full"
          : "fixed w-[100vw] rounded-none",
        "z-[999] transition-all duration-300 navbar",
        scrolled
          ? "backdrop-blur-sm lg:bg-[#2f2f2fed] bg-[#fff9f9f4] shadow-md text-white"
          : !isHome
          ? "backdrop-blur-sm bg-white/70 shadow-md"
          : "",
      ].join(" ")}
    >
      <div
        className={`flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-12 px-4" : "h-16 px-6"
        }`}
      >
        <MobileMenu menu={menu} />

        <Link href="/">
          <div
            className={`lg:flex hidden space-x-2 transition-all duration-300 ${
              scrolled ? "scale-90" : "scale-100"
            }`}
          >
            <LogoSquare />
          </div>
        </Link>

        <div className="flex lg:hidden justify-center">
          <Link href="/">
            <div
              className={`flex items-center space-x-2 transition-all duration-300 ${
                scrolled ? "scale-90" : "scale-100"
              }`}
            >
              <LogoSquare />
            </div>
          </Link>
        </div>

        <div className="flex justify-center">
          {menu.length > 0 && (
            <ul className="hidden gap-4 text-sm font-medium lg:flex">
              {menu.map((item: Menu) => (
                <li className={`whitespace-nowrap`} key={item.title}>
                  {item.title?.toLowerCase() === "shop" ? (
                    <ShopMegaMenu label="Shop" />
                  ) : (
                    <Link href={item.path} className="transition-colors">
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center">
          <div className="justify-center md:flex mr-0 ml-auto">
            <div className="hidden lg:flex">
              <Search />
            </div>
            <div className="md:ml-4 *:right-0 flex">
              <CartModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
