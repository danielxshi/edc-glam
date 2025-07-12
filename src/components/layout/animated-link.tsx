"use client";

import { useRouter } from 'next/navigation';
import { usePageTransition } from '@/components/layout/transition/transition-provider';

export default function AnimatedLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => router.push(href));
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}