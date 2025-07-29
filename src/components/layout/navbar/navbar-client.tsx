"use client";

import { useEffect, useState } from "react";
import { Menu } from "../../../lib/shopify/types";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "../../../components/layout/logo-square";
import CartModal from "@/components/cart/modal";
// import AnimatedLink from '@/components/layout/animated-link';
import Link from "next/link";

interface Props {
  menu: Menu[];
  siteName: string;
}

export default function NavbarClient({ menu, siteName }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-[999] backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-24 px-4 lg:px-6">
        <div className="flex items-center space-x-4 md:w-1/3">
          <MobileMenu menu={menu} />

          {menu.length > 0 && (
            <ul className="hidden lg:flex gap-4 text-sm font-medium">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link href={item.path}>
                    <span className="dark:text-neutral-400 transition-colors">
                      {item.title}
                    </span>
                  </Link>
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
