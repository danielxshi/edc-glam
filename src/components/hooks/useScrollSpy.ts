'use client'

import { useEffect, useRef, useState } from 'react'

type Options = { offset?: number; bottomEpsilon?: number }

export function useScrollSpy(ids: string[], { offset = 80, bottomEpsilon = 2 }: Options = {}) {
  const [activeId, setActiveId] = useState<string | undefined>(ids[0])
  const ticking = useRef(false)

  useEffect(() => {
    const getActive = () => {
      const scrollY = window.scrollY || window.pageYOffset
      const line = scrollY + offset

      // Near-bottom shortcut → force last section active
      const doc = document.documentElement
      const atBottom =
        window.innerHeight + scrollY >= (doc.scrollHeight || doc.offsetHeight) - bottomEpsilon
      if (atBottom) return ids[ids.length - 1]

      // Pick the last section whose top is above the active line
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const topAbs = el.getBoundingClientRect().top + scrollY
        if (line >= topAbs - 1) current = id
        else break
      }
      return current
    }

    const update = () => {
      ticking.current = false
      const next = getActive()
      setActiveId(prev => (prev === next ? prev : next))
    }

    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids.join('|'), offset, bottomEpsilon])

  return activeId
}
