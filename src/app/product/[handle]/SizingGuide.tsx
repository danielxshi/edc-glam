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
          aria-labelledby="sizing-guide-title"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Panel — scrollable */}
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
              <p className="text-xs uppercase text-gray-700">
                To ensure the best fit, please refer to our sizing chart and instructions below.
              </p>
              <p className="text-xs uppercase text-gray-700">All measurements are in MM</p>
            </div>

            <div className="space-y-4">
              {/* ADD IT HERE */}
              <section aria-labelledby="methods-heading" className="border border-gray-200 rounded p-3">
                <h4 id="methods-heading" className="text-sm font-semibold uppercase mb-2">
                  Sizing Instructions
                </h4>

                <div className="space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold uppercase">Using Measuring Tape</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Using a measuring tape, measure the widest part of your nail bed, following the nail’s natural curvatures.</li>
                      <li>Repeat for each nail.</li>
                      <li>If you fall between sizes, we recommend sizing up for the most comfortable fit.</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">Using Tape or Paper</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Using a piece of tape or paper, put it over the base of your nails following the nail’s natural curvature.</li>
                      <li>Mark where the nail is the widest with a pen.</li>
                      <li>Remove tape or paper and lay on a flat surface.</li>
                      <li>Measure the width between both marks with a ruler or measuring tape.</li>
                      <li>Repeat steps 1–4 for each nail.</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">Using Measuring Tape (Alternate)</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Find the widest part of your nail bed, following the natural curvature.</li>
                      <li>Measure from one end to the other with a measuring tape.</li>
                      <li>Repeat for each nail.</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">Using Tape</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Place tape over the nail, ensuring the tape covers the widest part of the nails.</li>
                      <li>Using a pen, mark the edges at the widest point of the nails, following the natural curvature.</li>
                      <li>Remove the tape from the nail.</li>
                      <li>Measure the widest point of the marks with a ruler, note down the measurement, and repeat for each nail.</li>
                    </ol>
                  </div>
                </div>
              </section>

              <section aria-labelledby="tutorial-heading" className="border border-gray-200 rounded p-3">
                <h4 id="tutorial-heading" className="text-sm font-semibold uppercase mb-2">Tutorial</h4>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-semibold uppercase">Nail Prep / How to prep your nails</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Push cuticle back with the cuticle tool provided</li>
                      <li>Gently buff the nail with the nail filer to create a rougher surface so adhesive can stick better</li>
                      <li>Use alcohol wipe to thoroughly remove any dirt, oil or residue and allow it to dry naturally</li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">How to apply using sticky tabs</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>After prep, choose the sticky tab that is closest to the size of your natural nails</li>
                      <li>Place sticky tab on the nail and firmly press to ensure full coverage of the nail bed</li>
                      <li>Remove film from sticky tab</li>
                      <li>Position press-on nail as close to cuticle at a 45 degree angle</li>
                      <li>Firmly press on the nail from cuticle to tip and hold for 10–15 seconds</li>
                      <li>Repeat for each nail</li>
                      <li><em>*Please avoid contact with water for the first 2–3 hours to allow the adhesive to set in*</em></li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">How to apply using nail glue</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>After prep, apply a pea size amount of glue onto the whole nail surface</li>
                      <li>Position press-on nail as close to cuticle at a 45 degree angle</li>
                      <li>Firmly press on the nail from cuticle to tip and hold for 10–15 seconds</li>
                      <li>Repeat for each nail</li>
                      <li><em>*Please avoid contact with water for the first 2–3 hours to allow the adhesive to set in*</em></li>
                    </ol>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase">Nail Removal &amp; Reuse</h5>
                    <ol className="list-decimal ml-5 mt-1 space-y-1 text-xs text-gray-800">
                      <li>Mix a bowl of warm water and soap (oil optional)</li>
                      <li>Soak fingers for 5–10 minutes, or until the press-on nails are separate from your nail bed</li>
                      <li>Use the cuticle tool to gently lift the edges and remove the press-on nails</li>
                      <li>Use the cuticle tool to remove any remaining adhesive/glue</li>
                      <li>Place press-on nails back into EDC&amp;Glam box to be used later :)</li>
                    </ol>
                  </div>
                </div>
              </section>
              {/* END: inserted instructions */}

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
