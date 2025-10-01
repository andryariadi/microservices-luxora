import { getProducts } from "@/lib/constants";
import { columns } from "./columns";
import { DataTable } from "./data-table";

const ProductsPage = async () => {
  const products = await getProducts();

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
