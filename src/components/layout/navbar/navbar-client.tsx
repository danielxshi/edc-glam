'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu } from '../../../lib/shopify/types';
import MobileMenu from './mobile-menu';
import Search from './search';
import LogoSquare from '../../../components/layout/logo-square';
import CartModal from '@/components/cart/modal';
import { motion } from 'framer-motion';

interface Props {
  menu: Menu[];
  siteName: string;
}

export default function NavbarClient({ menu, siteName }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 left-0 w-full z-[999] backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80'
          : 'bg-transparent dark:bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left: Mobile menu & desktop links */}
        <div className="flex items-center space-x-4 w-1/3">
          <MobileMenu menu={menu} />

          {menu.length > 0 && (
            <ul className="hidden lg:flex gap-4 text-sm ml-6">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <motion.div
                    whileHover="hover"
                    initial="initial"
                    className="relative inline-block"
                  >
                    <Link href={item.path}>
                      <motion.span
                        variants={{
                          initial: { color: '#4b5563' }, // text-gray-700
                          hover: { color: '#ffffff' },   // hover black
                        }}
                        transition={{ duration: 0.15, ease: 'easeInOut' }}
                        className="dark:text-neutral-400 transition-colors"
                      >
                        {item.title}
                      </motion.span>
                    </Link>

                    <motion.span
                      variants={{
                        initial: { scaleX: 0, opacity: 0 },
                        hover: { scaleX: 1, opacity: 1 },
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="absolute left-0 -bottom-0.5 w-full h-[1px] bg-black dark:bg-neutral-200 origin-left"
                    />
                  </motion.div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center w-1/3">
          <Link
            href="/"
            className="flex items-center space-x-2"
            prefetch={true}
          >
            <LogoSquare />
            <span className="text-sm font-medium uppercase hidden sm:inline">
              {siteName}
            </span>
          </Link>
        </div>

        {/* Right: Search & Cart */}
        <div className="flex justify-center w-1/3">
          <div className="justify-center md:flex mr-0 ml-auto">
            <div className="hidden lg:flex">
              <Search />
            </div>
            <div className="ml-4 *:right-0 flex">
              <CartModal />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
