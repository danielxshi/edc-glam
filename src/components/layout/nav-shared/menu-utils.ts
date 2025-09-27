// Reusable helpers + types for Shopify menus

import type { Menu as SfMenuItem } from "@/lib/shopify/types";

/** A single rendered column in the mega menu / footer */
export type Item = { label: string; href: string };
export type Column = { title: string; items: Item[] };

/**
 * Shopify menu types vary slightly project-to-project.
 * We tolerate `items` or `children`, and either `path` or `url`.
 */
export type MenuWithChildren = SfMenuItem & {
  items?: SfMenuItem[];
  children?: SfMenuItem[];
  url?: string;
  path?: string;
};

export type AnyMenu = MenuWithChildren[] | { items?: MenuWithChildren[] } | undefined;

export function toChildrenArray(m?: MenuWithChildren) {
  return (m?.items ?? m?.children ?? []) as MenuWithChildren[];
}

export function toPath(i: MenuWithChildren): string | undefined {
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
 * - If any top-level item has children, render those children as rows.
 * - Otherwise render top-level items as rows.
 */
export function columnFromMenu(menu: AnyMenu, title: string): Column | null {
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
