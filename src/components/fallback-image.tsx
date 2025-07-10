"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface FallbackImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
}

export default function FallbackImage({
  src,
  alt,
  className,
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={() =>
        setImgSrc(
          "https://images.pexels.com/photos/16777895/pexels-photo-16777895.jpeg?_gl=1*we7t9o*_ga*NzkyMTYzMzc4LjE3NDQ5MDQ3MDg.*_ga_8JE65Q40S6*czE3NTIxNjkzMDckbzMkZzEkdDE3NTIxNjkzMTIkajU1JGwwJGgw"
        )
      }
      className={className}
      {...props}
    />
  );
}
