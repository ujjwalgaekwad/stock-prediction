import React, { useEffect, useState } from "react";
import useProfileStore from "../store/profileStore";
import { MultiLineChart, SingleLineChart } from "../components/charts/index"; // Assuming these are pre-built components
import { Separator } from "../components/ui/separator";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

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

function HomePage() {
  const { profile } = useProfileStore();

  const [watchlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalPortfolioValue = mockWatchlist.reduce(
    (acc, stock) => acc + stock.price,
    0
  );

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/whishlist/get`,
          { withCredentials: true }
        );

        if (!res.data.success) {
          return;
        }

        const watchlist = res.data.data.whishlist.map((item) => {
          return {
            name: item.name,
            price: item.price,
            change: item.change,
          };
        });

        setWishlist(watchlist);
      } catch (error) {
        toast.error("Failed to get whishlist");
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
          <div className="relative group bg-zinc-200 dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-6 rounded-lg shadow-lg">
            <p className="text-xl">
              Total Portfolio Value: ${totalPortfolioValue}
            </p>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-8 top-0 h-full flex items-center">
              <MdArrowForwardIos className="text-2xl text-zinc-700 dark:text-zinc-300" />
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketOverview.map((market) => (
              <div
                key={market.index}
                className="relative group bg-zinc-200 dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
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
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-7 top-0 h-full flex items-center">
                  <MdArrowForwardIos className="text-2xl text-zinc-700 dark:text-zinc-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Watchlist */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Stock Watchlist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="relative bg-zinc-200 dark:bg-zinc-800 border-1 p-4 rounded-lg shadow-lg animate-pulse">
                    {/* Skeleton for stock name */}
                    <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4 mb-4"></div>
                    {/* Skeleton for stock price */}
                    <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-4"></div>
                    {/* Skeleton for stock change */}
                    <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4 mb-4"></div>
                    {/* Skeleton for arrow icon */}
                    <div className="absolute right-6 top-0 h-full flex items-center">
                      <div className="h-6 w-6 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
                    </div>
                  </div>
                ))
              : watchlist?.map((stock) => (
                  <div
                    key={stock.name}
                    className="relative group bg-zinc-200 dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
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
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-6 top-0 h-full flex items-center">
                      <MdArrowForwardIos className="text-2xl text-zinc-700 dark:text-zinc-300" />
                    </div>
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
            className="bg-zinc-200 text-zinc-900 dark:bg-zinc-950/40 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
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
            className="bg-zinc-200 text-zinc-900 dark:bg-zinc-950/40 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          />
        </div>

        {/* Predictions Accuracy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Predictions Accuracy</h2>
          <div className="group bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center w-fit space-x-2">
              <p className="text-xl">Prediction Accuracy: 85%</p>
              {/* <MdArrowForwardIos className="text-lg text-zinc-700 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
            </div>
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

export default HomePage;
