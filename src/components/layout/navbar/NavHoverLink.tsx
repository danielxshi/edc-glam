"use client";

import Link from "next/link";
import { forwardRef, useState } from "react";
import { motion, useReducedMotion, type Transition } from "framer-motion";

export interface NavHoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  ariaLabel?: string;
  underlineClassName?: string;
  underlineOffsetPx?: number;      // default -2
  underlineThicknessPx?: number;   // default 1
  disableHover?: boolean;
  /** Spring tuning for underline; set to null to disable animation entirely */
  underlineSpring?:
    | { type: "spring"; stiffness: number; damping: number }
    | { duration: number }
    | null;
  /** Timing for text lift; set to null to disable animation entirely */
  textTiming?: { duration: number; ease?: Transition["ease"] } | null; // <- ✨ key change
}

const NavHoverLink = forwardRef<HTMLAnchorElement, NavHoverLinkProps>(
  (
    {
      href,
      children,
      className = "",
      active = false,
      ariaLabel,
      underlineClassName = "bg-current",
      underlineOffsetPx = -2,
      underlineThicknessPx = 1,
      disableHover = false,
      underlineSpring,
      textTiming,
    },
    ref
  ) => {
    const [hovered, setHovered] = useState(false);
    const reduce = useReducedMotion();

    const show = active || (hovered && !disableHover);

    // Transitions typed as Transition to satisfy framer-motion
    const underlineTransition: Transition =
      (underlineSpring as Transition | undefined) ??
      (reduce ? { duration: 0 } : { type: "spring", stiffness: 600, damping: 44 });

    const textTransition: Transition =
      (textTiming as Transition | undefined) ??
      (reduce ? { duration: 0 } : { duration: 0.18, ease: "easeOut" as const });

    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={`relative inline-block focus-visible:outline-none ${className}`}
        onMouseEnter={!disableHover ? () => setHovered(true) : undefined}
        onMouseLeave={!disableHover ? () => setHovered(false) : undefined}
        onFocus={!disableHover ? () => setHovered(true) : undefined}
        onBlur={!disableHover ? () => setHovered(false) : undefined}
        ref={ref}
      >
        <motion.span
          initial={false}
          animate={{ y: show ? -1 : 0, opacity: show ? 1 : 0.92 }}
          transition={textTransition}
        >
          {children}
        </motion.span>

        {/* underline grows from center out; stays visible when active */}
        <motion.span
          aria-hidden
          className={`absolute left-0 w-full ${underlineClassName}`}
          style={{
            height: underlineThicknessPx,
            bottom: underlineOffsetPx,
            transformOrigin: "center",
          }}
          initial={false}
          animate={{ scaleX: show ? 1 : 0, opacity: show ? 1 : 0.9 }}
          transition={underlineTransition}
        />
      </Link>
    );
  }
);

NavHoverLink.displayName = "NavHoverLink";
export default NavHoverLink;
