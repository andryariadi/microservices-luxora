import { getOrders } from "@/libs/actions/order.action";
import { OrderType } from "@repo/types";

const OrdersPage = async () => {
  const res = await getOrders();
  const orders: OrderType[] = res?.orders || [];

  console.log({ orders }, "<---orderPage");

  return (
    <section className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-6">
      <h1 className="text-2xl md:text-3xl text-gray-900/90 my-4 font-medium">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 md:p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Order #{order._id.slice(-8).toUpperCase()}</h3>
                  <p className="text-sm text-gray-500">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="text-center sm:text-right">
                    <span className="block text-sm font-medium text-gray-500">Total</span>
                    <p className="text-lg font-semibold text-gray-900">${(order.amount / 100).toFixed(2)}</p>
                  </div>
                  <div className="text-center sm:text-right">
                    <span className="block text-sm font-medium text-gray-500">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === "success" && "bg-green-100 text-green-800"}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 text-sm">
                {/* Order ID */}
                <div className="hidden md:block">
                  <span className="font-medium text-gray-500 block mb-1">Order ID</span>
                  <p className="text-gray-900 font-mono text-xs break-all">{order._id}</p>
                </div>

                {/* Date */}
                <div className="hidden lg:block">
                  <span className="font-medium text-gray-500 block mb-1">Order Date</span>
                  <p className="text-gray-900">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US") : "-"}</p>
                </div>

                {/* Products */}
                <div className="md:col-span-2 lg:col-span-2">
                  <span className="font-medium text-gray-500 block mb-1">Products</span>
                  <div className="flex flex-wrap gap-1">
                    {order.products?.map((product, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {product.name}
                        {product.quantity > 1 && ` (×${product.quantity})`}
                      </span>
                    )) || "-"}
                  </div>
                </div>
              </div>

              {/* Mobile Only - Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-200 md:hidden">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-500 block mb-1">Order ID</span>
                    <p className="text-gray-900 font-mono text-xs break-all">
                      {order._id.slice(0, 8)}...{order._id.slice(-8)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 block mb-1">Full Date</span>
                    <p className="text-gray-900">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US") : "-"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">View Details</button>

                <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default OrdersPage;
