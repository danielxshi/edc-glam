// app/components/account/AddressForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Address = {
  firstName?: string;
  lastName?: string;
  company?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  zip?: string;
  country?: string;
  phone?: string;
};

export default function AddressForm({
  initial,
  id,
  onDone,
}: {
  initial?: Address;
  id?: string; // if present => edit mode
  onDone?: () => void;
}) {
  const [form, setForm] = useState<Address>(initial ?? {});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  // allowlist + picker (strips id/unknown fields)
  const ALLOWED = [
    "firstName",
    "lastName",
    "company",
    "address1",
    "address2",
    "city",
    "province",
    "zip",
    "country",
    "phone",
  ] as const;

  const pickAllowed = (o: any) => {
    const out: any = {};
    for (const k of ALLOWED) if (o?.[k] != null && o[k] !== "") out[k] = o[k];
    return out;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);

    const address = pickAllowed(form); // strips id and unknown keys
    const endpoint = id
      ? "/api/account/addresses/update"
      : "/api/account/addresses/create";
    const body = id ? { id, address } : address;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Something went wrong");
      return;
    }

    onDone?.();
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="First name"
          value={form.firstName ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
        />
        <input
          className="border p-2 rounded"
          placeholder="Last name"
          value={form.lastName ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
        />
      </div>

      <input
        className="border p-2 rounded w-full"
        placeholder="Company (optional)"
        value={form.company ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
      />

      <input
        className="border p-2 rounded w-full"
        placeholder="Address line 1"
        value={form.address1 ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, address1: e.target.value }))}
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Address line 2 (optional)"
        value={form.address2 ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, address2: e.target.value }))}
      />

      <div className="grid grid-cols-3 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="City"
          value={form.city ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
        />
        <input
          className="border p-2 rounded"
          placeholder="Province/State"
          value={form.province ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, province: e.target.value }))}
        />
        <input
          className="border p-2 rounded"
          placeholder="ZIP/Postal"
          value={form.zip ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, zip: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          className="border p-2 rounded"
          placeholder="Country"
          value={form.country ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
        />
        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={form.phone ?? ""}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-full border px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
      >
        {id ? (loading ? "Saving..." : "Save changes") : (loading ? "Adding..." : "Add address")}
      </button>
    </form>
  );
}
