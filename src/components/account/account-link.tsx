// app/components/layout/navbar/AccountLink.tsx
"use client";

const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;

export default function AccountLink() {
  const accountUrl = `https://${SHOP_DOMAIN}/account`;
  const logoutUrl = `https://${SHOP_DOMAIN}/account/logout`;

  return (
    <div className="ml-4 flex items-center space-x-3">
      <a href={accountUrl} className="text-sm hover:underline">Account</a>
      <a href={logoutUrl} className="text-sm hover:underline">Sign out</a>
    </div>
  );
}
