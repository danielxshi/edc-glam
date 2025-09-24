"use client";

import type { FAQSection } from "@/components/legal/faq/type";
import { useScrollSpy } from "@/components/hooks/useScrollSpy";

type Props = {
  sections: FAQSection[];
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  /** px offset for sticky top (your header is ~56px; 80 is a nice buffer) */
  stickyOffset?: number;
};

export default function CategoryNav({
  sections,
  className = "sticky",
  linkClassName = "block pb-2 text-xs uppercase tracking-wide opacity-70 hover:opacity-100",
  activeClassName = "font-semibold",
  stickyOffset = 120,
}: Props) {
  const ids = sections.map((s) => s.id);
  const active = useScrollSpy(ids, { offset: stickyOffset });

  return (
    <nav className={className} style={{ top: stickyOffset }}>
      <ul className="space-y-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`${linkClassName} ${active === s.id ? activeClassName : ""}`}
            >
              {s.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
