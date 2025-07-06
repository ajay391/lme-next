import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

const AddToCartButton = ({ product, selectedSize, quantity, selectedColor }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      size: selectedSize,
      color: selectedColor
    }));

    toast.success("Added to cart!");
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-gray-800 transition"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
