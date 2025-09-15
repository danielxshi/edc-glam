"use client";

import { Menu } from "@headlessui/react";
import { useEffect, useState } from "react";

type Currency = "CAD" | "USD";
const CURRENCIES: Currency[] = ["CAD", "USD"];
const toCountry: Record<Currency, "CA" | "US"> = { CAD: "CA", USD: "US" };

export default function CurrencySwitcher() {
  const [currency, setCurrency] = useState<Currency>("CAD");

  useEffect(() => {
    // read existing cookie if present
    const cookies = Object.fromEntries(
      document.cookie.split("; ").map((c) => {
        const i = c.indexOf("=");
        return [c.slice(0, i), decodeURIComponent(c.slice(i + 1))];
      })
    );
    if (cookies.currency === "USD" || cookies.currency === "CAD") {
      setCurrency(cookies.currency);
    }
  }, []);

  const choose = async (next: Currency) => {
    try {
      await fetch("/api/setCurrency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currency: next,
          country: toCountry[next],
        }),
      });
      setCurrency(next);
      window.location.reload(); // keeps it simple; no router used
    } catch (e) {
      console.error("Failed to set currency", e);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        aria-label="Select currency"
        className="px-2 py-1 text-white/90"
      >
        {currency} $
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-28 rounded-md bg-black/80 backdrop-blur px-1 py-1 text-white shadow-lg ring-1 ring-white/10 focus:outline-none">
        {CURRENCIES.map((c) => (
          <Menu.Item key={c}>
            {({ active }) => (
              <button
                onClick={() => choose(c)}
                className={`w-full px-3 py-2 text-left text-sm ${
                  active ? "bg-white/10" : ""
                }`}
              >
                {c} $
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
