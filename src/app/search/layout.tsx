// app/search/layout.tsx (or wherever your SearchLayout is)
import Footer from "@/components/layout/footer/footer";
import Collections from "../../components/layout/search/collections";
import FilterList from "../../components/layout/search/filter";
import { sorting } from "../../lib/constants";
import FilterItemDropDown from "@/components/layout/search/filter/filter-dropdown";
import SortDropdown from "@/components/layout/search/filter/sort-dropdown";
import ShortBanner from "@/components/banner/short-banner";
import CollectionBanner from "@/components/banner/collection-banner"; // ← NEW

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Replace this: <PathAwareBanner /> */}
      <CollectionBanner defaultHandle="test" />

      <div className="mx-auto mt-8 flex flex-col px-2 pb-4 text-black md:flex-row">
        <div className="order-last min-h-screen w-full md:order-none">
          <div className="flex w-full">
            <div className="order-first flex-none md:max-w-[125px] max-h-fit">
              <FilterItemDropDown>
                <Collections />
              </FilterItemDropDown>
            </div>
            <div className="order-none flex-none md:order-last md:w-[125px] md:ml-auto">
              <SortDropdown list={sorting} />
            </div>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
