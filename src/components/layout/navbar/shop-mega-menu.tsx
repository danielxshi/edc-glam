"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

type Item = { label: string; href: string };
type Column = { title: string; items: Item[] };

const DEFAULT_COLUMNS: Column[] = [
  {
    title: "Shop Press-On Nails",
    items: [
      { label: "All", href: "/collections/all" },
      { label: "New Arrivals", href: "/collections/new" },
      { label: "Best Sellers", href: "/collections/best-sellers" },
      { label: "Sale", href: "/collections/sale" },
      { label: "Tools & Accessories", href: "/collections/tools" },
    ],
  },
  {
    title: "Shop by Length",
    items: [
      { label: "Ultra-Short", href: "/collections/ultra-short" },
      { label: "Short", href: "/collections/short-nails" },
      { label: "Medium", href: "/collections/medium" },
      { label: "Long", href: "/collections/long" },
    ],
  },
  {
    title: "Collections",
    items: [
      { label: "Hello Kitty & Friends", href: "/collections/hello-kitty" },
      { label: "Tropical", href: "/collections/tropical" },
      { label: "Classic", href: "/collections/classic" },
      { label: "Jelly", href: "/collections/jelly" },
      { label: "Valentines 2025", href: "/collections/valentines-2025" },
      { label: "Holy Sanctuary", href: "/collections/holy-sanctuary" },
      { label: "Halloween", href: "/collections/halloween" },
      { label: "Sci-Fi", href: "/collections/sci-fi" },
      { label: "For-All", href: "/collections/for-all" },
      { label: "Holiday", href: "/collections/holiday" },
      { label: "Valentines 2024", href: "/collections/valentines-2024" },
    ],
  },
  {
    title: "Collaborations",
    items: [
      { label: "Nailcissist × Hello Kitty & Friends", href: "/collections/collab-hello-kitty" },
      { label: "Nailcissist × amysclients", href: "/collections/collab-amysclients" },
    ],
  },
  {
    title: "Shop by Shape",
    items: [
      { label: "Almond", href: "/collections/shape-almond" },
      { label: "Coffin", href: "/collections/shape-coffin" },
      { label: "Stiletto", href: "/collections/shape-stiletto" },
      { label: "Round", href: "/collections/shape-round" },
      { label: "Square", href: "/collections/shape-square" },
    ],
  },
];

export default function ShopMegaMenu({
  label = "SHOP",
  columns = DEFAULT_COLUMNS,
  headerHeightPx = 64,
}: {
  label?: string;
  columns?: Column[];
  headerHeightPx?: number;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Hover-intent tracking: keep open while over trigger OR panel, otherwise close after a short delay
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const t = triggerRef.current;
      const p = panelRef.current;
      const x = e.clientX;
      const y = e.clientY;

      const within = (el: HTMLElement | null) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      };

      const overTrigger = within(t);
      const overPanel = within(p);

      if (overTrigger || overPanel) {
        if (closeTimer.current) {
          clearTimeout(closeTimer.current);
          closeTimer.current = null;
        }
        // Only open when pointer is actually on the trigger (prevents center-of-screen reopen)
        if (overTrigger && !open) setOpen(true);
      } else {
        if (!closeTimer.current) {
          closeTimer.current = setTimeout(() => {
            setOpen(false);
            closeTimer.current = null;
          }, 120); // debounce close: tweak 80–180ms to taste
        }
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [open]);

  return (
    <div className="relative mega-menu">
      {/* Trigger: ONLY opens on hover over this element */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        className="text-sm tracking-wide hover:opacity-70"
      >
        {label}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed left-0 right-0 z-[998] border-t border-neutral-200 bg-white shadow-sm"
            style={{ top: headerHeightPx }}
            // no hover handlers needed; mousemove handles intent
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
                {columns.map((col) => (
                  <div key={col.title}>
                    <div className="mb-4 text-sm font-semibold uppercase tracking-wide">
                      {col.title}
                    </div>
                    <ul className="space-y-3">
                      {col.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="block text-sm leading-6 hover:underline"
                            onClick={() => setOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
