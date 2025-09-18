"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function ActivationForm({ id, token }: { id: string; token: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const r = await fetch("/api/account/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, token, password }),
      });
      const json = await r.json();
      if (!r.ok || !json.ok) {
        setError(json.error || "Activation failed");
      } else {
        // cookie set by API; take user to their account
        router.replace("/account");
      }
    } catch (err: any) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <label className="block">
        <span className="text-sm">Create a password</span>
        <input
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
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
