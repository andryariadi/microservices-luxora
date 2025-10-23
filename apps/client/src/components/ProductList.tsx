// import { products } from "@/libs/constant";
import ProductCard from "./ProductCard";
import Categories from "./Categories";
import Filter from "./Filter";
import Link from "next/link";
import { getProducts } from "@/libs/actions/product.action";
import { ProductType } from "@repo/types";

const ProductList = async ({ isShowFilter, category, sort, search, params }: { isShowFilter: boolean; category?: string; sort?: string; search?: string; params: "homepage" | "products" }) => {
  const res = (await getProducts({ category, sort, search, params })) || {};

  const products: ProductType[] = res.data || [];

  // if (!products) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Products not found!</div>;

  console.log({ products }, "<---productList");

  return (
    <section className="b-fuchsia-500 space-y-5">
      {/* Category */}
      <Categories />

      {/* Filter */}
      {isShowFilter && <Filter />}

      {/* Product List */}
      {products && products.length > 0 ? (
        <div className="b-rose-500 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Products not found!</div>
      )}

      {/* View All Products */}
      <Link href={category ? `/products/?category=${category}` : "/products"} className="flex justify-end underline text-sm text-gray-500 hover:text-amber-500 transition-all duration-300">
        View all products
      </Link>
    </section>
  );
};

export default ProductList;
