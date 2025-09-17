import { NextResponse } from "next/server";
import { getCollectionWithProducts } from "@/lib/shopify";

export async function GET(
  req: Request,
  { params }: { params: { handle: string } }
) {
  try {
    const url = new URL(req.url);
    const first = Number(url.searchParams.get("first") || 24);
    const sortKey = url.searchParams.get("sortKey") || "BEST_SELLING";
    const reverse = url.searchParams.get("reverse") === "true";

    const { collection, products } = await getCollectionWithProducts({
      handle: params.handle,
      sortKey,
      reverse,
      first,
    });

    // ✅ TEMP: log the full collection object (including image)
    // eslint-disable-next-line no-console
    console.log(
      "=== COLLECTION DEBUG ===",
      JSON.stringify(collection, null, 2)
    );

    return NextResponse.json({ collection, products });
  } catch (error) {
    console.error("Collection API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
