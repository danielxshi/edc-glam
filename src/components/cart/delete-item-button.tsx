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
      <button
        type="submit"
        aria-label="Remove cart item"
        className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500"
      >
        <XMarkIcon className="mx-[1px] h-4 w-4 text-white dark:text-black" />
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
