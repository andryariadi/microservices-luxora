"use client";

import { categories } from "@/libs/constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    params.set("category", value || "all");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-gray-200 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 p-2 rounded-lg text-sm">
      {categories.map((category) => (
        <div className={`flex items-center justify-center gap-2 cursor-pointer px-2 py-1 rounded-md ${category.slug === selectedCategory ? "bg-white" : "text-gray-500"}`} key={category.name} onClick={() => handleChange(category.slug)}>
          <category.icon size={16} />
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
