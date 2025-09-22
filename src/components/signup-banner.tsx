"use client";

import React, { useState } from "react";

type Status = "idle" | "loading" | "ok" | "err";

export default function SignupBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [botField, setBotField] = useState(""); // honeypot

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    // simple bot check: ignore submissions that fill the hidden field
    if (botField) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Subscription failed");
      }

      // If your API uses CONFIRMED_OPT_IN, say “check your email”
      setStatus("ok");
      setMessage("Thanks! Please check your email to confirm your subscription.");
      setEmail("");
    } catch (err: any) {
      setStatus("err");
      setMessage(err?.message || "Could not subscribe. Please try again.");
    }
  }

  return (
    <section className="w-full py-6">
      <div className="w-full lg:w-1/2 max-w-md">
        <h2 className="text-xl normal-case mb-4 text-[#33383CFF]">
          Keep updated with the new EDC&GLAM
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-row gap-2" noValidate>
          {/* honeypot (hidden to humans) */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
          />

          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="* E-mail"
            className="px-4 border rounded-sm border-gray-400 bg-transparent outline-none py-2 font-light text-sm w-64"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-[120px] uppercase text-xs rounded-sm bg-black text-white py-2 hover:bg-gray-800 transition disabled:opacity-50"
          >
            {status === "loading" ? "Submitting…" : "Confirm"}
          </button>
        </form>

        {/* status message */}
        {message && (
          <p
            className={`mt-2 text-xs ${
              status === "ok" ? "text-green-600" : "text-red-600"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
}
