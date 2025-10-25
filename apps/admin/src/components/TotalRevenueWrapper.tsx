"use client";

import dynamic from "next/dynamic";
// import { Skeleton } from "./ui/skeleton";
import { LoaderPinwheel } from "lucide-react";
import { OrderChartType } from "@repo/types";

const TotalRevenueChart = dynamic(() => import("@/components/TotalRevenueBarChart"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <LoaderPinwheel size={50} className="animate-spin text-blue-500" />
    </div>
  ),
});

export function TotalRevenueWrapper({ data }: { data: OrderChartType[] }) {
  return <TotalRevenueChart data={data} />;
}
