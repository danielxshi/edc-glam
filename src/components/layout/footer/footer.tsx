"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import FooterMessages from "./FooterItems";

import type { Menu as SfMenuItem } from "@/lib/shopify/types"; // ⬅️ use the same type as NavbarClient
import {
  AnyMenu,
  columnFromMenu,
} from "@/components/layout/nav-shared/menu-utils"; // your shared helpers

type SocialItem = { url: string; link: string };
type LegalItem = { title: string; link: string };
type FooterItem = {
  legal?: { link: LegalItem[] };
  socials?: { link: SocialItem[] };
};

/** center-out animated underline link */
function MotionUnderlineLink({
  href,
  children,
  className = "",
  "aria-label": ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  const [active, setActive] = React.useState(false);

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span>{children}</span>
      <motion.span
        aria-hidden
        className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-current"
        initial={{ scaleX: 0, opacity: 0.9 }}
        animate={{ scaleX: active ? 1 : 0, opacity: active ? 1 : 0.9 }}
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{ transformOrigin: "center" }}
      />
    </Link>
  );
}

export const renderSwitch = (params: FooterItem) => {
  if ("legal" in params && params.legal) {
    return (
      <div className="experience-container footer-subobject-container">
        <h3 className="mb-3 text-xxs tracking-wider">Legal Notices</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
          {params.legal.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <MotionUnderlineLink
                href={item.link}
                aria-label={item.title}
                className="transition-colors"
              >
                {item.title}
              </MotionUnderlineLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("socials" in params && params.socials) {
    return (
      <div className="social-container footer-subobject-container">
        <h3 className="mb-3 text-xxs tracking-wider">Social</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
          {params.socials.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <MotionUnderlineLink
                href={item.url}
                aria-label={item.link}
                className="transition-colors"
              >
                {item.link}
              </MotionUnderlineLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default function Footer({
  collectionsMenu,
  collectionsTitle = "Collections",
}: {
  /** ⬅️ same shape you pass to NavbarClient */
  collectionsMenu?: SfMenuItem[];
  collectionsTitle?: string;
}) {
  const pathname = usePathname();
  if (pathname === "/password") return null;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const footerRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const footerEl = footerRef.current;
    const containerEl = containerRef.current;
    if (!footerEl || !containerEl) return;

    const calc = () => {
      const h = footerEl.offsetHeight || 0;
      containerEl.style.setProperty("--footer-content-px", `${h}px`);
    };

    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(footerEl);
    window.addEventListener("resize", calc);
    (document as any).fonts?.ready?.then(calc).catch(() => {});

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, []);

  const computedHeight = "max(var(--footer-content-px, 0px), var(--minvh))";

  // build Collections from the same Shopify menu you use in NavbarClient
  const collectionsCol = collectionsMenu
    ? columnFromMenu(collectionsMenu as unknown as AnyMenu, collectionsTitle)
    : null;

  return (
    <div
      ref={containerRef}
      className={["relative", "[--minvh:45svh] md:[--minvh:40vh]"].join(" ")}
      style={{
        height: computedHeight,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className="fixed bottom-0 left-0 right-0 z-[60]"
        style={{ height: computedHeight }}
      >
        <div className="flex h-full w-full flex-col justify-end px-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{
              background:
                "linear-gradient(to bottom, rgba(238,238,238,1), rgba(238,238,238,0))",
            }}
          />

          <footer
            ref={footerRef}
            className="px-3 py-3 bg-[#eeeeee] text-[#33383CFF] rounded-t-sm shadow-[0_-6px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="footer-container uppercase bg-white px-6 py-1 rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 *:col-span-full pt-6">

              {/* ✅ Collections (from Shopify) */}
              {collectionsCol && (
                <div className="collections-container footer-subobject-container">
                  <h3 className="mb-3 text-xxs tracking-wider">{collectionsCol.title}</h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
                    {collectionsCol.items.map((item) => (
                      <li className="mb-1" key={item.href}>
                        <MotionUnderlineLink
                          href={item.href}
                          aria-label={item.label}
                          className="transition-colors"
                        >
                          {item.label}
                        </MotionUnderlineLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* keep legal / social from FooterMessages */}
              {FooterMessages.FooterItems.map((item, index) => (
                <React.Fragment key={index}>{renderSwitch(item)}</React.Fragment>
              ))}

              <div className="w-full items-center justify-center text-center pt-1 border-t border-neutral-200 h-min">
                <small className="text-xxs opacity-70 uppercase">© 2025 EDCGLAM.COM</small>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
