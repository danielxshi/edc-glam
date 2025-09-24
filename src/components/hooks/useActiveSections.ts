'use client'

import { useEffect, useState } from 'react'

type Options = {
  /** e.g. '-20% 0px -60% 0px' to bias toward headings near the top */
  rootMargin?: string
  /** thresholds for the observer */
  threshold?: number | number[]
  /** fallback when no section is intersecting */
  initial?: string
}

/** Observe a list of element ids and return the id of the most visible one */
export function useActiveSection(ids: string[], options: Options = {}) {
  const [active, setActive] = useState<string | undefined>(
    options.initial ?? ids[0]
  )

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setActive(options.initial ?? ids[0])
      return
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        rootMargin: options.rootMargin ?? '-20% 0px -60% 0px',
        threshold: options.threshold ?? [0, 0.25, 0.5, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|'), options.rootMargin, JSON.stringify(options.threshold)])

  return active
}
