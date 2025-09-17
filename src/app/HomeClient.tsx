"use client";

import { useEffect } from "react";
import Link from "next/link";
import SignupBanner from "@/components/signup-banner";
import FeatureCarousel from "@/components/layout/carousel";
import FullScreenBanner from "@/components/full-screen-banner";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ZoomParallaxSection from "@/components/ZoomParallax";
import FallbackImage from "@/components/fallback-image";

function FadeInWhenVisible({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.7, delay }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO SECTION */}
      <section className="">
        <div className="relative w-full h-screen overflow-hidden">
          {/* Pure CSS media switching: fleur.jpg on mobile, fleur-crop.jpg otherwise */}
          <picture>
            {/* Mobile first (<= 767px) */}
            <source media="(max-width: 1025px)" srcSet="/images/fleur.jpg" />
            {/* Fallback/desktop */}
            <FallbackImage
              width={1920}
              height={1080}
              src="/images/fleur-crop.jpg"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <FadeInWhenVisible>
              <h1 className="text-xl font-bold mb-4">
                THE FLEUR D'AMOUR COLLECTION
              </h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-sm mb-6">NEW FALL INSPIRED PRESS-ON NAILS</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <Link
                href="/search"
                className="text-white text-sm tracking-wide relative
             after:content-[''] after:block after:w-full after:h-[1px]
             after:bg-white after:mt-1 hover:opacity-80 transition"
              >
                Discover the Collection
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* TRENDING SECTION */}
      <section className="w-full py-12 md:py-24 lg:py-32 grid">
        <FadeInWhenVisible>
          <div className="space-y-12 px-4 md:px-6 w-full">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div>
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  New Arrivals
                </div>
                <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trending Now
                </h2>
                <Link
                  href="/search/best-sellers"
                  className="underline mt-8 text-sm"
                  style={{ maxWidth: "900px", lineHeight: "1.625" }}
                >
                  Discover the Collection
                </Link>
              </div>
            </div>

            <div className="mx-auto grid items-start justify-center grid-cols-2 gap-2 w-full">
              {[
                {
                  href: "/search/mens-collection",
                  src: "/images/goal-digger.jpg",
                  title: "Collection",
                },
                {
                  href: "/search/kids",
                  src: "/images/test.jpg",
                  title: "test",
                },
              ].map((item, i) => (
                <FadeInWhenVisible key={item.href} delay={i * 0.15}>
                  <div className="grid gap-1 card w-full">
                    <Link
                      href={item.href}
                      className="group block w-full"
                      prefetch={false}
                    >
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px]">
                        <h3 className="z-[100] text-center w-full absolute bottom-2 mx-auto text-sm px-2 py-1 text-white tracking-[1px]">
                          {item.title}
                        </h3>
                        {/* keep your existing image component here if needed */}
                        <FallbackImage
                          src={item.src}
                          alt={item.title}
                          width={400}
                          height={400}
                          className="object-cover z-[0] absolute inset-0 h-full w-full"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* BANNERS / CAROUSEL */}
      <FullScreenBanner
        imageUrl="/images/emerald-tide.jpg"
        title="Explore Our Sale Collection"
        description="Don't miss out on our amazing deals and discounts."
      />

      <FadeInWhenVisible>
        <section className="mt-12 md:mt-24 lg:mt-32 w-full bg-[url('/sale-backdrop.svg')] grid place-content-center">
          <FeatureCarousel />
        </section>
      </FadeInWhenVisible>

      <FullScreenBanner
        imageUrl="/your-image.jpg"
        title="Explore Our Sale Collection"
        description="Don't miss out on our amazing deals and discounts."
      />

      <ZoomParallaxSection />
    </main>
  );
}
