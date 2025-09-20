"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();
    setBusy(false);

    if (!res.ok) {
      setErr(json?.error || "Login failed");
      return;
    }

    r.replace("/");
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-[9rem] min-h-[84vh]">
      <h2 className="mb-4 text-xs font-semibold tracking-wide text-black/80">
        LOGIN
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm">Email address</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            className="w-full border border-black/50 bg-neutral-100 px-3 py-2 text-[15px] outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />
        </div>

        {/* Password with SHOW button */}
        <div className="space-y-2">
          <label className="block text-sm">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              className="w-full border border-black/50 bg-white px-3 py-2 pr-20 text-[15px] outline-none focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute inset-y-0 right-0 w-20 border-l border-black/50 text-xs uppercase tracking-wide"
            >
              {showPw ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* Error */}
        {err && (
          <p className="text-sm text-red-600" role="alert">
            {err}
          </p>
        )}

        {/* Continue button */}
        <button
          type="submit"
          disabled={busy}
          className="block w-full bg-black py-3 text-center text-xs font-semibold tracking-wide text-white disabled:opacity-60"
        >
          {busy ? "PLEASE WAIT…" : "CONTINUE"}
        </button>

        {/* Helpers */}
        <div className="mt-2 flex items-center gap-6 text-sm">
          <Link
            href="/account/password"
            className="underline underline-offset-2 hover:no-underline"
          >
            Forgot your password?
          </Link>
          <Link
            href="/account/login"
            onClick={(e) => {
              // optional: clear the email field without navigating
              e.preventDefault();
              setEmail("");
            }}
            className="underline underline-offset-2 hover:no-underline"
          >
            Not your email?
          </Link>
        </div>
      </form>
    </main>
  );
}
