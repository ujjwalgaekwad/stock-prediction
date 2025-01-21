import React from "react";

const NewsDisplay = () => {
    const {stockData, setUpdateSearchData} = useContext(StockContext);
    
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Display Percent Change */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Stock Update</h2>
        {/* <p
          className={`text-4xl font-semibold ${
            parseFloat(percentChange) > 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {percentChange}%
        </p> */}
      </div>

      {/* Display Recent News */}
      <div>
        <h3 className="text-xl font-bold mb-4">Recent News</h3>
        <ul className="space-y-4">
          {stockData.recentNews.map((news, index) => (
            <li
              key={news.id}
              className="flex items-start bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex-1">
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-lg font-semibold"
                >
                  {news.headline}
                </a>
                <p className="text-gray-500 text-sm mt-1">
                  {news.date} | {news.timeToRead} min read
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsDisplay;
