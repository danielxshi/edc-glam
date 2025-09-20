"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string; // sizing/spacing only — no color here
  quantity?: number;
}) {
  return (
    <span className="relative inline-flex items-center">
      {/* Inherits color from parent via currentColor */}
      <ShoppingCartIcon
        className={clsx("h-5 w-5 transition-transform duration-200 group-hover:scale-110", className)}
        aria-hidden="true"
      />
      {quantity ? (
        <span className="absolute -right-2 -top-2 min-w-4 rounded-full bg-blue-600 px-1 text-[10px] leading-4 text-white text-center">
          {quantity}
        </span>
      ) : null}
    </span>
  );
}
