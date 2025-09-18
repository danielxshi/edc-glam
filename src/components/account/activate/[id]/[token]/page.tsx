// src/app/account/activate/[id]/[token]/page.tsx
import { notFound, redirect } from 'next/navigation'

export default async function ActivatePage({
  params,
}: {
  params: { id: string; token: string }
}) {
  const { id, token } = params

  // Call Shopify's activation endpoint
  const res = await fetch(
    `https://your-shopify-shop.myshopify.com/account/activate/${id}/${token}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // Might need credentials/cookies if activating automatically
    }
  )

  if (!res.ok) {
    return notFound()
  }

  // On success, redirect to login or account page
  redirect('/account/login')
}
