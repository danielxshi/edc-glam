// app/components/account/SignupForm.tsx
"use client";
import { useState } from "react";

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setErr(null);
    const f = new FormData(e.currentTarget);
    const payload = {
      email: String(f.get("email")),
      password: String(f.get("password")),
      firstName: String(f.get("firstName") || ""),
      lastName: String(f.get("lastName") || ""),
    };
    const res = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify(payload) });
    setLoading(false);
    if (!res.ok) setErr((await res.json()).error || "Signup failed");
    else setOk(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="firstName" placeholder="First name" className="w-full border rounded-xl p-3" />
      <input name="lastName" placeholder="Last name" className="w-full border rounded-xl p-3" />
      <input name="email" type="email" placeholder="Email" className="w-full border rounded-xl p-3" required />
      <input name="password" type="password" placeholder="Password" className="w-full border rounded-xl p-3" required />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      {ok && <p className="text-green-600 text-sm">Account created. You can now sign in.</p>}
      <button disabled={loading} className="px-4 py-2 rounded-2xl border">{loading ? "…" : "Create account"}</button>
    </form>
  );
}
