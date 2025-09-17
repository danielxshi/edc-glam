// src/app/api/collections/[handle]/route.ts
import { NextResponse } from "next/server";
import { getCollectionWithProducts } from "@/lib/shopify";

export async function GET(
  req: Request,
  ctx: { params: Promise<{ handle: string }> } // 👈 promise
) {
  try {
    const { handle } = await ctx.params; // 👈 await it
    const url = new URL(req.url);
    const first = Number(url.searchParams.get("first") || 24);
    const sortKey = url.searchParams.get("sortKey") || "BEST_SELLING";
    const reverse = url.searchParams.get("reverse") === "true";

    const { collection, products } = await getCollectionWithProducts({
      handle,
      sortKey,
      reverse,
      first,
    });

    // TEMP debug
    // eslint-disable-next-line no-console
    console.log("=== COLLECTION DEBUG ===", JSON.stringify(collection, null, 2));

    // Return 200 always; let UI handle nulls
    return NextResponse.json({ collection, products });
  } catch (e) {
    console.error("Collection API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
