import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import axios from "axios";
import toast from "react-hot-toast";

function SearchBox() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Holds search results
  const [loading, setLoading] = useState(false); // Manages loading state
  const [error, setError] = useState(null); // Handles any errors

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(search);
    }, 500); // Delay of 500ms after the last keystroke

    return () => clearTimeout(delayDebounceFn); // Clean up the timeout on component unmount
  }, [search]);

  // Handles the search and API call
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]); // Clear results if the search is empty
      return;
    }

    setLoading(true);
    setError(null); // Reset error state before new search
    try {
      const options = {
        method: "GET",
        url: "https://stock.indianapi.in/industry_search",
        params: { query: query },
        headers: { "X-Api-Key": import.meta.env.VITE_STOCK_API },
      };

      const { data } = await axios.request(options);

      console.log(data)

      if ((Array.isArray(data)) && data.length > 0) {
        setSearchResults(data); // Update state with search results
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      toast.error("Failed to fetch search results");
      setError(error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:h-20 h-[4.5rem] lg:py-5 pt-4 pb-[1rem] flex space-x-2 md:w-2/5">
      <div className="w-full relative hidden md:inline-block">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search on input change
          placeholder="Search something..."
          defaultStyling={false}
          className="bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        />
        <div className="absolute top-2 right-2 border-1 text-zinc-900 bg-zinc-200 border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 w-fit py-1 px-2 text-xs rounded-md">
          ⌘K
        </div>

        {/* Display search results below the input field */}
        {search && (
          <div
            className="absolute z-10 w-full bg-zinc-100 dark:bg-zinc-800 shadow-lg rounded-lg mt-1 max-h-64 overflow-y-auto"
            style={{ maxHeight: "250px", overflowY: "scroll" }}
          >
            {loading ? (
              <p className="p-3 text-center text-zinc-600 dark:text-zinc-300">
                Loading...
              </p>
            ) : error ? (
              <p className="p-3 text-center text-red-500">{error}</p> // Display error message
            ) : searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link
                  to={`/stock/${result.id}`} // Navigate to the stock page
                  key={result.id}
                  className="block px-4 py-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                >
                  {result.commonName}
                </Link>
              ))
            ) : (
              <p className="p-3 text-center text-zinc-600 dark:text-zinc-300">
                No results found
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
