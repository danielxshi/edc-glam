"use client";

import * as React from "react";
import Layout from "@/components/legal/layout";
import LegalBanner from "@/components/banner/legal-banner";

/* --------------------------
   Types
   -------------------------- */
export type HowToStep = {
  title: string;
  description: string;
  image: string; // placeholder path if you add images later
  alt?: string;
};

/* --------------------------
   Section Component
   -------------------------- */
function HowToSteps({
  kicker = "HOW TO",
  heading,
  subheading,
  steps,
  className = "",
}: {
  kicker?: string;
  heading: string;
  subheading: string;
  steps: HowToStep[];
  className?: string;
}) {
  return (
    <section
      className={["mx-auto w-[92vw] max-w-6xl py-10 md:py-14", className].join(
        " "
      )}
    >
      {/* Header */}
      <header className="mb-6 md:mb-10">
        <div className="text-xs tracking-widest text-neutral-500">{kicker}</div>
        <h2 className="mt-1 text-2xl font-extrabold tracking-wide md:text-3xl">
          {heading.toUpperCase()}
        </h2>
        <p className="mt-2 max-w-3xl text-xs md:text-sm text-neutral-600 uppercase">
          {subheading}
        </p>
      </header>

      {/* Steps */}
      <div className="space-y-3 md:space-y-5">
        {steps.map((s, i) => {
          const odd = i % 2 === 1;
          return (
            <article
              key={s.title + i}
              className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
            >
              {/* Image placeholder (enable your image component later if desired) */}
              <div
                className={[
                  "relative aspect-[16/7] w-full overflow-hidden rounded md:col-span-7",
                  odd ? "md:order-2" : "",
                ].join(" ")}
              >
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                  <h2 className="text-4xl font-bold">Step&nbsp;{i + 1}</h2>
                </div>
              </div>

              {/* Text */}
              <div
                className={[
                  "md:col-span-5 md:pl-6",
                  odd ? "md:order-1 md:pl-0 md:pr-6" : "",
                ].join(" ")}
              >
                <h3 className="mb-1 text-center text-xs font-extrabold tracking-widest text-neutral-700 md:text-sm">
                  {s.title.toUpperCase()}
                </h3>
                <p className="mx-auto max-w-prose text-center text-[11px] leading-relaxed text-neutral-700 md:text-sm">
                  {s.description.toUpperCase()}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* --------------------------
   Tutorial Content (replaces your STEPS)
   -------------------------- */

// Nail Prep / How to prep your nails
const PREP_STEPS: HowToStep[] = [
  {
    title: "Push cuticle back",
    description:
      "Push cuticle back with the cuticle tool provided",
    image: "/images/tutorial/prep-1.jpg",
  },
  {
    title: "Gently buff the nail",
    description:
      "Gently buff the nail with the nail filer to create a rougher surface so adhesive can stick better",
    image: "/images/tutorial/prep-2.jpg",
  },
  {
    title: "Clean with alcohol wipe",
    description:
      "Use alcohol wipe to thoroughly remove any dirt, oil or residue and allow it to dry naturally",
    image: "/images/tutorial/prep-3.jpg",
  },
];

// How to apply using sticky tabs
const STICKY_TAB_STEPS: HowToStep[] = [
  {
    title: "Choose sticky tab size",
    description:
      "After prep, choose the sticky tab that is closest to the size of your natural nails",
    image: "/images/tutorial/tabs-1.jpg",
  },
  {
    title: "Apply sticky tab",
    description:
      "Place sticky tab on the nail and firmly press to ensure full coverage of the nail bed",
    image: "/images/tutorial/tabs-2.jpg",
  },
  {
    title: "Remove film",
    description: "Remove film from sticky tab",
    image: "/images/tutorial/tabs-3.jpg",
  },
  {
    title: "Position at 45°",
    description:
      "Position press-on nail as close to cuticle at a 45 degree angle",
    image: "/images/tutorial/tabs-4.jpg",
  },
  {
    title: "Press & hold",
    description:
      "Firmly press on the nail from cuticle to tip and hold for 10-15 seconds",
    image: "/images/tutorial/tabs-5.jpg",
  },
  {
    title: "Repeat",
    description: "Repeat for each nail",
    image: "/images/tutorial/tabs-6.jpg",
  },
  {
    title: "Set time",
    description:
      "*Please avoid contact with water for the first 2-3 hours to allow the adhesive to set in*",
    image: "/images/tutorial/tabs-7.jpg",
  },
];

// How to apply using nail glue
const GLUE_STEPS: HowToStep[] = [
  {
    title: "Apply nail glue",
    description:
      "After prep, apply a pea size amount of glue onto the whole nail surface",
    image: "/images/tutorial/glue-1.jpg",
  },
  {
    title: "Position at 45°",
    description:
      "Position press-on nail as close to cuticle at a 45 degree angle",
    image: "/images/tutorial/glue-2.jpg",
  },
  {
    title: "Press & hold",
    description:
      "Firmly press on the nail from cuticle to tip and hold for 10-15 seconds",
    image: "/images/tutorial/glue-3.jpg",
  },
  {
    title: "Repeat",
    description: "Repeat for each nail",
    image: "/images/tutorial/glue-4.jpg",
  },
  {
    title: "Set time",
    description:
      "*Please avoid contact with water for the first 2-3 hours to allow the adhesive to set in*",
    image: "/images/tutorial/glue-5.jpg",
  },
];

// Nail Removal & Reuse
const REMOVAL_STEPS: HowToStep[] = [
  {
    title: "Prepare soak",
    description: "Mix a bowl of warm water and soap (oil optional)",
    image: "/images/tutorial/remove-1.jpg",
  },
  {
    title: "Soak 5–10 minutes",
    description:
      "Soak fingers for 5-10 minutes, or until the press-on nails are separate from your nail bed",
    image: "/images/tutorial/remove-2.jpg",
  },
  {
    title: "Lift & remove",
    description:
      "Use the cuticle tool to gently lift the edges and remove the press-on nails",
    image: "/images/tutorial/remove-3.jpg",
  },
  {
    title: "Clean residue",
    description:
      "Use the cuticle tool to remove any remaining adhesive/glue",
    image: "/images/tutorial/remove-4.jpg",
  },
  {
    title: "Store for reuse",
    description:
      "Place press-on nails back into EDC&Glam box to be used later :)",
    image: "/images/tutorial/remove-5.jpg",
  },
];

/* --------------------------
   Page (all in one file)
   -------------------------- */
export default function TutorialPage() {
  return (
    <Layout>
      <LegalBanner title="Nail Tutorials" />

      <HowToSteps
        kicker="TUTORIAL"
        heading="Nail Prep / How to prep your nails"
        subheading="Prep is the most important part of the application process. Good prep will ensure long lasting press-on nails."
        steps={PREP_STEPS}
        className="pt-6"
      />

      <HowToSteps
        kicker="TUTORIAL"
        heading="How to apply using sticky tabs"
        subheading="Quick and mess-free application using sticky tabs."
        steps={STICKY_TAB_STEPS}
      />

      <HowToSteps
        kicker="TUTORIAL"
        heading="How to apply using nail glue"
        subheading="For extra hold and longevity, use nail glue."
        steps={GLUE_STEPS}
      />

      <HowToSteps
        kicker="TUTORIAL"
        heading="Nail Removal & Reuse"
        subheading="Remove gently and store your set for the next wear."
        steps={REMOVAL_STEPS}
      />
    </Layout>
  );
}
