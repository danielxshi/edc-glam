'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import FallbackImage from '../components/fallback-image';
import SignupBanner from '@/components/signup-banner';
import FeatureCarousel from '@/components/layout/carousel';
import FullScreenBanner from '@/components/full-screen-banner';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function FadeInWhenVisible({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
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
          <FallbackImage
            src="https://nailcissist.com/cdn/shop/files/Untitled_design_b4accec6-a4b2-4f66-9d85-e4023ac11aa4.png?v=1751867630&width=900"
            alt="Background"
            fill
            priority
            className="-z-10 object-cover"
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

      <section className="w-full py-12 md:py-24 lg:py-32 grid place-content-center">
        <FadeInWhenVisible>
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  New Arrivals
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Trending Now
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out our latest collection of stylish and comfortable clothing.
                </p>
              </div>
            </div>

            <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
              {[
                // { href: '/search/womens-collection', src: '/womens-collection.png', title: "Collection" },
                { href: '/search/mens-collection', src: '/mens-collection.png', title: "Collection" },
                { href: '/search/kids', src: '/kids-collection.png', title: "Collection" },
                { href: '/search/sales', src: '/sales-collection.png', title: "Collection" },
              ].map((item, i) => (
                <FadeInWhenVisible key={item.href} delay={i * 0.15}>
                  <div className="grid gap-1 card">
                    <Link href={item.href} className="group" prefetch={false}>
                      <FallbackImage
                        src={item.src}
                        width={400}
                        height={500}
                        alt={item.title}
                        className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <h3 className="mt-4 text-lg font-bold group-hover:underline">
                        {item.title}
                      </h3>
                    </Link>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      <FadeInWhenVisible>
        <section className="w-full mt-12 md:mt-24 lg:mt-32 border-bottom-b">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Discover the Latest Fashion Trends
                </h1>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Explore our curated collections of stylish apparel and accessories for every occasion.
                </p>
                <div className="flex flex-col w-full md:flex-row gap-2 text-nowrap">
                  {/* <Link href="/search/womens-collection" className="btn">
                    Shop Women
                  </Link> */}
                  <Link href="/search/mens-collection" className="btn-alt">
                    Shop Men
                  </Link>
                  <Link href="/search/sales" className="btn-sale">
                    Shop Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInWhenVisible>

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

      <FadeInWhenVisible>
        <section className="w-full mt-12 md:mt-24 lg:mt-32 bg-[url('/sale-backdrop.svg')] grid place-content-center">
          <SignupBanner />
        </section>
      </FadeInWhenVisible>
    </main>
  );
}
