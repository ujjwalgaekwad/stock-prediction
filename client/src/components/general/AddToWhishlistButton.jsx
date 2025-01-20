import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AddToWishlistButton({ stockName }) {
  const [loading, setLoading] = useState(false);

  const handleAddToWishlist = async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_API_URL}/wishlist/add`,
        { name: stockName },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(`${stockName} has been added to your wishlist!`);
      } else {
        throw new Error("Failed to add stock to wishlist.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add to wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-white font-medium ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } transition`}
      onClick={handleAddToWishlist}
      disabled={loading}
    >
      {loading ? "Adding..." : "Add to Wishlist"}
    </button>
  );
}

export default AddToWishlistButton;
