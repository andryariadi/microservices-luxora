import BrowserUsegePieChart from "@/components/BrowserUsegePieChart";
import CardList from "@/components/CardList";
import TodoList from "@/components/TodoList";
// import TotalRevenueBarChart from "@/components/TotalRevenueBarChart";
import { TotalRevenueWrapper } from "@/components/TotalRevenueWrapper";
import TotalVisitorAreaChart from "@/components/TotalVisitorAreaChart";
import { getAllOrders } from "@/lib/actions/order.action";
import { getOrdersChart } from "@/lib/actions/order.chart.action";
import { getPopularProducts } from "@/lib/constants";
import { LoaderPinwheel } from "lucide-react";
import dynamic from "next/dynamic";
// import { Suspense } from "react";

const CardListDynamic = dynamic(() => import("@/components/CardList"), {
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <LoaderPinwheel size={30} className="animate-spin text-blue-500" />
    </div>
  ),
});

export default async function HomePage() {
  const ordersChart = await getOrdersChart();
  const { orders: lateTransactions } = await getAllOrders(5);
  const popularProducts = await getPopularProducts();

  console.log({ ordersChart, lateTransactions }, "<--homePage");

  return (
    <div
      className="b-rose-500 page
     grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4"
    >
      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        {/* <TotalRevenueBarChart /> */}

        {/* Streaming client component with next/dymanic */}
        <TotalRevenueWrapper data={ordersChart} />
      </div>

      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border">
        {/* Streaming server component with Suspense */}
        {/* <Suspense
          fallback={
            <div className="flex items-center justify-center h-full">
              <LoaderPinwheel size={30} className="animate-spin text-blue-500" />
            </div>
          }
        >
          <CardList title="Lates Transactions" transactions={transactions} />
        </Suspense> */}

        {/* Streaming server component with next/dynamic */}
        <CardListDynamic title="Lates Transactions" lateTransactions={lateTransactions} />
      </div>

      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border">
        <BrowserUsegePieChart />
      </div>

      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border">
        <TodoList />
      </div>

      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <TotalVisitorAreaChart />
      </div>

      <div className="bg-primary-foreground shadow-sm dark:shadow-none p-4 rounded-lg border border-sidebar-border">
        <CardList title="Popular Products" popularProducts={popularProducts} />
      </div>
    </div>
  );
}
