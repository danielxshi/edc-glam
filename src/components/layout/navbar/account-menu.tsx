// app/components/layout/navbar/AccountMenu.tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Me = { customer: null | { firstName: string | null; lastName: string | null; email: string } };

export default function AccountMenu() {
  const [me, setMe] = useState<Me["customer"]>(null);
  const pathname = usePathname();

  const loadMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        cache: "no-store",
        credentials: "include",
      });
      const d: Me = await res.json();
      setMe(d.customer);
    } catch {
      setMe(null);
    }
  }, []);

  // initial load
  useEffect(() => { loadMe(); }, [loadMe]);

  // re-fetch when the route changes (layout doesn't unmount)
  useEffect(() => { loadMe(); }, [pathname, loadMe]);

  // re-fetch when tab regains focus or when we broadcast an auth change
  useEffect(() => {
    const onFocus = () => loadMe();
    const onAuthChanged = () => loadMe();
    window.addEventListener("focus", onFocus);
    window.addEventListener("auth:changed", onAuthChanged);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("auth:changed", onAuthChanged);
    };
  }, [loadMe]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    // tell listeners (including this component) to re-fetch
    window.dispatchEvent(new Event("auth:changed"));
  }

  if (!me) {
    return (
      <div className="ml-4 flex items-center space-x-3 text-xs">
        <a href="/account/login" className="hover:underline">LOGIN</a>
      </div>
    );
  }

  return (
    <div className="ml-4 flex items-center space-x-3 text-xs">
      <a href="/account/order-history" className="hover:underline">ACCOUNT</a>
      {/* <button onClick={logout} className="hover:underline">Sign out</button> */}
    </div>
  );
}
