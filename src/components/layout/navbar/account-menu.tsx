// app/components/layout/navbar/AccountMenu.tsx
"use client";
import { useEffect, useState } from "react";

type Me = { customer: null | { firstName: string | null; lastName: string | null; email: string } };

export default function AccountMenu() {
  const [me, setMe] = useState<Me["customer"]>(null);
  useEffect(() => { fetch("/api/auth/me").then(r => r.json()).then((d: Me) => setMe(d.customer)); }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.reload();
  }

  if (!me) {
    return (
      <div className="ml-4 flex items-center space-x-3 text-sm">
        <a href="/account/login" className="hover:underline">Sign in</a>
        <a href="/account/signup" className="hover:underline">Create account</a>
      </div>
    );
  }

  const name = [me.firstName, me.lastName].filter(Boolean).join(" ") || me.email;
  return (
    <div className="ml-4 flex items-center space-x-3 text-sm">
      <span>Hello, {name}</span>
      <a href="/account" className="hover:underline">Account</a>
      <button onClick={logout} className="hover:underline">Sign out</button>
    </div>
  );
}
