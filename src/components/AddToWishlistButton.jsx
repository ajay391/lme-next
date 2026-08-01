"use client";

import { useDispatch } from "react-redux";
import { addToWishlist } from "../store/wishlistSlice";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

const AddToWishlistButton = ({ product, className }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = async () => {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    if (!isLoggedIn) {
      toast.error("Please login to add item to wishlist.");
      return;
    }

    try {
      await dispatch(
        addToWishlist({
          product: product.id,
          size: product.size || "",
          color: product.color || "",
        })
      ).unwrap();

      toast.success("Added to wishlist!");
    } catch (error) {
      toast.error(error || "Something went wrong.");
    }
  };

  const defaultClasses =
    "p-4 border border-neutral-300 hover:border-black text-black hover:bg-black hover:text-white rounded-sm transition duration-300 flex items-center justify-center";

  return (
    <button
      onClick={handleAddToWishlist}
      className={className || defaultClasses}
      title="Add to Wishlist"
      aria-label="Add to Wishlist"
    >
      <Heart className="w-5 h-5" />
    </button>
  );
};

export default AddToWishlistButton;
