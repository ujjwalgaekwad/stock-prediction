import React from "react";
import { MultiLineChart, SingleLineChart } from "../components/charts/index";
import useProfileStore from "../store/profileStore"

const chartConfig = {
  adani: {
    label: "Adani",
    color: "hsl(var(--chart-1))",
  },
  tataMotors: {
    label: "Tata Motors",
    color: "hsl(var(--chart-2))",
  },
  balaji: {
    label: "Balaji wafers",
    color: "hsl(var(--chart-3))",
  },
};

const chartData = [
  { month: "January", adani: 186, tataMotors: 80, balaji: 133, },
  { month: "February", adani: 305, tataMotors: 200, balaji: 105 },
  { month: "March", adani: 237, tataMotors: 120, balaji: 93 },
  { month: "April", adani: 73, tataMotors: 190, balaji: 103 },
  { month: "May", adani: 209, tataMotors: 130, balaji: 173 },
  { month: "June", adani: 214, tataMotors: 140, balaji: 100 },
];

function DashboardPage() {

  const {profile} = useProfileStore()

  return (
    <div className="min-h-screen w-screen overflow-x-hidden">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">Hey {profile.fullName.split(" ")[0]}, Welcome to your dashboard</h1>
        <p className="mb-6 mt-1 text-gray-600 dark:text-gray-400">This is your dashboard</p>
        <div className="overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Single Line Chart */}
          <SingleLineChart
            chartConfig={chartConfig}
            chartData={chartData}
            defaultCard
            dataKey="adani"
            title="Reliance Industries"
            className="bg-zinc-300 text-zinc-900 dark:bg-slate-950 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          />
          {/* Double Line Chart */}
          <MultiLineChart
            chartConfig={chartConfig}
            chartData={chartData}
            title="Adani vs Tata Motors vs Balaji wafers"
            defaultCard
            dataKeys={["adani", "tataMotors", "balaji"]}
            className="bg-zinc-300 text-zinc-900 dark:bg-slate-950 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
