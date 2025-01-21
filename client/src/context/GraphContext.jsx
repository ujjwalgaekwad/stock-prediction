import React, { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import conf from "../conf/conf";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { StockContext } from "./StocksContext";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function PriceChart() {
    const { searchData, setUpdateSearchData } = useContext(StockContext);
    // const defaultSearchValue = 'Tata steel';
    const [search, setSearch] = useState(searchData);
    const [chartData, setChartData] = useState(null); // Store chart data
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
  
    useEffect(() => {
        // Fetch the data
        async function fetchData() {
            try {
                const response = await fetch(`https://stock.indianapi.in/historical_data?stock_name=${search}&period=1m&filter=default`, {
                    headers: {
                        'X-Api-Key': conf.api_key
                    }
                }) 
                const result = await response.json();


                const priceData = result.datasets.find(
                    (dataset) => dataset.metric === "Price"
                );

               
                const dates = [];
                const prices = [];
                if (priceData) {
                    priceData.values.forEach(([date, price]) => {
                        dates.push(date);
                        prices.push(parseFloat(price));
                    });
                }

                const data = {
                    labels: dates,
                    datasets: [
                        {
                            label: priceData?.label || "Price Data",
                            data: prices,
                            borderColor: "rgba(75, 192, 192, 1)", // Line color
                            backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill color
                            borderWidth: 2, // Line width
                        },
                    ],
                };

                setChartData(data); 
                setIsLoading(false); 
            } catch (error) {
                setError("Failed to fetch data");
                setIsLoading(false); 
            }
        }

        fetchData();
    }, []); 

    if (isLoading) {
        return (
            <div className="flex flex-col space-y-4 p-4">
                <div className="h-6 flex bg-gray-300 dark:bg-gray-600 rounded w-1/4 animate-pulse"></div>
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
        )
    }
    if (error) return <p>{error}</p>;

    // if (error) {
    //     return (
    //         <div className="flex flex-col space-y-4 p-4">
    //             <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 animate-pulse"></div>
    //             <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
    //         </div>
    //     )
    // }

    return (
        <div>
            <h1 className="text-center">{search ? search.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ') : ''}</h1>
            <Line
                // height={400}
                // width={1000}
                data={chartData}
                options={{
                    responsive: true, //true bhi kar skte hai fir height,width nahi dena hoga
                    plugins: {
                        legend: {
                            position: "top",
                        },
                    },
                    scales: {   
                        x: {
                            title: {
                                display: true,
                                text: "Date",
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Price",
                            },
                        },
                    },
                }}
            />
        </div>
    );
}

export default PriceChart;