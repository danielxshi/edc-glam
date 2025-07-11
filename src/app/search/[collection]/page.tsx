import Grid from '@/components/grid'
import ProductGridItems from '@/components/layout/product-grid-items'
import { defaultSort, sorting } from '../../../lib/constants'
import { getCollectionProducts } from '../../../lib/shopify'

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ collection: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { collection } = await params
  const resolvedSearchParams = (await searchParams) || {}
  const { sort } = resolvedSearchParams as { [key: string]: string }

  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort

  const products = await getCollectionProducts({
    collection,
    sortKey,
    reverse,
  })

  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  )
}
