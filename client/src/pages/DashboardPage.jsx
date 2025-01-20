import React from "react";
import { SIngleLineChartComponent } from "../components/charts/index";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

function DashboardPage() {
  return (
    <div className="">
      <div className="w-10/12 mx-auto">
        <SIngleLineChartComponent
          chartConfig={chartConfig}
          chartData={chartData}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
