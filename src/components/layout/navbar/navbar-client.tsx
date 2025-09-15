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
import TwoBarHamburger from "@/components/navigation/two-bar-hamburger";

interface Props {
  menu: Menu[];
  siteName: string;
}

export default function NavbarClient({ menu, siteName }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide navbar on /password
  if (pathname === "/password") {
    return null;
  }

  return (
    <nav
      className={`sticky left-0 mx-auto rounded-lg top-2 z-[999] backdrop-blur-sm max-w-[1200px] w-[90vw] shadow-inner transition-colors duration-300 navbar ${
        scrolled ? "bg-[#574e6cc0]" : "bg-transparent "
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center space-x-4 md:w-1/3">
          <MobileMenu menu={menu} />

          {menu.length > 0 && (
            <ul className="hidden gap-4 text-sm font-medium lg:flex">
              {menu.map((item: Menu) => (
                <li className="whitespace-nowrap" key={item.title}>
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

        <div className="flex justify-center md:w-1/3">
          <Link href="/">
            <div className="flex items-center space-x-2">
              <LogoSquare />
            </div>
          </Link>
        </div>

        <div className="flex justify-center md:w-1/3">
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
