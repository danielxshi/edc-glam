"use client";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Me = {
  customer: null | {
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
};

export default function AccountMenu({
  linkClassName,
}: {
  linkClassName?: string;
}) {
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

  useEffect(() => {
    loadMe();
  }, [loadMe]); // initial
  useEffect(() => {
    loadMe();
  }, [pathname, loadMe]); // on route change
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
    window.dispatchEvent(new Event("auth:changed"));
  }

  if (!me) {
    return (
      <div className="flex items-center nav-text">
        <a
          href="/account/login"
          className={`nav-text ${
            linkClassName ||
            "text-xs font-normal nav-text transition-colors duration-300 hover:opacity-70"
          }`}
        >
          LOGIN
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center nav-text">
      <a
        href="/account/order-history"
        className={
          linkClassName ||
          "text-xs font-normal nav-text transition-colors duration-300 hover:opacity-70"
        }
      >
        ACCOUNT
      </a>
      {/* <button onClick={logout} className={linkClassName || "text-sm tracking-wide transition-colors duration-300 hover:opacity-70"}>
        Sign out
      </button> */}
    </div>
  );
}
