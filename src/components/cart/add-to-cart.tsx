'use client'

import React from 'react'
import { Product, ProductVariant } from '../../lib/shopify/types'
import { useProduct } from '../product/product-context'
import { useCart } from './cart-context'
import { addItem } from './actions'
import clsx from 'clsx'
import { PlusIcon } from '@heroicons/react/24/outline'

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean
  selectedVariantId: string | undefined
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out of Stock
      </button>
    )
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add to Cart
      </button>
    )
  }

  return (
    <button
      aria-label="Add to cart"
      type="submit"
      className={clsx(buttonClasses, 'hover:opacity-90')}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Add To Cart
    </button>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product
  const { addCartItem } = useCart()
  const { state } = useProduct()

  const [message, formAction] = React.useActionState(addItem, null)

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  )

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined
  const selectedVariantId = variant?.id || defaultVariantId
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!

  async function handleSubmit() {
    addCartItem(finalVariant, product)
    await formAction(selectedVariantId)
  }

  return (
    <form action={handleSubmit}>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={selectedVariantId}
      />
      <p className="sr-only" role="status" aria-label="polite">
        {message}
      </p>
    </form>
  )
}
