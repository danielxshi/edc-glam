"use client";

import Image from "next/image";
import { useState } from "react";

export default function FallbackImage({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() =>
        setImgSrc("https://via.placeholder.com/400x300?text=Image+Not+Found")
      }
      {...props}
    />
  );
}
