'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'
import { Dialog, Transition } from '@headlessui/react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useCart } from './cart-context'
import { createUrl } from '../../lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import Price from '../price'
import OpenCart from './open-cart'
import CloseCart from './close-cart'
import { DEFAULT_OPTION } from '../../lib/constants'
import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'
import LoadingDots from '../loading-dots'
import {
  createCartAndSetCookie,
  redirectToCheckout,
} from './actions'

type MerchandiseSearchParams = { [key: string]: string }

export default function CartModal() {
  const { cart, updateCartItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const quantityRef = useRef(cart?.totalQuantity)

  /* ---------- NEW: wrap server action ---------- */
  const [status, formAction] = React.useActionState(redirectToCheckout, null)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  useEffect(() => {
    if (!cart) createCartAndSetCookie()
  }, [cart])

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart.totalQuantity !== quantityRef.current &&
      cart.totalQuantity > 0
    ) {
      if (!isOpen) setIsOpen(true)
      quantityRef.current = cart.totalQuantity
    }
  }, [isOpen, cart?.totalQuantity])

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/* Sliding panel */}
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black backdrop-blur-xl md:w-[390px] ">
              {/* Header */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {/* Empty state */}
              {!cart?.lines?.length ? (                <div>
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Your Cart is Empty.
                  </p>
                </div>
              ) : (
                /* Cart contents */
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  {/* Items */}
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines
                      .sort((a, b) =>
                        a.merchandise.product.title.localeCompare(
                          b.merchandise.product.title,
                        ),
                      )
                      .map((item, i) => {
                        const params: MerchandiseSearchParams = {}
                        item.merchandise.selectedOptions.forEach(
                          ({ name, value }) => {
                            if (value !== DEFAULT_OPTION)
                              params[name.toLowerCase()] = value
                          },
                        )

                        const url = createUrl(
                          `/product/${item.merchandise.product.handle}`,
                          new URLSearchParams(params),
                        )

                        return (
                          <li
                            key={i}
                            className="flex w-full flex-col border-b border-neutral-300 "
                          >
                            {/* Delete btn */}
                            <div className="relative flex w-full justify-between px-1 py-4">
                              <DeleteItemButton
                                item={item}
                                optimisticUpdate={updateCartItem}
                              />
                            </div>

                            {/* Image + link */}
                            <div className="flex flex-row">
                              <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 ">
                                <Image
                                  fill
                                  className="object-cover"
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText ||
                                    item.merchandise.product.title
                                  }
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                />
                              </div>

                              <Link
                                href={url}
                                onClick={closeCart}
                                className="z-30 ml-2 flex flex-col"
                              >
                                <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION && (
                                  <p className="text-sm text-neutral-500 ">
                                    {item.merchandise.title}
                                  </p>
                                )}
                              </Link>
                            </div>

                            {/* Price & qty controls */}
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={
                                  item.cost.totalAmount.currencyCode
                                }
                              />
                              <div className="ml-auto flex h-9 items-center rounded-full border border-neutral-200 ">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                  optimisticUpdate={updateCartItem}
                                />
                                <p className="w-6 text-center text-sm">
                                  {item.quantity}
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                  optimisticUpdate={updateCartItem}
                                />
                              </div>
                            </div>
                          </li>
                        )
                      })}
                  </ul>

                  {/* Totals */}
                  <div className="py-4 text-sm text-neutral-500 ">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 ">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black "
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black "
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>

                  {/* Checkout */}
                  <form action={formAction}>
                    <input
                      type="hidden"
                      name="cartId"
                      value={cart?.id ?? ''}
                    />
                    <CheckoutButton />
                  </form>

                  {status && (
                    <p className="mt-2 text-center text-sm text-red-600">
                      {status}
                    </p>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

function CheckoutButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
      type="submit"
      disabled={pending}
    >
      {pending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  )
}
