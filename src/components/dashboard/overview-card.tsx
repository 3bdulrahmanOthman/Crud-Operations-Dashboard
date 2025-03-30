"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Icons } from "../icons";
import { RenderIcon } from "@/lib/utils";

interface ChartDataPoint {
  month: string;
  [key: string]: number | string;
}

interface OverviewChartProps {
  icon: keyof typeof Icons;
  label: string;
  description: string;
  adjustment: {
    value: number;
    trend: "up" | "down";
  };
  chartData: ChartDataPoint[];
  chartConfig: ChartConfig;
}

export function OverviewCard({
  icon,
  label,
  description,
  adjustment,
  chartData,
  chartConfig,
}: OverviewChartProps) {
  const dataKey = label.toLowerCase().replace(/\s+/g, "_");
  const total = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + Number(curr[dataKey] || 0), 0),
    [chartData, dataKey]
  );

  return (
    <Card className="overflow-hidden p-0 gap-0">
      <CardHeader className="p-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <div
              className={`size-8 rounded-full bg-secondary flex items-center justify-center`}
            >
              <RenderIcon
                icon={icon}
                className="size-5"
                style={{
                  color: chartConfig[dataKey].color,
                }}
              />
            </div>
            {label}
          </CardTitle>
          <Badge
            variant="secondary"
            className={`p-1 text-xs ${
              adjustment.trend === "up" ? "text-green-500" : "text-red-500"
            }`}
          >
            {adjustment.trend === "up" ? (
              <Icons.trendingUp className="size-4 mr-1" />
            ) : (
              <Icons.trendingDown className="size-4 mr-1" />
            )}
            {adjustment.value}%
          </Badge>
        </div>
        <CardDescription
          className="text-sm font-semibold size-3 rounded-sm flex items-center"
          style={{ backgroundColor: chartConfig[dataKey].color }}
        >
          <span className="ml-5">
            {description}
            {total}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <defs>
              <linearGradient
                id={`fill-${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={chartConfig[dataKey].color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig[dataKey].color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={dataKey}
              type="natural"
              fill={`url(#fill-${dataKey})`}
              fillOpacity={0.4}
              stroke={chartConfig[dataKey].color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
