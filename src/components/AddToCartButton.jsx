"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

const AddToCartButton = ({ product, selectedSize, quantity, selectedColor, className }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity || 1,
        size: selectedSize,
        color: selectedColor || "",
      })
    );

    toast.success("Added to cart!");
  };

  const defaultClasses =
    "w-full py-4 bg-red-600 hover:bg-black text-white font-mono font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-red-600/20 rounded-sm";

  return (
    <button onClick={handleAddToCart} className={className || defaultClasses}>
      <ShoppingBag className="w-4 h-4" />
      <span>ADD TO CART</span>
    </button>
  );
};

export default AddToCartButton;
