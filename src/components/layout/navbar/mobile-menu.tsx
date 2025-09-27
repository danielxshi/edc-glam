"use client";
import { Menu } from "../../../lib/shopify/types";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Fragment, useState } from "react";
import Search from "./search";
import TwoBarHamburger from "@/components/navigation/two-bar-hamburger";

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <div className="mobile-menu flex gap-x-3 align-middle lg:hidden">
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-6 items-center justify-center rounded-md lg:hidden"
      >
        {/* Icon mirrors menu state */}
        <TwoBarHamburger
          open={isOpen}
          size={28}
          thickness={1.25}
          gap={8}
          // color inherits from currentColor; set via CSS if needed
        />
      </button>

      <div className="lg:hidden m-auto">
        <Search />
      </div>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-[999]">
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

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300 delay-200" // <- add delay here
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="sm:w-1/2 fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6">
              <div className="py-6 px-4 relative">
                <div className="w-full h-[1rem] py-2">
                  <button
                    className="mb-4 flex h-7 w-fit m-auto items-center justify-center text-black transition-colors left-4 top-4 absolute"
                    onClick={closeMobileMenu}
                    aria-label="Close mobile menu"
                  >
                    <XMarkIcon className="h-5" />
                  </button>
                </div>

                {menu.length > 0 ? (
                  <ul className="flex w-full flex-col mt-8">
                    {menu.map((item: Menu) => (
                      <li
                        className="py-2 uppercase text-[.8rem] tracking-[1px] text-black transition-colors hover:text-neutral-500"
                        key={item.title}
                      >
                        <Link
                          href={item.path}
                          prefetch
                          onClick={closeMobileMenu}
                          className="font-extralight"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
