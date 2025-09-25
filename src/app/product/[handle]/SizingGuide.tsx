"use client";

import FallbackImage from "@/components/fallback-image";
import { useState, useEffect, useRef } from "react";

type Row = { size: string; chest: string; waist: string };

export default function SizingGuide({
  rows = [
    { size: "S", chest: "34–36", waist: "28–30" },
    { size: "M", chest: "38–40", waist: "32–34" },
    { size: "L", chest: "42–44", waist: "36–38" },
    { size: "XL", chest: "46–48", waist: "40–42" },
  ],
}: {
  rows?: Row[];
}) {
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) closeBtnRef.current?.focus();

    // Optional: lock body scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div>
      <button
        className="text-xs underline product-details-subcontent-header"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="sizing-guide-modal"
      >
        View Sizing Chart
      </button>

      {open && (
        <div
          id="sizing-guide-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — now scrollable */}
          <div
            className="
              relative bg-white p-3 rounded-sm shadow-lg
              w-[90vw] max-w-3xl
              max-h-[80vh] overflow-y-auto
            "
          >
            <h3
              id="sizing-guide-title"
              className="text-base uppercase font-semibold mb-3"
            >
              Sizing Guide
            </h3>
            <div className="mb-4 space-y-1">
              <p className="text-xs uppercase text-gray-700 ">
                To ensure the best fit, please refer to our sizing chart below.
              </p>
              <p className="text-xs uppercase text-gray-700 ">
                All measurements are in MM
              </p>
            </div>

            <div className="space-y-4">
              {/* Image sections: keep aspect ratio, no cropping */}
              {/* <div className="border border-gray-200 rounded">
                <FallbackImage
                  src="/images/sizing-instructions.jpg"
                  alt="Nail sizing instructions"
                  width={1080}
                  height={592}
                  className="w-full h-auto block"
                  priority
                />
              </div> */}

              {/* Add here */}

              <div className="border border-gray-200 rounded">
                <FallbackImage
                  src="/images/sizing-guide.jpg"
                  alt="Nail sizing guide"
                  width={1080}
                  height={592}
                  className="w-full h-auto block"
                  priority
                />
              </div>
            </div>

            <button
              ref={closeBtnRef}
              className="mt-4 text-sm text-red-600 underline"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
