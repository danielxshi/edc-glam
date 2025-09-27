// // src/components/layout/navbar/mega-menu/mega-menu-client.tsx
// "use client";

// import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
// import { AnimatePresence, motion } from "framer-motion";
// import type { ShopifyMenuOperation } from "@/lib/shopify/types";
// import NavHoverLink from "@/components/layout/navbar/NavHoverLink";

// type Item = { label: string; href: string };
// type Column = { title: string; items: Item[] };

// type ShopifyMenuItem =
//   NonNullable<ShopifyMenuOperation["data"]["menu"]>["items"][number];

// function toColumns(items?: ShopifyMenuItem[]): Column[] {
//   if (!items?.length) return [];
//   return [
//     {
//       title: "Shop",
//       items: items.map((link) => ({
//         label: link.title,
//         href: link.url,
//       })),
//     },
//   ];
// }

// export default function ShopMegaMenu({
//   label = "SHOP",
//   menuItems,
//   headerHeightPx = 64,
//   scrolled = false,
//   linkClassName,
// }: {
//   label?: string;
//   menuItems?: ShopifyMenuItem[];
//   headerHeightPx?: number;
//   scrolled?: boolean;
//   linkClassName?: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const triggerRef = useRef<HTMLButtonElement>(null);
//   const panelRef = useRef<HTMLDivElement | null>(null);
//   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const pathname = usePathname();

//   const columns = toColumns(menuItems);

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, []);

//   useEffect(() => {
//     const onMove = (e: MouseEvent) => {
//       const t = triggerRef.current;
//       const p = panelRef.current;
//       const { clientX: x, clientY: y } = e;

//       const within = (el: HTMLElement | null) => {
//         if (!el) return false;
//         const r = el.getBoundingClientRect();
//         return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
//       };

//       const overTrigger = within(t);
//       const overPanel = within(p);

//       if (overTrigger || overPanel) {
//         if (closeTimer.current) {
//           clearTimeout(closeTimer.current);
//           closeTimer.current = null;
//         }
//         if (overTrigger && !open) setOpen(true);
//       } else if (!closeTimer.current) {
//         closeTimer.current = setTimeout(() => {
//           setOpen(false);
//           closeTimer.current = null;
//         }, 120);
//       }
//     };

//     document.addEventListener("mousemove", onMove);
//     return () => {
//       document.removeEventListener("mousemove", onMove);
//       if (closeTimer.current) clearTimeout(closeTimer.current);
//     };
//   }, [open]);

//   const fallbackClass =
//     `text-sm transition-colors duration-300 hover:opacity-70 ` +
//     (scrolled ? "text-black" : "text-white");

//   return (
//     <div className="relative">
//       {/* Trigger button */}
//       <motion.button
//         ref={triggerRef}
//         type="button"
//         aria-haspopup="menu"
//         aria-expanded={open}
//         className={`${linkClassName || fallbackClass} font-normal uppercase nav-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current rounded`}
//         whileHover={{ opacity: 1 }}
//         whileFocus={{ opacity: 1 }}
//       >
//         {label}
//       </motion.button>

//       <AnimatePresence>
//         {open && columns.length > 0 && (
//           <motion.div
//             ref={panelRef}
//             key="mega"
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             transition={{ type: "spring", stiffness: 300, damping: 26 }}
//             className="fixed left-0 right-0 z-[998] border-t border-neutral-200 bg-white shadow-sm"
//             style={{ top: headerHeightPx }}
//           >
//             <div className="mx-auto max-w-7xl px-6 py-8">
//               <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
//                 {columns.map((col) => (
//                   <div key={col.title}>
//                     <ul className="space-y-3">
//                       {col.items.map((item) => {
//                         // active route (handles absolute URLs too)
//                         let isActive = false;
//                         try {
//                           const url = new URL(
//                             item.href,
//                             typeof window !== "undefined"
//                               ? window.location.origin
//                               : "http://localhost"
//                           );
//                           isActive = url.pathname === pathname;
//                         } catch {
//                           isActive = item.href === pathname;
//                         }

//                         return (
//                           <li key={item.href}>
//                             {/* Close the menu when a link is clicked */}
//                             <div onClick={() => setOpen(false)}>
//                               <NavHoverLink
//                                 href={item.href}
//                                 className="block text-sm leading-6 *:text-shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-800 rounded"
//                                 active={isActive}
//                                 ariaLabel={item.label}
//                               >
//                                 {item.label}
//                               </NavHoverLink>
//                             </div>
//                           </li>
//                         );
//                       })}
//                     </ul>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
