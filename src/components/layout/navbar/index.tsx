// app/components/layout/navbar/Navbar.tsx
import { getMenu } from "../../../lib/shopify";
import NavbarClient from "./navbar-client";
import AccountMenu from "@/components/layout/navbar/account-menu";

export default async function Navbar() {
  const menu = await getMenu("next-js-frontend-menu");
  const siteName = process.env.SITE_NAME || "Shop";

  return <NavbarClient menu={menu} siteName={siteName} />;
}
