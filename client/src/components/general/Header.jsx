import { Link, NavLink } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import { useState } from "react";
import appName from "../../constants/appName";
import { Input } from "../ui/input";
import ThemeToggler from "./ThemeToggler";
import axios from "axios"; // For API calls
import toast from "react-hot-toast"; // For error notifications

const Header = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Holds search results
  const [loading, setLoading] = useState(false); // Manages loading state

  // Handles the search and API call
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]); // Clear results if the search is empty
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_API_URL}/search`, // Replace with your API endpoint
        { params: { query }, withCredentials: true }
      );

      if (res.data.success) {
        setSearchResults(res.data.data); // Update state with search results
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      toast.error("Failed to fetch search results");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handles input change and triggers search
  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value); // Call API when the search input changes
  };

  return (
    <>
      <nav className="lg:h-[4.5rem] z-50 fixed top-0 w-full bg-zinc-100 dark:bg-zinc-900 h-16 lg:py-5 pt-4 pb-[1rem] flex justify-between items-center space-x-2 px-5 lg:px-20 border-b-[1px] border-zinc-300 dark:border-zinc-700 select-none">
        <Link
          to="/"
          className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer text-2xl font-helvetica font-semibold flex space-x-2 justify-center items-center"
        >
          <img
            src="/placeholder.png"
            alt="app-logo"
            width="24px"
            className="h-[24px] active:animate-spin"
          />
          <span className="hidden sm:inline">{appName}</span>
        </Link>
        <div className="lg:h-20 h-[4.5rem] lg:py-5 pt-4 pb-[1rem] flex space-x-2 md:w-2/5">
          <div className="w-full relative hidden md:inline-block">
            <Input
              value={search}
              onChange={handleSearchInputChange}
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
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      to={`/stock/${result.symbol}`} // Navigate to the stock page
                      key={result.symbol}
                      className="block px-4 py-2 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      {result.name}
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
        <div className="text-zinc-600 dark:text-zinc-400 md:flex justify-center items-center hidden space-x-7 font-semibold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/whishlist"
            className={({ isActive }) =>
              `${isActive ? "text-zinc-900 dark:text-zinc-100" : "hover:text-zinc-900 dark:hover:text-zinc-100"} cursor-pointer transition-colors`
            }
          >
            Whishlist
          </NavLink>
          <ThemeToggler />
          <div className="hidden lg:inline-block">
            <ProfileCard />
          </div>
        </div>
      </nav>
      <div className="h-16 lg:h-[4.5rem]"></div>
    </>
  );
};

export default Header;
