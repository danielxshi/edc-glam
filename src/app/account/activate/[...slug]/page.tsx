import ActivationForm from "@/components/account/ActivationForm";
import Link from "next/link";

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const [id, token] = Array.isArray(slug) ? slug : [];

  if (!id || !token) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Account Activation</h1>
        <p className="mt-2 whitespace-pre-line">
          Something went wrong while activating your account.
          {"\n"}Missing fields
        </p>
        <Link href="/account/signup" className="mt-3 inline-block border px-3 py-2">
          Try again
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Account Activation</h1>
      <ActivationForm id={id} token={token} />
    </div>
  );
}
