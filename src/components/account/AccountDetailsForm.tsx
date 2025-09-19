"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  acceptsMarketing?: boolean | null;
};

export default function AccountDetailsForm(initial: Props) {
  const [form, setForm] = useState({
    firstName: initial.firstName ?? "",
    lastName: initial.lastName ?? "",
    email: initial.email ?? "",
    phone: initial.phone ?? "",
    acceptsMarketing: !!initial.acceptsMarketing,
    password: "",                 // new pwd (optional)
    confirm: "",                  // confirm new pwd (client-only)
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (form.password && form.password !== form.confirm) {
      setErr("Passwords don’t match");
      return;
    }

    setSaving(true);
    const payload: any = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone || undefined,
      acceptsMarketing: form.acceptsMarketing,
    };
    if (form.password) payload.password = form.password;

    const res = await fetch("/api/account/details/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);

    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setErr(j?.error || "Something went wrong");
      return;
    }

    // keep navbar/account fresh
    window.dispatchEvent(new Event("auth:changed"));
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Account Information</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
          />
          <input
            className="border p-2 rounded"
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
          />
          <input
            className="border p-2 rounded"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.acceptsMarketing}
            onChange={(e) => setForm(f => ({ ...f, acceptsMarketing: e.target.checked }))}
          />
          Receive emails about new drops & promotions
        </label>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">Account Password</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="New password"
            value={form.password}
            onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
          />
          <input
            className="border p-2 rounded"
            type="password"
            placeholder="Confirm new password"
            value={form.confirm}
            onChange={(e) => setForm(f => ({ ...f, confirm: e.target.value }))}
          />
        </div>
        <p className="mt-2 text-xs text-gray-500">
          Leave password fields blank to keep your current password.
        </p>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-full border px-5 py-2 text-sm hover:bg-gray-50 disabled:opacity-60"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
