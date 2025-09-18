// src/app/account/activate/[...slug]/page.tsx
import { notFound, redirect } from "next/navigation";
import { activateCustomer } from "@/lib/shopify";

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;              // ← await the promise
  const [id, token] = slug ?? [];

  if (!id || !token) return notFound();

  // simplest: auto-activate with a temporary password
  const tempPassword = "Temp#12345";
  const { customer, userErrors } = await activateCustomer({
    id,
    token,
    password: tempPassword,
  });

  if (!customer?.id) return notFound(); // or render a nicer error using `userErrors`

  redirect("/account/login");
}
