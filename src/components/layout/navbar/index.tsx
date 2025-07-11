import Link from "next/link";
import { getMenu } from "../../../lib/shopify";
import { Menu } from "../../../lib/shopify/types";
import MobileMenu from "./mobile-menu";
import Search from "./search";
import LogoSquare from "../../../components/layout/logo-square";
import CartModal from "@/components/cart/modal";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-menu");

  return (
    <nav className="sticky top-0 left-0 w-full z-[999] bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Mobile menu & logo */}
        <div className="flex items-center space-x-4 w-1/3">
          <MobileMenu menu={menu} />

          {/* Desktop Menu */}
          {menu.length > 0 && (
            <ul className="hidden lg:flex gap-4 text-sm ml-6">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-gray-700 dark:text-neutral-400 hover:text-black dark:hover:text-neutral-200 underline-offset-4 hover:underline transition"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Center: Search (desktop only) */}
        <div className="flex justify-center w-1/3 right-0">
          <Link
            href="/"
            className="flex items-center space-x-2"
            prefetch={true}
          >
            <LogoSquare />
            <span className="text-sm font-medium uppercase hidden sm:inline">
              {process.env.SITE_NAME || "Shop"}
            </span>
          </Link>
        </div>

        {/* Right: Cart */}
        <div className="flex justify-center w-1/3 right-0">
          <div className=" justify-center md:flex mr-0 ml-auto">
            <div className="hidden lg:flex">
              <Search />
            </div>
            <div className="ml-4 *:right-0 flex">
              <CartModal />
            </div>
          </div>

          {/* <CartModal /> */}
        </div>
      </div>
    </nav>
  );
}
