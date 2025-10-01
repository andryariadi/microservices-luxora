"use client";

import { filters } from "@/libs/constant";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentSort = searchParams.get("sort") || "";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 overflow-hidden">
      <div className="bg-white relative overflow-hidden rounded-md">
        <select name="sort" id="sort" value={currentSort} className="w-[9rem] text-xs font-medium border border-gray-300 rounded-md px-2 py-2 appearance-none" onChange={(e) => handleFilter(e.target.value)}>
          <option value="" className="text-base">
            Sort by
          </option>
          {filters.map((filter) => (
            <option key={filter.value} value={filter.value} className="text-base">
              {filter.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute top-[8.5px] right-[5px] flex items-center">
          <ChevronDown size={16} />
        </span>
      </div>
    </div>
  );
};

export default Filter;
