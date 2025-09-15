"use client";

import styles from "./zoomparallax.module.scss";
const Picture1 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture2 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture3 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture4 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture5 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture6 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";
const Picture7 =
  "https://nailcissist.com/cdn/shop/collections/banner_4.png?v=1744778764&width=1950";

import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function ZoomParallaxSection() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"], // animation over full container
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    { src: Picture1, scale: scale4 },
    { src: Picture2, scale: scale5 },
    { src: Picture3, scale: scale6 },
    { src: Picture4, scale: scale5 },
    { src: Picture5, scale: scale6 },
    { src: Picture6, scale: scale8 },
    { src: Picture7, scale: scale9 },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, transformOrigin: "center center" }}
            className={styles.el}
          >
            <div className={styles.imageContainer}>
              <Image src={src} alt={`image-${index}`} fill />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
