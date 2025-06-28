import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../store/wishlistSlice';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b border-gray-300"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product_detail?.image}`}
                alt={item.product_detail?.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.product_detail?.name}</p>
                <p className="text-gray-600">${item.product_detail?.price}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Color: {item.color}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
            >
              Clear Wishlist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
