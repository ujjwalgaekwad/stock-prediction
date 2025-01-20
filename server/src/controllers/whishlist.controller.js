import { User } from "../models/user.model.js"; // Assuming the User model includes a 'wishlist' field
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Fetch the wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("wishlist");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.wishlist.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { wishlist: [] }, "Wishlist is empty"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { wishlist: user.wishlist }, "Wishlist fetched successfully"));
});

// Add an item to the wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    throw new ApiError(400, "Item ID is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if the item is already in the wishlist
  if (user.wishlist.includes(itemId)) {
    throw new ApiError(400, "Item is already in the wishlist");
  }

  user.wishlist.push(itemId);
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, { wishlist: user.wishlist }, "Item added to wishlist"));
});

// Remove an item from the wishlist
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    throw new ApiError(400, "Item ID is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if the item exists in the wishlist
  if (!user.wishlist.includes(itemId)) {
    throw new ApiError(400, "Item is not in the wishlist");
  }

  user.wishlist = user.wishlist.filter((id) => id.toString() !== itemId.toString());
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { wishlist: user.wishlist }, "Item removed from wishlist"));
});

// Clear the wishlist
const clearWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.wishlist = [];
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Wishlist cleared successfully"));
});

export {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
