"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const r = useRouter();
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "" });
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setErr(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setBusy(false);
    if (!res.ok && res.status !== 202) return setErr(json?.error || "Signup failed");

    // If 202, account may need activation; otherwise logged in
    r.replace("/account");
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <input className="border rounded p-2" placeholder="First name"
            value={form.firstName} onChange={e=>setForm({...form, firstName:e.target.value})}/>
          <input className="border rounded p-2" placeholder="Last name"
            value={form.lastName} onChange={e=>setForm({...form, lastName:e.target.value})}/>
        </div>
        <input className="w-full border rounded p-2" placeholder="Email"
          value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="w-full border rounded p-2" placeholder="Password" type="password"
          value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        {err && <p className="text-red-600 text-sm">{err}</p>}
        <button className="px-4 py-2 bg-black text-white rounded disabled:opacity-60" disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>
    </main>
  );
}
