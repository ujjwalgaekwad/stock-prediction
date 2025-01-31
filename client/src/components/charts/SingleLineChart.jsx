"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

function SingleLineChartComponent({
  chartConfig,
  chartData,
  dataKey = "desktop", // Default to "desktop", but can be changed dynamically
  defaultCard = false,
  title = "Define a title",
  description = "",
  className = "",
}) {
  return (
    <>
      {defaultCard ? (
        <Card className={className}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                aria-label="Line chart showing traffic data over time"
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
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey={dataKey} // Dynamically using the dataKey (desktop or mobile)
                  type="monotone"
                  stroke={chartConfig[dataKey]?.color || "black"} // Dynamically using the stroke color
                  strokeWidth={2}
                  dot={false}
                  aria-label={`${dataKey} traffic data`}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      ) : (
        <ChartContainer config={chartConfig}>
          <LineChart
            aria-label="Line chart showing traffic data over time"
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
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey={dataKey} // Dynamically using the dataKey (desktop or mobile)
              type="monotone"
              stroke={chartConfig[dataKey]?.color || "black"} // Dynamically using the stroke color
              strokeWidth={2}
              dot={false}
              aria-label={`${dataKey} traffic data`}
            />
          </LineChart>
        </ChartContainer>
      )}
    </>
  );
}

export default SingleLineChartComponent;
