// File: components/layout/transition/transition-provider.tsx
"use client";

import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext({
  isTransitioning: false,
  startTransition: (cb: () => void) => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (navigate: () => void) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    document.body.classList.add('transitioning');

    setTimeout(() => {
      navigate();
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.classList.remove('transitioning');
      }, 400);
    }, 800);
  };

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
