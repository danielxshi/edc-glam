"use client";

import React from "react";
import { CartItem } from "../../lib/shopify/types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { removeItem } from "./actions";

export function DeleteItemButton({
  item,
  optimisticUpdate,
}: {
  item: CartItem;
  optimisticUpdate: (id: string, type: "delete") => void;
}) {
  const [message, formAction] = React.useActionState(
    async (_prevState: any, formData: FormData) => {
      const merchandiseId = formData.get("merchandiseId") as string;
      if (!merchandiseId) return "Missing merchandise ID";
      optimisticUpdate(merchandiseId, "delete");
      return await removeItem(_prevState, merchandiseId);
    },
    null
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="merchandiseId" value={item.merchandise.id} />
      <button type="submit" aria-label="Remove cart item" className="text-xxs uppercase text-neutral-500 hover:text-neutral-900 transition">
        remove
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
