// app/search/page.tsx (SERVER COMPONENT)
import Link from 'next/link'
import Grid from '@/components/grid'
import ProductGridItems from '../../components/layout/product-grid-items'
import { defaultSort, sorting } from '../../lib/constants'
import { getCollectionWithProducts } from '../../lib/shopify'

export const metadata = {
  title: 'Search',
  description: 'Browse a specific collection.',
}

const DEFAULT_COLLECTION_HANDLE = 'test' // <-- your handle

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolved = (await searchParams) || {}
  const { sort, collection: handleParam } = resolved as { [key: string]: string }

  const { sortKey, reverse } =
    sorting.find((s) => s.slug === sort) || defaultSort

  const { collection, products } = await getCollectionWithProducts({
    handle: handleParam || DEFAULT_COLLECTION_HANDLE,
    sortKey,
    reverse,
  })

  if (!collection) return <p className="mb-4">Collection not found.</p>

  // Use the path your reshapeCollection() created; fallback to /search/[handle]
  const collectionHref = collection.path ?? `/search/${collection.handle}`

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p>
          Showing {products.length}{' '}
          {products.length === 1 ? 'product' : 'products'} in “{collection.title}”
        </p>

        {/* Navigation button to the collection page */}
        <Link
          href={collectionHref}
          prefetch={false}
          className="inline-flex items-center rounded-md border border-black px-4 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
        >
          View full collection
        </Link>
      </div>

      {products.length > 0 && (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </>
  )
}
