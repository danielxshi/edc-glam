import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify";
import { QUERY_ME } from "@/lib/customer-queries";

export default async function AccountPage() {
  const token = (await cookies()).get("sf_customer_token")?.value;
  if (!token) return <div className="p-6">Please sign in.</div>;

  const r = await shopifyFetch<any>({
    query: QUERY_ME,
    variables: { accessToken: token },
    cache: "no-store",
  });

  const c = r?.body?.data?.customer;
  if (!c) return <div className="p-6">Session expired. Please sign in again.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Your account</h1>
      <p>{[c.firstName, c.lastName].filter(Boolean).join(" ") || c.email}</p>
      {/* Add orders list later if you want */}
      <form action="/api/auth/logout" method="post">
        <button className="px-3 py-2 border rounded">Sign out</button>
      </form>
    </div>
  );
}
