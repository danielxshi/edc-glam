"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface FallbackImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function FallbackImage({
  src,
  alt,
  className,
  style,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() =>
        setImgSrc(
          "https://images.pexels.com/photos/16777895/pexels-photo-16777895.jpeg"
        )
      }
      className={className}
      style={style}
      unoptimized // optional: needed if remotePatterns not configured
      {...props}
    />
  );
}
