import ProductList from "@/components/ProductList";
import React from "react";

const ProductsPage = () => {
  return (
    <section className="b-sky-500 w-full mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-6xl space-y-10">
      <ProductList isShowFilter />
    </section>
  );
};

export default ProductsPage;
