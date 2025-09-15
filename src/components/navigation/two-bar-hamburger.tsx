"use client";

import React from "react";
import { motion, type Transition, useReducedMotion } from "framer-motion";

type Props = {
  open: boolean;          // <- controlled by parent
  size?: number;
  thickness?: number;
  gap?: number;
  color?: string;
  rounded?: number;
  className?: string;
  duration?: number;
  openDelay?: number;     // delay when opening
  closeDelay?: number;    // delay when closing
};

export default function TwoBarHamburger({
  open,
  size = 28,
  thickness = 2,
  gap = 8,
  color = "currentColor",
  rounded = 1,
  className,
  duration = 0.28,
  openDelay = 0.1,
  closeDelay = 0.25, // slightly longer
}: Props) {
  const w = size;
  const h = Math.round(size * 0.68);
  const cy = h / 2;

  // Static positions
  const topY = cy - gap / 2 - thickness / 2;
  const botY = cy + gap / 2 - thickness / 2;
  const offset = gap / 2;

  const prefersReduced = useReducedMotion();

  // Pick delay depending on state
  const transition: Transition = prefersReduced
    ? { duration: 0 }
    : {
        type: "tween",
        ease: [0.22, 1, 0.36, 1],
        duration,
        delay: open ? openDelay : closeDelay,
      };

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      role="img"
      className={className}
    >
      {/* Top bar */}
      <motion.rect
        width={w}
        height={thickness}
        x={0}
        y={topY}
        rx={rounded}
        fill={color}
        animate={{ y: open ? offset : 0 }}
        transition={transition}
      />
      {/* Bottom bar */}
      <motion.rect
        width={w}
        height={thickness}
        x={0}
        y={botY}
        rx={rounded}
        fill={color}
        animate={{ y: open ? -offset : 0 }}
        transition={transition}
      />
    </svg>
  );
}
