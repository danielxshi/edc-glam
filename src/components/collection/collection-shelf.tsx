// app/search/page.tsx (SERVER COMPONENT)
import Link from "next/link";
import Grid from "@/components/grid";
import ProductGridItems from "../../components/layout/product-grid-items";
import { defaultSort, sorting } from "../../lib/constants";
import { getCollectionWithProducts } from "../../lib/shopify";

export const metadata = {
  title: "Search",
  description: "Browse a specific collection.",
};

const DEFAULT_COLLECTION_HANDLE = "midnight-mist-collection"; // <-- your handle

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolved = (await searchParams) || {};
  const { sort, collection: handleParam } = resolved as {
    [key: string]: string;
  };

  const { sortKey, reverse } =
    sorting.find((s) => s.slug === sort) || defaultSort;

  const { collection, products } = await getCollectionWithProducts({
    handle: handleParam || DEFAULT_COLLECTION_HANDLE,
    sortKey,
    reverse,
  });

  if (!collection) return <p className="mb-4">Collection not found.</p>;

  // Use the path your reshapeCollection() created; fallback to /search/[handle]
  const collectionHref = collection.path ?? `/search/${collection.handle}`;

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:mx-6 mx-4">
        <h3 className="text-base tracking-wider uppercase font-bold">
          {/* Showing {products.length}{" "} */}
          {/* {products.length === 1 ? "product" : "products"} in */}
          {collection.title} Collection
        </h3>
      </div>
      {products.length > 0 && (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:mx-6 mx-4">
          <ProductGridItems products={products} />
        </Grid>
      )}
      <div className="mb-4 flex items-center justify-between md:mx-6 mx-4">
        {/* Navigation button to the collection page */}
        <Link
          href={collectionHref}
          prefetch={false}
          className="inline-flex items-center rounded-[3px] px-6 py-2 text-xs hover:opacity-70 bg-black text-white transition mx-auto mt-3 uppercase tracking-wider"
        >
          View full collection
        </Link>
      </div>
    </>
  );
}
