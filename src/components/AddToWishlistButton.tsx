import { useDispatch } from "react-redux";
import { addToWishlist } from "../store/wishlistSlice";

interface AddToWishlistButtonProps {
  product: any;
  selectedSize: string;
}

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ product, selectedSize }) => {
  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    dispatch(addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    }));
  };

  return (
    <button
      onClick={handleAddToWishlist}
      className="mt-2 px-4 py-2 border border-black text-black rounded hover:bg-black hover:text-white transition"
    >
      Add to Wishlist
    </button>
  );
};

export default AddToWishlistButton;
