import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdArrowForwardIos } from "react-icons/md";

function WishlistCards() {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative bg-zinc-200 dark:bg-zinc-800 border-1 p-4 rounded-lg shadow-lg animate-pulse"
            >
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
        : wishlist?.map((stock) => (
            <div
              key={stock.name}
              className="relative group bg-zinc-200 dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl">{stock.name}</h3>
              <p className="text-lg">${stock.price}</p>
              <p
                className={stock.change > 0 ? "text-green-500" : "text-red-500"}
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
  );
}

export default WishlistCards;
