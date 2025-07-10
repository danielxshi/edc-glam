import Link from "next/link";
import FallbackImage from "../components/fallback-image";
import Image from "next/image";
import SignupBanner from "@/components/signup-banner";
import FeatureCarousel from "@/components/layout/carousel";
export const metadata = {
  description:
    "High-performance e-commerce store built with Next.js and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1">
      <section>
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background image */}
          <Image
            src="https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?_gl=1*f3nfzs*_ga*NjU4MTIyMTMzLjE3NTIxMTIzMTk.*_ga_8JE65Q40S6*czE3NTIxMTIzMTkkbzEkZzEkdDE3NTIxMTIzMzckajQyJGwwJGgw" // replace with remote URL or static file
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
            className="-z-10"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              THE TROPICAL COLLECTION
            </h1>
            <p className="text-lg md:text-xl mb-6">
              NEW SUMMER INSPIRED PRESS-ON NAILS
            </p>
            <Link
              href="/shop"
              className="bg-white text-black px-6 py-3 text-sm font-semibold rounded hover:bg-gray-200 transition"
            >
              SHOP NOW
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 grid place-content-center">
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
                Check out our latest collection of stylish and comfortable
                clothing.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
            <div className="grid gap-1">
              <Link
                href="/search/womens-collection"
                className="group"
                prefetch={false}
              >
                <FallbackImage
                  src="/womens-collection.png"
                  width={400}
                  height={500}
                  alt="Women's Collection"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  Women\&apos;s Collection
                </h3>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link
                href="/search/mens-collection"
                className="group"
                prefetch={false}
              >
                <FallbackImage
                  src="/mens-collection.png"
                  width={400}
                  height={500}
                  alt="Men's Collection"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  Men\&apos;s Collection
                </h3>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link href="/search/kids" className="group" prefetch={false}>
                <FallbackImage
                  src="/kids-collection.png"
                  width={400}
                  height={500}
                  alt="Kids' Collection"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  Kids\&apos;s Collection
                </h3>
              </Link>
            </div>
            <div className="grid gap-1">
              <Link href="/search/sales" className="group" prefetch={false}>
                <FallbackImage
                  src="/sales-collection.png"
                  width={400}
                  height={500}
                  alt="Sale's Collection"
                  className="aspect-[4/5] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform"
                />
                <h3 className="mt-4 text-lg font-bold group-hover:underline">
                  Sale\&apos;s Collection
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-12 md:pt-24 lg:pt-32 border-bottom-b">
        <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Discover the Latest Fashion Trends
              </h1>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our curated collections of stylish apparel and
                accessories for every occasion.
              </p>
              <div className="flex flex-col w-full md:flex-row gap-2 text-nowrap">
                <Link
                  href="/search/womens-collection"
                  className="inline-flex h-9 items-center justify-center rounded-md border bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Women
                </Link>
                <Link
                  href="/search/mens-collection"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Men
                </Link>
                <Link
                  href="/search/sales"
                  className="inline-flex h-9 items-center justify-center rounded-md border border-red-300 border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-red-300 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Sales
                </Link>
              </div>
            </div>
          </div>
          <FallbackImage
            src="/banner.png"
            width={1270}
            height={300}
            alt="Hero"
            className="mx-auto rounded-t-xl object-cover"
          />
        </div>
      </section>
      <section className="w-full py-12 lg:py-7 bg-[url('/sale-backdrop.svg')] grid place-content-center">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <FallbackImage
            width={400}
            height={500}
            src="/sale-banner.svg"
            alt="sale footer banner"
          />
          <div className="space-y-3 z-50">
            <div className="bg-white dark:bg-black">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight p-2">
                Explore Our Sale Collection
              </h2>
            </div>
            <div className="bg-white">
              <p className="mx-auto max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed p-2">
                Don&apos;t miss out on our amazing deals and discounts.
              </p>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2 z-50">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-slate-200 dark:bg-black px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}
            >
              Shop Sale
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-12 lg:py-7 bg-[url('/sale-backdrop.svg')] grid place-content-center">
        <FeatureCarousel />
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 grid place-content-center">
        <div className="space-y-12 px-4 md:px-6">
          <div className="mx-auto grid items-start justify-center gap-8  sm:grid-cols-2 md:gap-12  lg:grid-cols-3 px-4">
            <div className="grid gap-1">
              <Link href="/search/short" className="group" prefetch={false}>
                <FallbackImage
                  src="/images/short-nails.png" // use correct paths
                  width={400}
                  height={500}
                  alt="Short Press-On Nails"
                  className="aspect-[4/5] h-[80vh] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="mt-4 text-center text-sm font-semibold tracking-wider group-hover:underline uppercase">
                  Shop Short Press-On Nails
                </h3>
              </Link>
            </div>

            <div className="grid gap-1">
              <Link href="/search/medium" className="group" prefetch={false}>
                <FallbackImage
                  src="/images/medium-nails.png"
                  width={400}
                  height={500}
                  alt="Medium Press-On Nails"
                  className="aspect-[4/5] h-[80vh] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="mt-4 text-center text-sm font-semibold tracking-wider group-hover:underline uppercase">
                  Shop Medium Press-On Nails
                </h3>
              </Link>
            </div>

            <div className="grid gap-1">
              <Link href="/search/long" className="group" prefetch={false}>
                <FallbackImage
                  src="/images/long-nails.png"
                  width={400}
                  height={500}
                  alt="Long Press-On Nails"
                  className="aspect-[4/5] h-[80vh] overflow-hidden rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <h3 className="mt-4 text-center text-sm font-semibold tracking-wider group-hover:underline uppercase">
                  Shop Long Press-On Nails
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 lg:py-7 bg-[url('/sale-backdrop.svg')] grid place-content-center">
        <SignupBanner />
      </section>
    </main>
  );
}
