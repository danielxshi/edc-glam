// components/layout/footer/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterMessages from "./FooterItems";

type EducationItem = { school: string; certification?: string; reward?: string };
type SocialItem = { url: string; link: string };
type LegalItem = { title: string; link: string };
type FooterItem = {
  education?: { link: EducationItem[] };
  legal?: { link: LegalItem[] };
  socials?: { link: SocialItem[] };
};

export const renderSwitch = (params: FooterItem) => {
  if ("education" in params && params.education) {
    return (
      <div className="education-container footer-subobject-container">
        <h3 className="mb-3 text-xxs tracking-wider">Collections</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
          {params.education.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <p>{item.school}</p>
              {item.certification && <p className="opacity-50">{item.certification}</p>}
              {item.reward && <p className="opacity-50">{item.reward}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("legal" in params && params.legal) {
    return (
      <div className="experience-container footer-subobject-container">
        <h3 className="mb-3 text-xxs tracking-wider">Legal Notices</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0">
          {params.legal.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <Link href={item.link}>{item.title}</Link>
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
              <p>{item.link}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

export default function Footer() {
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

    // Measure now + on changes
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

  // height is computed with CSS vars (no JS breakpoints):
  // --minvh = 100svh on mobile, 60vh on md+
  // actual section height = max(footer content px, --minvh)
  const computedHeight = "max(var(--footer-content-px, 0px), var(--minvh))";

  return (
    <div
      ref={containerRef}
      className={[
        "relative",
        // set --minvh differently per breakpoint
        "[--minvh:100svh] md:[--minvh:50vh]",
      ].join(" ")}
      style={{
        height: computedHeight,
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      {/* pinned sheet uses the exact same computed height */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[60]"
        style={{ height: computedHeight }}
      >
        <div className="flex h-full w-full flex-col justify-end px-3">
          {/* subtle top fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-6"
            style={{
              background:
                "linear-gradient(to bottom, rgba(238,238,238,1), rgba(238,238,238,0))",
            }}
          />

          {/* your original footer content */}
          <footer
            ref={footerRef}
            className="px-3 py-3 bg-[#eeeeee] text-[#33383CFF] rounded-t-sm shadow-[0_-6px_20px_rgba(0,0,0,0.06)]"
          >
            <div className="footer-container uppercase bg-white px-6 py-1 rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 *:col-span-full pt-6">
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
