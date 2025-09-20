// app/components/layout/navbar/Navbar.tsx  (server)
import { getMenu } from "@/lib/shopify";
import NavbarClient from "./navbar-client";
import type { Menu as SfMenuItem } from "@/lib/shopify/types";

export default async function Navbar() {
  const mainNav: SfMenuItem[] = await getMenu("next-js-frontend-menu");
  const megaMenu: SfMenuItem[] = await getMenu("mega-menu");
  const siteName = process.env.SITE_NAME || "Shop";

  return <NavbarClient menu={mainNav} megaMenu={megaMenu} siteName={siteName} />;
}
