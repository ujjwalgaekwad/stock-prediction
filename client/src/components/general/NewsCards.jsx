import axios from "axios";
import React, { useState, useEffect } from "react";

// https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=1kYzkZadl9tXhQ29A9hY33uTwAX6aJonysLO3dB6

function NewsCards() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch news data from an API
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.marketaux.com/v1/news/all?symbols=${import.meta.env.VITE_MARKETAUX_API_KEY}`); // Replace with your actual API endpoint
        if (!response.data.success) {
          throw new Error("Failed to fetch news");
        }
        setNewsData(response.data.news); // Assuming the API returns `{ news: [...] }`
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && newsData.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400">No news articles available.</p>
      )}
      {!loading &&
        !error &&
        newsData.map((newsItem, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-medium">{newsItem.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Source: {newsItem.source}
            </p>
            {newsItem.url && (
              <a
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 underline text-sm mt-2 inline-block"
              >
                Read more
              </a>
            )}
          </div>
        ))}
    </div>
  );
}

export default NewsCards;
