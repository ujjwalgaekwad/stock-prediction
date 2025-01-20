import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StockDetailsPage() {
  const { stockName } = useParams(); // Assuming you're using React Router for dynamic routing
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/stocks/details/${stockName}`,
          { withCredentials: true }
        );

        if (!res.data.success) {
          throw new Error("Failed to fetch stock details.");
        }

        setStockDetails(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch stock details.");
      } finally {
        setLoading(false);
      }
    })();
  }, [stockName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!stockDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Stock details not found.
        </p>
      </div>
    );
  }

  const { name, price, change, historicalData, description, sector } =
    stockDetails;

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">{name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stock Information */}
          <div className="bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Stock Information</h2>
            <p className="mt-4 text-lg">Current Price: ${price}</p>
            <p
              className={`mt-2 text-lg ${
                change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              Change: {change > 0 ? "+" : ""}
              {change}%
            </p>
            <p className="mt-4">
              <strong>Sector:</strong> {sector}
            </p>
            <p className="mt-4">
              <strong>Description:</strong> {description}
            </p>
          </div>

          {/* Historical Chart */}
          <div className="bg-zinc-200 dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Historical Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockDetailsPage;
