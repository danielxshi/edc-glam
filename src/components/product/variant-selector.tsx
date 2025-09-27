"use client";

import { useEffect } from "react"; // ⬅️ add this
import { ProductOption, ProductVariant } from "../../lib/shopify/types";
import { useProduct, useUpdateURL } from "./product-context";
import clsx from "clsx";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export default function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  // 🔽 Helper: are all options chosen?
  const isFullySelected = options.every(
    (o) => !!state[o.name.toLowerCase()]
  );

  // 🔽 On mount / when variants/options change, select a sensible default
  useEffect(() => {
    if (!variants?.length || !options?.length) return;

    // Try to find the variant that matches current state
    const matchesState = (v: ProductVariant) =>
      v.selectedOptions.every(
        (o) => state[o.name.toLowerCase()] === o.value
      );

    let chosen =
      variants.find(matchesState) ||
      variants.find((v) => v.availableForSale) ||
      variants[0];

    // If already fully selected and matches a valid variant, do nothing
    if (isFullySelected && variants.find(matchesState)) return;

    // Apply the chosen variant to state and URL (one-by-one to respect your API)
    let currentState = { ...state };
    for (const o of chosen.selectedOptions) {
      const key = o.name.toLowerCase();
      if (currentState[key] !== o.value) {
        currentState = updateOption(key, o.value);
      }
    }
    updateURL(currentState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants, options]); // avoid including `state` to prevent loops

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  return options.map((option) => (
    <form key={option.id}>
      <dl>
        <dt className="text-xs uppercase tracking-wide product-details-subcontent-header">
          {option.name}
        </dt>
        <dd className="flex flex-wrap gap-3">
          {option.values.map((value) => {
            const optionNameLowerCase = option.name.toLowerCase();
            const optionParams = { ...state, [optionNameLowerCase]: value };

            const filtered = Object.entries(optionParams).filter(
              ([key, value]) =>
                options.find(
                  (o) =>
                    o.name.toLowerCase() === key &&
                    o.values.includes(value as string)
                )
            );

            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            const isActive = state[optionNameLowerCase] === value;

            return (
              <button
                formAction={() => {
                  const newState = updateOption(optionNameLowerCase, value);
                  updateURL(newState);
                }}
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center border uppercase  px-1 py-1 text-xxs text-black mt-2",
                  {
                    "cursor-default bg-black text-white": isActive,
                    "ring-1 ring-[#bbb] transition duration-300 ease-in-out hover:ring-black":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-600 text-neutral-500 ring-1 ring-[#000] before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45  before:transition-transform":
                      !isAvailableForSale,
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </form>
  ));
}
