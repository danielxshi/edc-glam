
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function FiltersDrawer({
  buttonLabel = "Filters",
  children,
}: {
  buttonLabel?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // lock body scroll when open + close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center px-3 py-3 text-sm uppercase tracking-wide border"
      >
        <AdjustmentsHorizontalIcon className="h-5 w-5" />
        {buttonLabel}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* sliding panel */}
            <motion.aside
              className="fixed inset-y-0 left-0 z-[999] w-[320px] max-w-[85vw] border-r border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
              role="dialog"
              aria-label="Filters"
              initial={{ x: -340, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -340, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-800">
                <div className="text-xs uppercase tracking-wide">Filters</div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close filters"
                  className="rounded p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="h-[calc(100vh-56px)] overflow-auto p-4">
                {children}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
