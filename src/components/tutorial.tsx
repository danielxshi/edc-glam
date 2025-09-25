"use client";

import FallbackImage from "./fallback-image";
import * as React from "react";
import Layout from "../components/legal/layout";
import LegalBanner from "./banner/legal-banner";
export type HowToStep = {
  title: string; // e.g. "Step 1: Push Back Cuticles"
  description: string; // e.g. "Push back the cuticle using the cuticle tool provided."
  image: string; // public path or URL (e.g. "/images/prep/step1.jpg")
  alt?: string;
};

export default function HowToSteps({
  kicker = "HOW TO",
  heading = "Prep Your Nails",
  subheading = "Prep is the most important part of the application process. Good prep will ensure long lasting press-on nails.",
  steps,
  className = "",
}: {
  kicker?: string;
  heading?: string;
  subheading?: string;
  steps: HowToStep[];
  className?: string;
}) {
  return (
    <Layout>
      <section
        className={[
          "mx-auto w-[92vw] max-w-6xl py-10 md:py-14",
          className,
        ].join(" ")}
      >
        <LegalBanner title="Nail Tutorials" />
        {/* Header */}
        <header className="mb-6 md:mb-10">
          <div className="text-xs tracking-widest text-neutral-500">
            {kicker}
          </div>
          <h2 className="mt-1 text-2xl font-extrabold tracking-wide md:text-3xl">
            {heading.toUpperCase()}
          </h2>
          <p className="mt-2 max-w-3xl text-xs md:text-sm text-neutral-600 uppercase">
            {subheading}
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {steps.map((s, i) => {
            const odd = i % 2 === 1;
            return (
              <article
                key={s.title + i}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12"
              >
                {/* Image */}
                <figure
                  className={[
                    "relative aspect-[16/11] w-full overflow-hidden rounded md:col-span-7",
                    odd ? "md:order-2" : "",
                  ].join(" ")}
                >
                  <FallbackImage
                    src={s.image}
                    alt={s.alt || s.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 56vw, (min-width: 768px) 60vw, 92vw"
                    priority={i === 0}
                  />
                </figure>

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
    </Layout>
  );
}
