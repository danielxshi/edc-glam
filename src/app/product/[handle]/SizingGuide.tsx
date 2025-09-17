"use client";

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
          aria-modal="true"
          role="dialog"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-3">Sizing Guide</h3>
            <p className="text-sm text-gray-700 mb-4">
              To ensure the best fit, please refer to our sizing chart below.
            </p>

            <table className="w-full text-sm border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Size</th>
                  <th className="border px-3 py-2 text-left">Chest (in)</th>
                  <th className="border px-3 py-2 text-left">Waist (in)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.size}>
                    <td className="border px-3 py-2">{r.size}</td>
                    <td className="border px-3 py-2">{r.chest}</td>
                    <td className="border px-3 py-2">{r.waist}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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
