'use client';

import { usePathname } from 'next/navigation';
import CurveTransition from '../components/layout/curve-transition';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const allowedRoutes = ["/", "/about", "/contact", "/search/mens-collection", "/search/kids", "/search/sales"] as const;
  const isAllowedRoute = (route: string): route is typeof allowedRoutes[number] => allowedRoutes.includes(route as typeof allowedRoutes[number]);

  return isAllowedRoute(pathname) ? (
    <CurveTransition route={pathname}>{children}</CurveTransition>
  ) : null;
}
