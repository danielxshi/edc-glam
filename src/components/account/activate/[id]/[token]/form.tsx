// src/app/account/activate/[id]/[token]/form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivateForm({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/account/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, password }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Activation failed");
      // success: send them to login (or /account)
      router.replace("/account/login");
    } catch (e: any) {
      setErr(e.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="token" value={token} />
      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <div className="flex gap-2">
          <input
            className="w-full rounded border px-3 py-2"
            type={show ? "text" : "password"}
            minLength={6}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />
          <button
            type="button"
            className="rounded border px-3 py-2 text-sm"
            onClick={() => setShow((s) => !s)}
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-60"
      >
        {submitting ? "Activating…" : "Activate account"}
      </button>
    </form>
  );
}
