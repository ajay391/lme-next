import { useDispatch } from "react-redux";
import { addToWishlist } from "../store/wishlistSlice";

const AddToWishlistButton = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
  dispatch(addToWishlist({
    product: product.id,        // ✅ send only the ID
    size: product.size || "",   // optional: add size/color if available
    color: product.color || "",
  }));
};

  return (
    <button
      onClick={handleAddToWishlist}
      className="mt-2 px-4 py-2 border border-black text-black rounded-sm hover:bg-black hover:text-white transition"
    >
      Add to Wishlist
    </button>
  );
};

export default AddToWishlistButton;
