import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowForwardIos } from "react-icons/md";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_API_URL}/wishlist/get`,
          { withCredentials: true }
        );

        if (!res.data.success) {
          throw new Error("Failed to fetch wishlist.");
        }

        const wishlist = res.data.data.wishlist.map((item) => ({
          name: item.name,
          price: item.price,
          change: item.change,
        }));

        setWishlist(wishlist);
      } catch (error) {
        toast.error("Failed to get wishlist");
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const SkeletonLoader = () => (
    <div className="animate-pulse bg-zinc-200 dark:bg-zinc-800 p-4 rounded-lg shadow-lg">
      <div className="h-6 bg-zinc-300 dark:bg-zinc-700 rounded w-3/4 mb-4"></div>
      <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-1/2 mb-2"></div>
      <div className="h-5 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4"></div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            : wishlist.map((stock) => (
                <div
                  key={stock.name}
                  className="relative group bg-zinc-200 dark:bg-zinc-800 border-1 cursor-pointer border-transparent hover:border-zinc-300 dark:hover:border-zinc-700 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-semibold">{stock.name}</h3>
                  <p className="text-lg mt-2">${stock.price}</p>
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
        {!loading && wishlist.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
            Your wishlist is empty.
          </p>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
