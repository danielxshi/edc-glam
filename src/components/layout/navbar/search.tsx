// app/components/.../search.tsx (or wherever "./search" points)
"use client";

import { useEffect, useRef, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Search({ linkClassName }: { linkClassName?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Search"
        onClick={() => setOpen(true)}
        className={[
          linkClassName || "text-sm transition-colors duration-300 hover:opacity-70",
          "relative inline-flex h-9 w-fit items-center justify-center rounded-md"
        ].join(" ")}
      >
        {/* Inherit color from parent (no text-black/white here) */}
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && <SearchOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [onClose]);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="absolute left-0 right-0 top-0 z-50 mx-auto w-full max-w-5xl"
        role="dialog"
        aria-modal="true"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="mx-4 mt-6 rounded-xl border border-neutral-200 bg-white shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <form action="/search" method="GET" className="relative flex items-center gap-3 px-4 py-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-neutral-500" />
            <input
              ref={inputRef}
              name="q"
              type="text"
              autoComplete="off"
              defaultValue={searchParams?.get("q") ?? ""}
              placeholder="Search for products…"
              className="flex-1 bg-transparent text-base text-black outline-none placeholder:text-neutral-400 dark:text-white"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}
