// components/announcement/AnnouncementBarClient.tsx
"use client";

import { useEffect, useRef } from "react";

type Announcement = {
  message: string;
  code?: string;
  startAt?: string;
  endAt?: string;
  bg?: string;
  fg?: string;
  autoApply?: boolean;
  ctaLabel?: string;
  ctaUrl?: string;
};

export default function AnnouncementBarClient({
  announcement,
}: {
  announcement?: Announcement | null;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // No dismiss logic — just keep the layout offset in sync with bar height
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const apply = () => {
      const h = el.getBoundingClientRect().height;
      document.documentElement.style.setProperty("--ann-h", `${h}px`);
    };

    const ro = new ResizeObserver(apply);
    ro.observe(el);
    apply();

    return () => {
      ro.disconnect();
      document.documentElement.style.setProperty("--ann-h", "0px");
    };
  }, []);

  if (!announcement || !announcement.message) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[20] w-screen px-3 py-[.35rem] text-center"
      style={{
        background: announcement.bg || "#000",
        color: announcement.fg || "#fff",
      }}
      role="region"
      aria-label="Site announcement"
    >
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-3">
        <p className="text-xs">
          {announcement.message}
          {announcement.code && (
            <span
              className="inline-block py-[2px]"
              style={{ borderColor: "currentColor" }}
            >&nbsp;
              {announcement.code}
            </span>
          )}
        </p>

        {announcement.ctaUrl && announcement.ctaLabel && (
          <a
            className="text-xs underline underline-offset-2"
            href={announcement.ctaUrl}
          >
            {announcement.ctaLabel}
          </a>
        )}
      </div>
    </div>
  );
}
