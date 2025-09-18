// src/app/account/activate/[...slug]/ClientForm.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ActivationForm({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (loading) return;              // prevent double-submit
    setError(null);

    if (password.length < 8) {
      setError("Please choose a password with at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const r = await fetch("/api/account/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, password }),
      });
      const json = await r.json();

      if (!r.ok || !json?.ok) {
        const msg =
          json?.result?.userErrors?.[0]?.message ||
          json?.error ||
          "Activation failed";
        setError(msg);
        return;                       // ⬅️ stop here on failure
      }

      // success — cookie set by API, go to account
      router.replace("/account");
    } catch (err: any) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm" aria-live="polite">
      <label className="block">
        <span className="text-sm">Create a password</span>
        <input
          type="password"
          required
          minLength={8}
          className="mt-1 w-full rounded border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded border px-4 py-2 disabled:opacity-50"
      >
        {loading ? "Activating..." : "Activate account"}
      </button>
    </form>
  );
}
