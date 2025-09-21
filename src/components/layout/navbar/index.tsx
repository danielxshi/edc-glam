// app/components/layout/navbar/Navbar.tsx  (server)
import { getMenu } from "@/lib/shopify";
import NavbarClient from "./navbar-client";
import type { Menu as SfMenuItem } from "@/lib/shopify/types";

export default async function Navbar() {
  const mainNav: SfMenuItem[] = await getMenu("next-js-frontend-menu");
  const collectMenu: SfMenuItem[] = await getMenu("collections-menu");
  const nailShapeMenu: SfMenuItem[] = await getMenu("nails-shape-menu");
  const nailLengthMenu: SfMenuItem[] = await getMenu("nail-length-collections-menu");
  const generalMenu: SfMenuItem[] = await getMenu("mega-menu-general-collection");
  const siteName = process.env.SITE_NAME || "Shop";

  return <NavbarClient menu={mainNav} generalMenu={generalMenu} collectionsMenu={collectMenu} siteName={siteName} nailShapeMenu={nailShapeMenu} nailLengthMenu={nailLengthMenu}/>;
}
