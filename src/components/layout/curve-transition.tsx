'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { text, curve, translate } from './anim';

const routes = {
  "/": "Home",
  "/about": "About",
  "/contact": "Contact",
  "/search/womens-collection": "Beachside",
  "/search/mens-collection": "Pearl Tide",
  "/search/kids": "Song of Mermaids",
  "/search/sales": "Ocean Sire",
};

const anim = (variants: any) => ({
  variants,
  initial: "initial",
  animate: "enter",
  exit: "exit"
});

export default function CurveTransition({
  children,
  route,
}: {
  children: React.ReactNode;
  route: string;
}) {
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="page curve">
      <div style={{ opacity: dimensions ? 0 : 1 }} className="background" />
      <AnimatePresence mode="wait">
        <motion.p className="route" key={route} {...anim(text)}>
          {routes[route] ?? ""}
        </motion.p>
      </AnimatePresence>
      {dimensions && <SVG {...dimensions} />}
      {children}
    </div>
  );
}

const SVG = ({ height, width }: { height: number; width: number }) => {
  const initialPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height + 300}
    Q${width / 2} ${height + 600} 0 ${height + 300}
    L0 0
  `;

  const targetPath = `
    M0 300
    Q${width / 2} 0 ${width} 300
    L${width} ${height}
    Q${width / 2} ${height} 0 ${height}
    L0 0
  `;

  return (
    <motion.svg className="fixed top-0 left-0 w-full h-[calc(100vh+600px)] pointer-events-none" {...anim(translate)}>
      <motion.path fill="black" {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  );
};
