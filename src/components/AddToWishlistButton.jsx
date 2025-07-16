import { useDispatch } from "react-redux";
import { addToWishlist } from "../store/wishlistSlice";
import toast from "react-hot-toast";
const AddToWishlistButton = ({ product }) => {
  const dispatch = useDispatch();

 const handleAddToWishlist = async () => {
   const isLoggedIn = Boolean(localStorage.getItem("access_token")); // or check via Redux auth state

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
