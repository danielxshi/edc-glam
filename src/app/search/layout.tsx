// app/search/layout.tsx
import Footer from "@/components/layout/footer/footer";
import Collections from "../../components/layout/search/collections";
import FilterList from "../../components/layout/search/filter";
import { sorting } from "../../lib/constants";
import FilterItemDropDown from "@/components/layout/search/filter/filter-dropdown";
import SortDropdown from "@/components/layout/search/filter/sort-dropdown";
import ShortBanner from "@/components/banner/short-banner";
import CollectionBanner from "@/components/banner/collection-banner"; // ← NEW

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CollectionBanner />

      <div className="mx-auto mt-8 flex flex-col pb-4 text-black md:flex-row">
        <div className="order-last min-h-screen w-full md:order-none">

          {/* --- Refine / Sort top bar --- */}
          <div className="w-full border-y border-black/15 bg-white sticky top-0 z-20">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                  <FilterItemDropDown>
                    <Collections />
                  </FilterItemDropDown>
                </div>

                <div className="col-span-1">
                  <SortDropdown list={sorting} />
                </div>
              </div>
            </div>
          </div>
          {/* --- /Refine / Sort --- */}

          {children}
        </div>
      </div>
    </>
  );
}
