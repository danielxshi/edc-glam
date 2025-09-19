import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_CUSTOMER_ADDRESSES } from "@/lib/customer-queries";
import AddressForm from "@/components/account/AddressForm";          // client
import AddressButtons from "@/components/account/AddressButtons";   // client
import ClientEdit from "@/components/account/ClientEdit";           // client

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Address = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  address1: string | null;
  address2: string | null;
  city: string | null;
  province: string | null;
  zip: string | null;
  country: string | null;
  phone: string | null;
};

export default async function AddressesPage() {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) redirect("/account/login?next=/account/addresses");

  const res = await shopifyFetch<any>({
    query: QUERY_CUSTOMER_ADDRESSES,
    variables: { accessToken: token as string, first: 50 } as any, // <-- TS-safe cast
    cache: "no-store",
  });

  const customer = res?.body?.data?.customer;
  const defaultId = customer?.defaultAddress?.id;
  const addresses = (customer?.addresses?.edges ?? []).map((e: { node: Address }) => e.node);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 min-h-[84vh] pt-24">
      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 md:col-span-3">
          <div className="sticky top-6">
            <h2 className="mb-4 text-lg font-medium">Account</h2>
            <nav className="space-y-3 text-sm flex flex-col">
              <Link href="/account/order-history" className="hover:underline">Order History</Link>
              <Link href="/account/addresses" className="underline">Addresses</Link>
              <Link href="/account" className="hover:underline">Account Details</Link>
              <Link href="/account/logout" className="hover:underline">Logout</Link>
            </nav>
          </div>
        </aside>

        <section className="col-span-12 md:col-span-9">
          <h1 className="mb-6 text-xl font-semibold">Addresses</h1>

          <div className="mb-8 rounded-xl border bg-white/60 p-5">
            <h3 className="mb-3 text-sm font-medium">Add a new address</h3>
            <AddressForm id="new" />
          </div>

          <div className="divide-y rounded-xl border bg-white/60">
            {addresses.length === 0 ? (
              <div className="p-6 text-sm text-gray-600">No addresses yet.</div>
            ) : (
              addresses.map((addr: Address) => (
                <AddressRow
                  key={addr.id}
                  addr={addr}
                  isDefault={addr.id === defaultId}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AddressRow({ addr, isDefault }: { addr: Address; isDefault: boolean }) {
  const lines = [
    [addr.firstName, addr.lastName].filter(Boolean).join(" "),
    addr.address1,
    addr.address2,
    [addr.city, addr.province, addr.zip].filter(Boolean).join(", "),
    addr.country,
    addr.phone,
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
      <div>
        <div className="text-sm text-gray-600">
          {isDefault ? "Default address" : "Address"}
        </div>
        <div className="mt-1 text-sm">
          {lines.map((l, i) => <div key={i}>{l}</div>)}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 md:items-end">
        <AddressButtons id={addr.id} isDefault={isDefault} />

        <details className="group mt-2 w-full md:w-[520px]">
          <summary className="cursor-pointer text-sm underline group-open:no-underline">
            Edit
          </summary>
          <div className="mt-3 rounded-lg border p-4">
            <ClientEdit id={addr.id} initial={addr} />
            {/* Or simply: <AddressForm id={addr.id} initial={addr} /> */}
          </div>
        </details>
      </div>
    </div>
  );
}
