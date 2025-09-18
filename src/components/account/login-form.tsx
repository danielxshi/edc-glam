// app/components/account/LoginForm.tsx
"use client";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const res = await fetch("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    setLoading(false);
    if (!res.ok) setErr((await res.json()).error || "Login failed");
    else window.location.reload();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="email" type="email" placeholder="Email" className="w-full border rounded-xl p-3" required />
      <input name="password" type="password" placeholder="Password" className="w-full border rounded-xl p-3" required />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button disabled={loading} className="px-4 py-2 rounded-2xl border">{loading ? "…" : "Sign in"}</button>
    </form>
  );
}
