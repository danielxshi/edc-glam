'use client';

import { usePathname } from 'next/navigation';
import CurveTransition from '../components/layout/curve-transition';

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return <CurveTransition route={pathname}>{children}</CurveTransition>;
}
