import { getProducts } from "@/lib/actions/product.action";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ProductType } from "@repo/types";

const ProductsPage = async () => {
  const res = await getProducts({});

  const products: ProductType[] = res.data || [];

  // if (!products) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Products not found!</div>;

  console.log({ products }, "<---productList");

  return (
    <div className="b-sky-500 page pb-20">
      {/* Header */}
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Users</h1>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={products} />
    </div>
  );
};

export default ProductsPage;
