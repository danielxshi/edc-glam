// src/app/account/activate/[...slug]/page.tsx
import ActivationForm from "./ClientForm";

export const metadata = {
  title: "Account Activation",
};

export default async function ActivatePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  // In your setup, params is a Promise – await it:
  const { slug = [] } = await params;
  const [id, token] = slug;

  if (!id || !token) {
    return (
      <div className="p-6 space-y-2">
        <h1 className="text-xl font-semibold">Account Activation</h1>
        <p>Missing fields.</p>
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
