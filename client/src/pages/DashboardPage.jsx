import React from "react";
import useProfileStore from "../store/profileStore";
import { MultiLineChart, SingleLineChart } from "../components/charts/index"; // Assuming these are pre-built components
import { Separator } from "../components/ui/separator";

const mockWatchlist = [
  { name: "Apple", price: 150, change: 1.2 },
  { name: "Tesla", price: 650, change: -0.5 },
  { name: "Google", price: 2800, change: 2.0 },
];

const mockHistoricalData = [
  { month: "January", apple: 145 },
  { month: "February", apple: 155 },
  { month: "March", apple: 160 },
  { month: "April", apple: 170 },
  { month: "May", apple: 175 },
  { month: "June", apple: 180 },
];

const marketOverview = [
  { index: "Sensex", value: 60000, change: 0.8 },
  { index: "Nifty", value: 18000, change: 1.2 },
];

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
  { month: "January", adani: 186, tataMotors: 80, balaji: 133 },
  { month: "February", adani: 305, tataMotors: 200, balaji: 105 },
  { month: "March", adani: 237, tataMotors: 120, balaji: 93 },
  { month: "April", adani: 73, tataMotors: 190, balaji: 103 },
  { month: "May", adani: 209, tataMotors: 130, balaji: 173 },
  { month: "June", adani: 214, tataMotors: 140, balaji: 100 },
];

function DashboardPage() {
  const { profile } = useProfileStore();

  const totalPortfolioValue = mockWatchlist.reduce(
    (acc, stock) => acc + stock.price,
    0
  );

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden`}>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">
          Hello, {profile.fullName.split(" ")[0]}!
        </h1>
        <p className="mb-6">Welcome to your stock market dashboard.</p>

        {/* Portfolio Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Portfolio Overview</h2>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <p className="text-xl">
              Total Portfolio Value: ${totalPortfolioValue}
            </p>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketOverview.map((market) => (
              <div
                key={market.index}
                className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl">{market.index}</h3>
                <p className="text-lg">${market.value}</p>
                <p
                  className={
                    market.change > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {market.change > 0 ? "+" : ""}
                  {market.change}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Watchlist */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Stock Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mockWatchlist.map((stock) => (
              <div
                key={stock.name}
                className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl">{stock.name}</h3>
                <p className="text-lg">${stock.price}</p>
                <p
                  className={
                    stock.change > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {stock.change > 0 ? "+" : ""}
                  {stock.change}%
                </p>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8" />
        {/* MultiLineChart Component */}
        <div className="mb-6">
          <MultiLineChart
            chartConfig={chartConfig}
            chartData={chartData}
            defaultCard
            title="Adani vs Tata Motors vs Balaji Wafers"
            dataKeys={["adani", "tataMotors", "balaji"]}
            className="bg-zinc-300 text-zinc-900 dark:bg-slate-950 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          />
        </div>
        <Separator className="my-8" />

        {/* Historical Performance (Single Line Chart) */}
        <div className="mb-6">
          <SingleLineChart
            chartConfig={{
              apple: { label: "Apple", color: "hsl(var(--chart-1))" },
            }}
            defaultCard
            chartData={mockHistoricalData}
            title="Apple Stock Performance"
            dataKey="apple"
            className="bg-zinc-300 text-zinc-900 dark:bg-slate-950 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          />
        </div>

        {/* Predictions Accuracy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Predictions Accuracy</h2>
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <p className="text-xl">Prediction Accuracy: 85%</p>
            <div className="w-full bg-zinc-300 dark:bg-zinc-600 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: "85%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
