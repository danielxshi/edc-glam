// components/layout/search/SortDropdown.tsx
"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import FilterList from "./index";

export default function SortDropdown({
  list,
  title = "Sort by",
}: {
  list: any; // your `sorting` array type
  title?: string;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <Menu.Button className="sort-button inline-flex items-center border text-sm">
        <span className="uppercase tracking-wide">{title}</span>
        <ChevronUpDownIcon className="h-4 w-4 opacity-60" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md border border-neutral-200 bg-white p-1 shadow-lg focus:outline-none dark:border-neutral-800 dark:bg-neutral-900">
          {/* hide FilterList's own title by passing empty string */}
          <div className="max-h-72 overflow-auto p-4">
            <FilterList list={list} title="" />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
