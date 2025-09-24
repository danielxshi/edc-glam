'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import LogoutButton from '@/components/account/LogoutButton'

export type AccountNavItem = {
  href: string
  label: string
  prefetch?: boolean
  // if true, render a logout action instead of a Link
  logout?: boolean
}

export default function AccountNav({
  title = 'Account',
  items = DEFAULT_ITEMS,
  stickyTop = 96, // px (matches `top-24`)
  className = '',
}: {
  title?: string
  items?: AccountNavItem[]
  stickyTop?: number
  className?: string
}) {
  const pathname = usePathname()

  return (
    <div className={className}>
      <div className="sticky" style={{ top: stickyTop }}>
        {title && <h2 className="mb-4 text-lg font-medium">{title}</h2>}

        <nav aria-label="Account" className="flex flex-col space-y-3 text-sm">
          {items.map((item) => {
            const isActive = pathname === item.href

            const base =
              'transition-colors hover:underline opacity-90 data-[active=true]:underline data-[active=true]:font-medium text-left text-xs tracking-wide'

            if (item.logout) {
              return (
                <LogoutButton
                  key="__logout__"
                  className={base}
                  redirectTo="/"
                  label={item.label}
                />
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={item.prefetch}
                data-active={isActive ? 'true' : undefined}
                className={base}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

const DEFAULT_ITEMS: AccountNavItem[] = [
  { href: '/account/order-history', label: 'Order History' },
  { href: '/account', label: 'Account Details' },
  { href: '/account/addresses', label: 'Addresses' },
  { href: '/logout', label: 'Logout', logout: true }, // ← action, not a link
]
