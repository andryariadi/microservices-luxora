"use client";

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { barChartData } from "@/lib/constants";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
  successful: {
    label: "Successful",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const TotalRevenueBarChart = () => {
  return (
    <section className="space-y-5">
      <h1 className="text-lg font-medium">Total Revenue</h1>

      {/* Chart */}
      <ChartContainer config={chartConfig} className="min-h-[420px] w-full">
        <BarChart accessibilityLayer data={barChartData}>
          <CartesianGrid vertical={false} />

          <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />

          <YAxis tickLine={false} tickMargin={10} axisLine={false} />

          <ChartTooltip content={<ChartTooltipContent />} />

          <ChartLegend content={<ChartLegendContent />} />

          <Bar dataKey="total" fill="var(--color-total)" radius={4} />

          <Bar dataKey="successful" fill="var(--color-successful)" radius={4} />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default TotalRevenueBarChart;
