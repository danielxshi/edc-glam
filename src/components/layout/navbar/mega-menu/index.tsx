"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Menu as SfMenuItem } from "@/lib/shopify/types";

type Item = { label: string; href: string };
type Column = { title: string; items: Item[] };

// allow either `items` or `children`
type MenuWithChildren = SfMenuItem & {
  items?: SfMenuItem[];
  children?: SfMenuItem[];
  url?: string;   // just in case your type omits it
  path?: string;
};

function childrenOf(m: MenuWithChildren) {
  return (m.items ?? m.children ?? []) as MenuWithChildren[];
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

// Build columns from Shopify menu (2-level: parent -> child[])
function toColumnsFromShopify(items?: MenuWithChildren[]): Column[] {
  if (!items?.length) return [];
  return items
    .map((parent) => ({
      title: parent.title,
      items: childrenOf(parent).map((child: MenuWithChildren) => ({
        label: child.title,
        href: toPath(child) || "#",
      })),
    }))
    .filter((c) => c.items.length > 0);
}

// Normalize any input (array or wrapper) and ensure we at least render a flat list
function normalizeColumns(input: unknown, label: string): Column[] {
  const arr: MenuWithChildren[] = Array.isArray(input)
    ? (input as MenuWithChildren[])
    : ((input as any)?.items ?? []);

  const cols = toColumnsFromShopify(arr);
  if (cols.length) return cols;

  // fallback: flat column of whatever we got
  const flat = (arr as MenuWithChildren[])
    .map((i) => ({ label: i.title, href: toPath(i) || "#" }))
    .filter((i) => !!i.href);

  return flat.length ? [{ title: label, items: flat }] : [];
}

export default function ShopMegaMenu({
  label = "SHOP",
  menu,
  headerHeightPx = 64,
  scrolled = false,
  styleThis,
  linkClassName,
}: {
  label?: string;
  menu?: MenuWithChildren[] | { items?: MenuWithChildren[] }; // accept array or wrapper
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

  const columns = normalizeColumns(menu, label);
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
    closeTimer.current = setTimeout(() => setOpen(false), 260);
  };

  // close on Esc
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
        onPointerEnter={() => { clearClose(); setOpen(true); }}
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
