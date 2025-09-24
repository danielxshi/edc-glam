import type { FAQSection } from './type'
import FAQItem from './FAQItem'

type Props = {
  section: FAQSection
  className?: string
  titleClassName?: string
}

export default function FAQGroup({
  section,
  className = 'scroll-mt-24 pb-4',
  titleClassName = 'text-base font-semibold uppercase tracking-wide',
}: Props) {
  return (
    <div id={section.id} className={className}>
      <h2 className={titleClassName}>{section.title}</h2>
      <div className="divide-y">
        {section.items.map((item: FAQSection['items'][number], i: number) => (
          <FAQItem key={`${section.id}-${i}`} item={item} index={i} sectionId={section.id} />
        ))}
      </div>
    </div>
  )
}
