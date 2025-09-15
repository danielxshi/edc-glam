"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp?.get("next") || "/";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const res = await fetch("/api/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd.trim() }),
      });

      if (res.ok) {
        router.push(next);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data?.reason || "Invalid password");
      }
    } catch {
      setError("Network error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="text-xl font-semibold mb-4">Enter Password</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="Password"
        />
        <button disabled={busy} className="w-full border rounded p-2">
          {busy ? "Unlocking..." : "Unlock"}
        </button>
      </form>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
