import type { FAQSection } from '@/components/legal/faq/type'

export const FAQ_DATA: FAQSection[] = [
  {
    id: 'product-information',
    title: 'Product Information',
    items: [
      {
        q: 'What are the benefits of press-on nails?',
        a: (
          <p>
            Quick application, salon-quality looks, and easy removal without damaging
            natural nails. Great for low-commitment styles or events.
          </p>
        ),
      },
      {
        q: 'How long do they last?',
        a: (
          <p>
            With nail glue, up to 2–4 weeks depending on prep and lifestyle.
            With adhesive tabs, usually 3–7 days.
          </p>
        ),
      },
      {
        q: 'Can I reuse them?',
        a: (
          <p>
            Yes—remove carefully, clean off residue, and store in the original tray.
            Reuse depends on wear and removal method.
          </p>
        ),
      },
    ],
  },
  {
    id: 'sizing',
    title: 'Sizing',
    items: [
      {
        q: 'How do I find my size?',
        a: (
          <p>
            Measure nail beds in millimeters at the widest point or order a sizing kit.
            Match measurements to our size chart on the Sizing page.
          </p>
        ),
      },
      { q: 'Do you offer custom sizes?', a: <p>Yes—choose “Custom” at checkout and enter measurements for all ten nails.</p> },
    ],
  },
  {
    id: 'customer-care',
    title: 'Customer Care',
    items: [
      {
        q: 'How do I apply press-on nails?',
        a: (
          <ol className="list-decimal ms-4 space-y-1">
            <li>Push back cuticles and buff lightly.</li>
            <li>Clean with alcohol pad and let dry.</li>
            <li>Apply a thin layer of glue or an adhesive tab.</li>
            <li>Press firmly for 15–30 seconds.</li>
          </ol>
        ),
      },
      {
        q: 'How do I remove them?',
        a: <p>Soak in warm soapy water or oil for 10–15 minutes. Gently wiggle from the sides—do not force.</p>,
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment',
    items: [
      { q: 'Which payment methods are accepted?', a: <p>All major cards, Shop&nbsp;Pay, Apple&nbsp;Pay, and PayPal.</p> },
      { q: 'Is my payment information secure?', a: <p>Yes—transactions are processed via PCI-compliant providers over HTTPS.</p> },
    ],
  },
  {
    id: 'shipping-delivery',
    title: 'Shipping & Delivery',
    items: [
      { q: 'Do you ship internationally?', a: <p>Yes—rates and delivery times are shown at checkout based on destination.</p> },
      { q: 'When will my order ship?', a: <p>In-stock sets ship in 1–3 business days. Custom sets ship in 5–10 business days.</p> },
    ],
  },
  {
    id: 'returns',
    title: 'Returns',
    items: [
      {
        q: 'What is your return policy?',
        a: <p>Unused, unopened items can be returned within 14 days of delivery. Custom sets are final sale unless defective.</p>,
      },
      { q: 'How do I start a return?', a: <p>Contact support with your order number. We’ll provide a return authorization.</p> },
    ],
  },
  {
    id: 'gift-cards',
    title: 'Gift Cards',
    items: [
      { q: 'Do gift cards expire?', a: <p>No—they never expire and can be used across the store.</p> },
      { q: 'Can I combine gift cards?', a: <p>Yes—multiple cards can be applied at checkout.</p> },
    ],
  },
]
