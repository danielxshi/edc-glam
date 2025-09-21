// app/components/layout/navbar/mega-menu/index.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Menu as SfMenuItem } from "@/lib/shopify/types";

/** A single rendered column in the mega menu */
type Item = { label: string; href: string };
type Column = { title: string; items: Item[] };

/**
 * Shopify menu types vary slightly project-to-project.
 * We tolerate `items` or `children`, and either `path` or `url`.
 */
type MenuWithChildren = SfMenuItem & {
  items?: SfMenuItem[];
  children?: SfMenuItem[];
  url?: string;
  path?: string;
};

type AnyMenu = MenuWithChildren[] | { items?: MenuWithChildren[] } | undefined;

function toChildrenArray(m?: MenuWithChildren) {
  return (m?.items ?? m?.children ?? []) as MenuWithChildren[];
}

function toPath(i: MenuWithChildren): string | undefined {
  if (i.path) return i.path;
  if (i.url) {
    try {
      const u = new URL(i.url);
      return u.pathname + u.search;
    } catch {
      return i.url;
    }
  }
  return undefined;
}

/**
 * Build a single column from a Shopify menu.
 * Logic:
 * - If any top-level item has children, we render those children as the column rows.
 * - Otherwise we render the top-level items as the rows.
 */
function columnFromMenu(menu: AnyMenu, title: string): Column | null {
  const arr: MenuWithChildren[] = Array.isArray(menu)
    ? (menu as MenuWithChildren[])
    : ((menu as any)?.items ?? []);

  if (!arr?.length) return null;

  const hasChildren = arr.some((p) => toChildrenArray(p).length > 0);

  const rows: Item[] = hasChildren
    ? arr
        .flatMap((p) => toChildrenArray(p))
        .map((child) => ({
          label: child.title,
          href: toPath(child) || "#",
        }))
        .filter((r) => !!r.href)
    : arr
        .map((p) => ({
          label: p.title,
          href: toPath(p) || "#",
        }))
        .filter((r) => !!r.href);

  if (!rows.length) return null;
  return { title, items: rows };
}

export default function ShopMegaMenu({
  /** The visible trigger label (e.g., "SHOP") */
  label = "SHOP",

  /**
   * ✅ This is the menu you're already pulling today.
   * Use it for your "Collections" column in the mega menu.
   * Example: a menu that lists “New Arrivals”, “Best Sellers”, etc.
   */
  collectionsMenu,
  collectionsTitle = "Collections",

  /**
   * ➕ Add another Shopify menu as a second column.
   * For testing now, pass just this one. Later you can pass menu3/menu4 as well.
   * Example: a menu for “Shop by Length” or “Shop by Shape”.
   */
  nailShapeMenu,
  nailShapeMenuTitle = "More",

  /** Reserved for future: third and fourth columns */
  menu3,
  menu3Title = "Menu 3",
  menu4,
  menu4Title = "Menu 4",

  /** UI behavior/styling props */
  headerHeightPx = 64,
  scrolled = false,
  styleThis,
  linkClassName,
}: {
  label?: string;

  // Columns (1–4): pass separate Shopify menus and the desired column headers
  collectionsMenu?: AnyMenu;
  collectionsTitle?: string;

  nailShapeMenu?: AnyMenu;
  nailShapeMenuTitle?: string;

  menu3?: AnyMenu;
  menu3Title?: string;

  menu4?: AnyMenu;
  menu4Title?: string;

  // UI
  headerHeightPx?: number;
  scrolled?: boolean;
  styleThis?: React.RefObject<HTMLButtonElement>;
  linkClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const internalTriggerRef = useRef<HTMLButtonElement>(null);
  const triggerRef = styleThis ?? internalTriggerRef;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build columns (each *separate* Shopify menu becomes one column)
  const columns: Column[] = [
    columnFromMenu(collectionsMenu, collectionsTitle),
    columnFromMenu(nailShapeMenu, nailShapeMenuTitle),
    columnFromMenu(menu3, menu3Title),
    columnFromMenu(menu4, menu4Title),
  ].filter((c): c is Column => !!c);

  const fallbackClass =
    `text-sm transition-colors duration-300 hover:opacity-70 ` +
    (scrolled ? "text-black" : "text-white");

  const clearClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearClose();
    // small delay so pointer can move from trigger to panel
    closeTimer.current = setTimeout(() => setOpen(false), 240);
  };

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerEnter={() => {
          clearClose();
          setOpen(true);
        }}
        onPointerLeave={scheduleClose}
        onFocus={() => setOpen(true)}
        className={`${linkClassName || fallbackClass} font-normal uppercase nav-text`}
      >
        {label}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && columns.length > 0 && (
          <motion.div
            ref={panelRef}
            key="mega"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed left-0 right-0 z-[1000] border-t border-neutral-200 bg-white shadow-sm"
            style={{ top: headerHeightPx }}
            onPointerEnter={clearClose}
            onPointerLeave={scheduleClose}
          >
            <div className="mx-auto max-w-7xl px-6 py-8">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
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
