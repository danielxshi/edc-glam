'use client'

import { useMemo, useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import type { FAQItem as TFAQItem } from './type'

type Props = {
  item: TFAQItem
  sectionId: string
  index: number
  defaultOpen?: boolean
  className?: string
}

export default function FAQItem({
  item,
  sectionId,
  index,
  defaultOpen = false,
  className = 'py-3',
}: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useMemo(() => `${sectionId}-item-${index}`, [sectionId, index])

  return (
    <article className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="text-sm uppercase tracking-wide">{item.q}</span>
        {open ? <Minus size={18} /> : <Plus size={18} />}
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="text-xs max-w-none pb-2 text-neutral-700">
            {item.a}
          </div>
        </div>
      </div>
      {/* <div className="h-px bg-neutral-200" /> */}
    </article>
  )
}
