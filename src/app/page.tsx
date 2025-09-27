// app/page.tsx  (SERVER)
import Link from "next/link";
import SignupBanner from "@/components/signup-banner";
import FeatureCarousel from "@/components/layout/carousel"; // (client)
import FullScreenBanner from "@/components/full-screen-banner"; // can be server or client
import ZoomParallaxSection from "@/components/ZoomParallax"; // (client)
import FallbackImage from "@/components/fallback-image";
import FadeInWhenVisible from "@/components/fade-in-visible"; // (client)
import CollectionShelf from "@/components/collection/collection-shelf"; // (server)

export default function Home() {
  return (
    <main className="flex-1">
      {/* HERO SECTION (client bits inside are fine) */}
      <section className="">
        <div className="relative w-full h-screen overflow-hidden">
          <picture>
            <source media="(max-width: 1025px)" srcSet="/images/fleur-model.JPG" />
            <FallbackImage
              width={1920}
              height={1080}
              src="/images/fleur-model-rename-crop.jpg"
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>

          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <FadeInWhenVisible>
              <h1 className="text-xl font-bold mb-4">
                THE FLEUR D&apos;AMOUR COLLECTION
              </h1>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <p className="text-sm mb-6">NEW FALL INSPIRED PRESS-ON NAILS</p>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.4}>
              <Link
                href="/search"
                className="text-white text-sm tracking-wide relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-white after:mt-1 hover:opacity-80 transition"
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

            <div className="mx-auto grid items-start justify-center grid-cols-1 md:grid-cols-2 gap-2 w-full">
              {[
                {
                  href: "/product/gold-digger",
                  src: "/images/goal-digger-crop.jpg",
                  title: "Goal Digger",
                },
                {
                  href: "/product/midnight-mist",
                  src: "/images/midnight-mist-model-rename.jpg",
                  title: "Midnight Mist",
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
                        <h3 className="z-[10] text-center w-full absolute bottom-2 mx-auto text-sm px-2 py-1 text-white tracking-[1px]">
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

      {/* 👇 INSERT THE SERVER COLLECTION SECTION EXACTLY WHERE YOU WANT */}
      <CollectionShelf />

      {/* BANNERS / CAROUSEL */}
      <FullScreenBanner
        imageUrl="/images/emerald-tide.jpg"
        title="Explore Our Emerald Tide Collection"
        // description="Don't miss out on our amazing deals and discounts."
      />

      <FadeInWhenVisible>
        <section className="mt-12 md:mt-24 lg:mt-32 w-full bg-[url('/sale-backdrop.svg')] grid place-content-center">
          <FeatureCarousel />
        </section>
      </FadeInWhenVisible>

      {/* <ZoomParallaxSection /> */}
    </main>
  );
}
