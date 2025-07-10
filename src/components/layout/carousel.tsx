'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const features = [
  {
    title: 'Easy Application',
    description:
      'Our press-on nails take under 15 minutes to apply. Learn about application, removal, and more with our tutorials page.',
    imageUrl: '/images/nail-tutorial-1.png',
    linkText: 'Tutorials',
    linkHref: '/tutorials',
  },
  {
    title: 'Reusable Quality',
    description:
      'Made to last. Each set is designed for multiple wears with proper care and storage.',
    imageUrl: '/images/nail-tutorial-2.png',
    linkText: 'Learn More',
    linkHref: '/care',
  },
];

const FeatureCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full overflow-hidden py-16">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center max-w-screen-2xl mx-auto px-6">
        {/* Fixed height wrapper to prevent flickering */}
        <div className="relative w-full lg:w-1/2 h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[index].imageUrl}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={features[index].imageUrl}
                alt={features[index].title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-16 text-center lg:text-left min-h-[400px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={features[index].title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 uppercase">{features[index].title}</h2>
              <p className="text-gray-600 mb-6">{features[index].description}</p>
              <Link
                href={features[index].linkHref}
                className="underline font-medium hover:text-pink-600 transition"
              >
                {features[index].linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="mt-8 flex justify-center gap-3">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? 'bg-pink-600 scale-110' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureCarousel;
