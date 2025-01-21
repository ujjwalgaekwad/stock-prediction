import React, { useContext } from "react";
import useProfileStore from "../store/profileStore";
import { MultiLineChart, SingleLineChart } from "../components/charts/index"; // Assuming these are pre-built components
import { Separator } from "../components/ui/separator";
import { MdArrowForwardIos } from "react-icons/md";
import WishlistCards from "../components/general/WishlistCards";
import GraphContext from "../context/GraphContext";
import { StockContext } from "../context/StocksContext";
import News from "../components/general/News";
import Company from "../components/general/Company";
import Chart from "../components/general/Chart";
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

// https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=1kYzkZadl9tXhQ29A9hY33uTwAX6aJonysLO3dB6

function HomePage() {
  const { searchData, setUpdateSearchData, stockName, setStockName, stockPrice, setStockPrive } = useContext(StockContext);

  const { profile } = useProfileStore();

  const totalPortfolioValue = mockWatchlist.reduce(
    (acc, stock) => acc + stock.price,
    0
  )

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden`}>
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold">
          Hello, {profile.fullName.split(" ")[0]}!
        </h1>
        <p className="mb-6 text-gray-600">Welcome to your stock market dashboard.</p>

        {/* Portfolio Overview */}
        {/* <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Portfolio Overview</h2>
          <div className="relative group bg-white dark:bg-zinc-800 cursor-pointer hover:border-gray-200 dark:hover:border-zinc-700 p-6 rounded-lg shadow-md">
            <p className="text-xl">
              Total Portfolio Value: ${totalPortfolioValue}
            </p>
            <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 right-8 top-0 h-full flex items-center">
              <MdArrowForwardIos className="text-2xl text-zinc-700 dark:text-zinc-300" />
            </div>
          </div>
        </div> */}
        
        {/* Market Overview */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Market Overview</h2>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {marketOverview.map((market) => (
              <div
                key={market.index}
                className="relative group bg-white dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
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
            
          </div> */}
          <Company />
        </div>

        {/* Stock Watchlist */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Stock Watchlist</h2>
          <WishlistCards />
        </div>

        {/* Stock news */}
        <div className="mb-6">
          <News />
        </div>

        <Separator className="my-8" />
        {/* MultiLineChart Component */}
        <div className="mb-6">
          {/* <MultiLineChart
            chartConfig={chartConfig}
            chartData={chartData}
            defaultCard
            title="Adani vs Tata Motors vs Balaji Wafers"
            dataKeys={["adani", "tataMotors", "balaji"]}
            className="bg-zinc-200 text-zinc-900 dark:bg-zinc-950/40 dark:text-zinc-100 rounded-lg shadow overflow-hidden"
          /> */}
        </div>
        {/* <Separator className="my-8" /> */}

        {/* Historical Performance (Single Line Chart) */}
        <div className="mb-6 p-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
          
          {/* <GraphContext /> */}
          <Chart />
        </div>
        {/* Predictions Accuracy */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Predictions Accuracy</h2>
          <div className="group bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <div className="flex justify-center items-center w-fit space-x-2">
              <p className="text-xl">Prediction Accuracy: 85%</p>
              {/* <MdArrowForwardIos className="text-lg text-zinc-700 dark:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
            </div>
            <div className="w-full bg-white dark:bg-zinc-600 rounded-full h-2 mt-2">
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
