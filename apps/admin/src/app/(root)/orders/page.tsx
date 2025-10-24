import { getOrders } from "@/lib/actions/order.action";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { OrderType } from "@repo/types";

const OrdersPage = async () => {
  const res = await getOrders();
  const data: OrderType[] = res?.orders || [];

  console.log({ data }, "<---orderPage");

  return (
    <div className="">
      <div className="mb-8 px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">All Payments</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default OrdersPage;
