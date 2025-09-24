// app/account/order-history/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_CUSTOMER_ORDERS } from "@/lib/customer-queries";
import AccountNav from "@/components/account/AccountNav";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Money = { amount: string; currencyCode: string };
type OrderNode = {
  id: string;
  orderNumber: number;
  processedAt: string;
  statusUrl: string | null;
  financialStatus: string | null;
  fulfillmentStatus: string | null;
  totalPriceV2: Money;
  lineItems: {
    pageInfo: { hasNextPage: boolean };
    edges: {
      node: {
        title: string;
        quantity: number;
        variant?: {
          image?: { url: string; altText: string | null } | null;
        } | null;
      };
    }[];
  };
};

export default async function OrderHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ after?: string | string[] }>;
}) {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) redirect("/account/login?next=/account/order-history");

  const sp = await searchParams;
  const after = typeof sp?.after === "string" ? sp.after : undefined;

  const res = await shopifyFetch<any>({
    query: QUERY_CUSTOMER_ORDERS,
    variables: { accessToken: token as string, first: 20, after } as any, // <-- TS-safe cast
    cache: "no-store",
  });

  const ordersConn = res?.body?.data?.customer?.orders as
    | {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        edges: { cursor: string; node: OrderNode }[];
      }
    | undefined;

  const edges = ordersConn?.edges ?? [];
  const hasNext = ordersConn?.pageInfo?.hasNextPage ?? false;
  const endCursor = ordersConn?.pageInfo?.endCursor ?? undefined;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 min-h-[84vh] pt-36">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3">
        <AccountNav />
        </aside>

        <section className="col-span-12 md:col-span-9">
          <div className="mb-6 text-sm tracking-wide">
            <span className="font-medium underline">ORDERS</span>
          </div>

          <div className="divide-y">
            {edges.length === 0 ? (
              <EmptyState />
            ) : (
              edges.map(({ node }) => <OrderRow key={node.id} order={node} />)
            )}
          </div>

          {hasNext && endCursor && (
            <div className="mt-10 flex justify-center">
              <Link
                href={`/account/order-history?after=${encodeURIComponent(endCursor)}`}
                className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
              >
                Load more
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function OrderRow({ order }: { order: OrderNode }) {
  const dateLabel = formatDateUpper(order.processedAt);
  const total = formatMoney(order.totalPriceV2);
  const thumbs = order.lineItems.edges
    .slice(0, 4)
    .map(({ node }) => node.variant?.image?.url)
    .filter(Boolean) as string[];
  const hasMoreItems = order.lineItems.pageInfo.hasNextPage;

  return (
    <div className="py-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="text-xs font-medium tracking-wider">{dateLabel}</div>
        {order.statusUrl && (
          <a
            href={order.statusUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline"
          >
            View Details
          </a>
        )}
      </div>

      <div className="flex items-center justify-between gap-6">
        <div className="space-y-1 text-sm">
          {/* <div className="uppercase text-gray-700">{pretty(order.fulfillmentStatus) || "—"}</div> */}
          <div className="text-gray-800">
            Order <span className="font-medium">{order.orderNumber}</span>
          </div>
          <div className="text-gray-800">{total}</div>
          {order.statusUrl && (
            <a
              href={order.statusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Track Order
            </a>
          )}
        </div>

        <div className="flex items-center gap-3">
          {thumbs.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt=""
              className="h-32 w-32 rounded object-cover"
            />
          ))}
          {hasMoreItems && <span className="text-sm text-gray-500">…</span>}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="py-10 text-center">
      <p className="text-sm text-gray-600">You don’t have any orders yet.</p>
      <Link
        href="/shop"
        className="mt-4 inline-block rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
      >
        Start shopping
      </Link>
    </div>
  );
}

function formatMoney(m: Money) {
  const amount = Number.parseFloat(m.amount);
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: m.currencyCode,
    }).format(amount);
  } catch {
    return `${m.amount} ${m.currencyCode}`;
  }
}

function formatDateUpper(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  })
    .format(d)
    .toUpperCase();
}

function pretty(s: string | null) {
  if (!s) return "";
  return s
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}
