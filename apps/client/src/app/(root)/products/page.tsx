import ProductList from "@/components/ProductList";
import React from "react";

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ category: string; sort: string; search: string }> }) => {
  const { category, sort, search } = await searchParams;

  return (
    <section className="b-sky-500 w-full mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl space-y-10">
      <ProductList isShowFilter category={category} sort={sort} search={search} params="products" />
    </section>
  );
};

export default ProductsPage;
