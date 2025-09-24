"use client";

import Image from "next/image";
import FallbackImage from "./fallback-image"; // Adjust the path as needed
import Link from "next/link";

interface FullScreenBannerProps {
  imageUrl: string;
  title: string;
  description?: string;
}

const FullScreenBanner: React.FC<FullScreenBannerProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <section className="mt-12 md:mt-24 lg:mt-32 relative w-full h-screen flex items-center justify-center text-white text-center px-4">
      {/* Background Image */}
      <FallbackImage
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0  z-10 flex items-center justify-center">
        <div className="p-6 rounded-lg max-w-2xl space-y-4">
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h3>
          <p className="text-lg md:text-xl">{description}</p>
          <div className="flex w-fit mx-auto">
            <Link
              href="/search"
              className="text-white text-sm tracking-wide relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-white after:mt-1 hover:opacity-80 transition max-w-fit"
            >
              Discover the Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullScreenBanner;
