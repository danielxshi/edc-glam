"use client";

import Image from "next/image";
import FallbackImage from "./fallback-image"; // Adjust the path as needed

interface FullScreenBannerProps {
  imageUrl: string;
  title: string;
  description: string;
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
      <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
        <div className="p-6 rounded-lg max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default FullScreenBanner;
