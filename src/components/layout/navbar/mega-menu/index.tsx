// app/components/layout/navbar/mega-menu/index.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Menu as SfMenuItem } from "@/lib/shopify/types";
import NavHoverLink from "../NavHoverLink";

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

/** Localhost detection for dev freeze */
const isLocalHost = () =>
  typeof window !== "undefined" &&
  (/^(localhost|127\.0\.0\.1|::1)$/.test(window.location.hostname) ||
    window.location.hostname.endsWith(".local"));

export default function ShopMegaMenu({
  /** The visible trigger label (e.g., "SHOP") */
  label = "SHOP",

  /**
   * ✅ collectionsMenu: current menu you're pulling today — this becomes the "Collections" column.
   * Typically contains items like “New Arrivals”, “Best Sellers”, etc.
   */
  collectionsMenu,
  collectionsTitle = "Collections",

  /**
   * ➕ nailShapeMenu: second column fed by a separate Shopify menu (e.g., “Shop by Shape”).
   * You can add two more later (nailLengthMenu, generalMenu) for a total of four columns.
   */
  nailShapeMenu,
  nailShapeMenuTitle = "Shop By Shape",

  /** Reserved for future: third and fourth columns */
  nailLengthMenu,
  nailLengthMenuTitle = "Shop By Length",

  generalMenu,
  generalMenuTitle = "Shop Press-On Nails",

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

  nailLengthMenu?: AnyMenu;
  nailLengthMenuTitle?: string;

  generalMenu?: AnyMenu;
  generalMenuTitle?: string;

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

  // 🔧 DEV FREEZE: keep menu open on localhost for easier hover/animation inspection
  const [debugFreeze, setDebugFreeze] = useState(false);

  useEffect(() => {
    if (!isLocalHost()) return;

    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("megaFreeze") === "1";
    const fromLS = localStorage.getItem("megaFreeze") === "1";
    const fromBody = document.body.classList.contains("mega-freeze");
    const initial = fromQuery || fromLS || fromBody;

    setDebugFreeze(initial);
    document.body.classList.toggle("mega-freeze", initial);

    // Toggle with Cmd/Ctrl + Shift + M
    const onKey = (e: KeyboardEvent) => {
      const pressed =
        (e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === "m";
      if (!pressed) return;
      setDebugFreeze((v) => {
        const nv = !v;
        document.body.classList.toggle("mega-freeze", nv);
        localStorage.setItem("megaFreeze", nv ? "1" : "0");
        return nv;
      });
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // If frozen on localhost, force it open
  useEffect(() => {
    if (debugFreeze && isLocalHost()) setOpen(true);
  }, [debugFreeze]);

  // Build columns (each *separate* Shopify menu becomes one column)
  const columns: Column[] = [
    columnFromMenu(generalMenu, generalMenuTitle),
    columnFromMenu(collectionsMenu, collectionsTitle),
    columnFromMenu(nailShapeMenu, nailShapeMenuTitle),
    columnFromMenu(nailLengthMenu, nailLengthMenuTitle),
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
    // 🚫 Don’t close when frozen on localhost
    if (debugFreeze && isLocalHost()) return;
    clearClose();
    // small delay so pointer can move from trigger to panel
    closeTimer.current = setTimeout(() => setOpen(false), 40);
  };

  // Close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const leaveHandler = debugFreeze && isLocalHost() ? undefined : scheduleClose;

  return (
    <div className="relative h-full align-middle items-center flex">
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
        onPointerLeave={leaveHandler}
        onFocus={() => setOpen(true)}
        className={`${linkClassName || fallbackClass} h-full font-normal uppercase nav-text text-xxs`}
      >
        {label}
        {isLocalHost() && debugFreeze && (
          <span className="ml-2 rounded bg-yellow-200 px-1.5 py-0.5 text-[10px] font-medium text-yellow-900">
            FROZEN
          </span>
        )}
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
            style={{ top: headerHeightPx }}
            onPointerEnter={clearClose}
            onPointerLeave={leaveHandler}
            className="bg-transparent pt-3 fixed left-0 right-0 z-[100]"
          >
            <div className=" border-t border-neutral-200 bg-white  rounded-[3px]">
              <div className="mx-auto max-w-7xl px-6 py-8">
                <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:[grid-template-columns:repeat(4,minmax(0,1fr))]">
                  {columns.map((col) => (
                    /* ⬇️ allow child to shrink within track */
                    <div
                      key={col.title}
                      className="min-w-0 max-w-full overflow-hidden"
                    >
                      <div className="mb-4 text-xxs font-semibold uppercase tracking-wide break-words text-shadow-none">
                        {col.title}
                      </div>

                      <ul className="space-y-2">
                        {col.items.map((item) => (
                          <li
                            key={item.href}
                            className="min-w-0 max-w-full py-1"
                            onPointerDown={() => setOpen(false)} // ← works for mouse + touch
                          >
                            <NavHoverLink
                              href={item.href}
                              className="block max-w-full text-xs leading-5 whitespace-normal break-words text-shadow-none"
                            >
                              {item.label}
                            </NavHoverLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
