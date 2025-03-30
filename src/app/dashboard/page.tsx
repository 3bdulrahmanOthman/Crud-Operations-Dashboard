import { OverviewCard } from "@/components/dashboard/overview-card";
import PageHeader from "@/components/page-header";
import { Shell } from "@/components/shell";
import React from "react";

export default function Dashboard() {
  const chartData = [
    {
      month: "January",
      total_sales: 34305,
      total_orders: 540,
      total_products: 1200,
      active_orders: 230,
      order_analytics: 80,
      revenue_analytics: 55000,
    },
    {
      month: "February",
      total_sales: 7354,
      total_orders: 320,
      total_products: 1150,
      active_orders: 190,
      order_analytics: 60,
      revenue_analytics: 23000,
    },
    {
      month: "March",
      total_sales: 123773,
      total_orders: 1020,
      total_products: 1300,
      active_orders: 310,
      order_analytics: 110,
      revenue_analytics: 92000,
    },
    {
      month: "April",
      total_sales: 53764,
      total_orders: 850,
      total_products: 1250,
      active_orders: 270,
      order_analytics: 95,
      revenue_analytics: 75000,
    },
    {
      month: "May",
      total_sales: 203209,
      total_orders: 1650,
      total_products: 1400,
      active_orders: 450,
      order_analytics: 150,
      revenue_analytics: 160000,
    },
    {
      month: "June",
      total_sales: 294114,
      total_orders: 1950,
      total_products: 1500,
      active_orders: 520,
      order_analytics: 180,
      revenue_analytics: 210000,
    },
  ];

  const chartConfig = {
    total_sales: {
      label: "Total Sales",
      color: "var(--chart-1)",
    },
    total_orders: {
      label: "Total Orders",
      color: "var(--chart-2)",
    },
    total_products: {
      label: "Total Products",
      color: "var(--chart-3)",
    },
    active_orders: {
      label: "Active Orders",
      color: "var(--chart-4)",
    },
    order_analytics: {
      label: "Order Analytics",
      color: "var(--chart-5)",
    },
    revenue_analytics: {
      label: "Revenue Analytics",
      color: "var(--chart-1)",
    },
  };
  return (
    <Shell variant={"sidebar"}>
      <PageHeader title="Dashboard" description="Welcome to your dashboard" />
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
        <OverviewCard
          icon="cash"
          label="Total Sales"
          description="$"
          adjustment={{ value: 20, trend: "up" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
        <OverviewCard
          icon="order"
          label="Total Orders"
          description=""
          adjustment={{ value: 15, trend: "up" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
        <OverviewCard
          icon="boxes"
          label="Total Products"
          description=""
          adjustment={{ value: 10, trend: "up" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
        <OverviewCard
          icon="truck"
          label="Active Orders"
          description=""
          adjustment={{ value: 25, trend: "down" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
        <OverviewCard
          icon="cash"
          label="Order Analytics"
          description=""
          adjustment={{ value: 18, trend: "up" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
        <OverviewCard
          icon="cash"
          label="Revenue Analytics"
          description="$"
          adjustment={{ value: 30, trend: "up" }}
          chartData={chartData}
          chartConfig={chartConfig}
        />
      </div>
    </Shell>
  );
}
