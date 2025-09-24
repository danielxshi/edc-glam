// app/api/search/route.ts
import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { getProduct, getProducts } from '@/lib/shopify'
import { defaultSort, sorting } from '@/lib/constants'

// Shopify text search (title/product_type/tags)
function toProductQuery(q: string) {
  const s = q.replace(/"/g, '\\"')
  return `status:active AND (title:*${s}* OR product_type:*${s}* OR tag:*${s}*)`
}

const looksLikeHandle = (q: string) => /^[a-z0-9-]+$/.test(q)

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || '').trim()
    const sortSlug = searchParams.get('sort') || ''
    const limit = Math.min(Number(searchParams.get('limit') || 24), 50)

    if (!q) return NextResponse.json({ products: [] })

    const { sortKey, reverse } =
      sorting.find((s) => s.slug === sortSlug) || defaultSort

    // 1) Exact handle → uses getProductQuery via helper
    if (looksLikeHandle(q)) {
      const p = await getProduct(q)
      if (p) return NextResponse.json({ products: [p] })
    }

    // 2) Free-text search → uses getProductsQuery via helper
    const products = await getProducts({
      query: toProductQuery(q),
      sortKey,
      reverse,
    })

    return NextResponse.json({ products: products.slice(0, limit) })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Search failed' },
      { status: 500 }
    )
  }
}
