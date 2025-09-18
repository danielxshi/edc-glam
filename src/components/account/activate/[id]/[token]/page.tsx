// src/app/account/activate/[id]/[token]/page.tsx
import ActivateForm from "./form";

export default function ActivatePage({
  params,
}: {
  params: { id: string; token: string };
}) {
  const { id, token } = params;
  // render a password set form; do NOT call notFound here
  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold mb-4">Activate your account</h1>
      <p className="text-sm text-gray-600 mb-6">
        Choose a password to finish activating your account.
      </p>
      <ActivateForm id={id} token={token} />
    </div>
  );
}
