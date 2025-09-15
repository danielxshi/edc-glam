"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import FallbackImage from "../components/fallback-image";
import SignupBanner from "@/components/signup-banner";
import FeatureCarousel from "@/components/layout/carousel";
import FullScreenBanner from "@/components/full-screen-banner";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ZoomParallaxSection from "@/components/ZoomParallax";

import Image from "next/image";

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
    if (inView) {
      controls.start("visible");
    }
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
      <section className="-mt-16">
        <div className="relative w-full h-screen overflow-hidden">
          <video
            src="https://diorama.dam-broadcast.com/pm_11872_1144_1144734-swbk36l7d4-h265.mp4"
            // alt="Background"
            // fill
            // priority
            autoPlay
            loop
            muted
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <FadeInWhenVisible>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                THE TROPICAL COLLECTION
              </h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-lg md:text-xl mb-6">
                NEW SUMMER INSPIRED PRESS-ON NAILS
              </p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <Link
                href="/search"
                className="bg-white text-black px-6 py-3 text-sm font-semibold rounded hover:bg-gray-200 transition"
              >
                SHOP NOW
              </Link>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 grid">
        <FadeInWhenVisible>
          <div className="space-y-12 px-4 md:px-6 w-full">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  New Arrivals
                </div>
                <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trending Now
                </h2>
                <Link
                  href="/search/best-sellers"
                  style={{
                    maxWidth: "900px",
                    fontSize: "0.875rem",
                    lineHeight: "1.625",
                    textDecoration: "underline",
                    marginTop: "2rem",
                  }}
                >
                  Discover the Collection
                </Link>
              </div>
            </div>

            <div className="mx-auto grid items-start justify-center grid-cols-2 gap-2 w-full">
              {[
                {
                  href: "/search/mens-collection",
                  src: "/mens-collection.png",
                  title: "Collection",
                },
                {
                  href: "/search/kids",
                  src: "/kids-collection.png",
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
                      {/* Sized container controls layout */}
                      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px]">
                        <h3 className="z-[100] text-center w-full absolute bottom-2 mx-auto text-sm px-2 py-1 text-white tracking-[1px]">
                          {item.title}
                        </h3>
                        <FallbackImage
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover z-[0]" // only cover on the img itself
                          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 100vw"
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

      <FullScreenBanner
        imageUrl="/your-image.jpg"
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
