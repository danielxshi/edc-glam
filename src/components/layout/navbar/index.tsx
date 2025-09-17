// app/components/layout/navbar/Navbar.tsx
import { getMenu } from '../../../lib/shopify';
import NavbarClient from './navbar-client';
import AccountLink from '@/components/account/account-link';

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-menu');
  const siteName = process.env.SITE_NAME || 'Shop';

  return (
    <div className="flex items-center justify-between px-6 py-4">
      {/* <NavbarClient menu={menu} siteName={siteName} /> */}
      <AccountLink />
    </div>
  );
}
