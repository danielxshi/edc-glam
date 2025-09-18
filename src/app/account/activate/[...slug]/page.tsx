// src/app/account/activate/[...slug]/page.tsx
import { notFound, redirect } from "next/navigation";
import { activateCustomer } from "@/lib/shopify";

// Ensure this runs on the server and never caches
export const dynamic = "force-dynamic";

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;            // Next 15: params is a Promise
  const [id, token] = slug ?? [];

  if (!id || !token) return notFound();

  try {
    // You can also show a password form; this uses a temp one-time password:
    const tempPassword = "Temp#" + Math.random().toString(36).slice(2, 8) + "A1";

    const { customer, userErrors: errors } = await activateCustomer({
      id,
      token,
      password: tempPassword,
    });

    const customerId = customer?.id;

    // Shopify returned userErrors
    if (!customerId) {
      // Render a friendly message instead of throwing
      return (
        <div style={{ padding: 24 }}>
          <h1>We couldn’t activate your account</h1>
          <p>Please request a new activation email or contact support.</p>
          {errors?.length ? (
            <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>
              {errors.map((e) => e.message).join("\n")}
            </pre>
          ) : null}
        </div>
      );
    }

    redirect("/account/login?activated=1");
  } catch (err) {
    // This shows up in server logs (Vercel "Functions" tab)
    console.error("[activate] fatal", err);
    // Re-throw so our error boundary can show a nice screen
    throw err;
  }
}
