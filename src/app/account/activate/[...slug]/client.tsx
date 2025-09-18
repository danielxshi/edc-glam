"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ActivateClient({ id, token }: { id?: string; token?: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("Activating your account…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!id || !token) {
        setMessage("Invalid activation link.");
        return;
      }
      try {
        const res = await fetch("/api/account/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, token }),
        });
        const json = await res.json();
        if (!res.ok || !json.ok) {
          throw new Error(json?.error || "Activation failed");
        }
        if (!cancelled) {
          // success: either they are signed in via cookie or can sign in now
          router.replace("/account"); // or /account/login if you prefer
        }
      } catch (e: any) {
        if (!cancelled) {
          setMessage(`Something went wrong while activating your account.\n${e.message}`);
        }
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [id, token, router]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Account Activation</h1>
      <p className="mt-2 whitespace-pre-line">{message}</p>
      <button
        className="mt-3 border px-3 py-2 rounded"
        onClick={() => location.reload()}
      >
        Try again
      </button>
    </div>
  );
}
