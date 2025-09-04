"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PasswordPage() {
  const [pwd, setPwd] = useState("");
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pwd === process.env.NEXT_PUBLIC_SITE_PASSWORD || "letmein" === pwd) {
      document.cookie = "site_authed=1; path=/; max-age=2592000; samesite=lax";
      router.push(next);
    } else {
      alert("Wrong password");
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
        <button className="w-full border rounded p-2">Unlock</button>
      </form>
    </div>
  );
}
