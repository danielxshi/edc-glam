"use client";

import { useRouter } from "next/navigation";

export default function AddressButtons({
  id,
  isDefault,
}: { id: string; isDefault: boolean }) {
  const router = useRouter();

  const post = async (endpoint: string, body: any) => {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      {!isDefault && (
        <button
          onClick={() => post("/api/account/addresses/default", { id })}
          className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Make default
        </button>
      )}
      <button
        onClick={() => post("/api/account/addresses/delete", { id })}
        className="rounded-full border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Delete
      </button>
    </div>
  );
}
