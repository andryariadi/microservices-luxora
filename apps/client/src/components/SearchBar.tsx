"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentSearch = searchParams.get("search")?.toString();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value !== "") {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="bg-white/50 hidden sm:flex items-center gap-2 rounded-md border border-gray-200 px-2 py-1 shadow-sm">
      <Search className="w-4 h-4 text-gray-500" />

      <input id="search" placeholder="Search..." defaultValue={currentSearch} onChange={(e) => handleSearch(e.target.value)} className="text-sm outline-0" />
    </div>
  );
};

export default SearchBar;
