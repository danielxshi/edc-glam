// app/account/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_ACCOUNT_DETAILS } from "@/lib/customer-queries";
import AccountDetailsForm from "@/components/account/AccountDetailsForm";
import AccountNav from "@/components/account/AccountNav";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AccountDetailsPage() {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) redirect("/account/login?next=/account");

  const res = await shopifyFetch<any>({
    query: QUERY_ACCOUNT_DETAILS,
    variables: { accessToken: token as string } as any, // <-- TS-safe cast
    cache: "no-store",
  });

  const c = res?.body?.data?.customer as
    | {
        email: string | null;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        acceptsMarketing: boolean | null;
      }
    | null
    | undefined;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 min-h-[84vh] pt-36">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <AccountNav />
        </aside>

        {/* Content */}
        <section className="col-span-12 md:col-span-9">
          <h1 className="mb-6 text-xl font-semibold">Account Details</h1>

          <div className="rounded-xl border bg-white/60 p-6">
            <AccountDetailsForm
              firstName={c?.firstName}
              lastName={c?.lastName}
              email={c?.email}
              phone={c?.phone}
              acceptsMarketing={c?.acceptsMarketing ?? false}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
