import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromWishlist, clearWishlist } from '../store/wishlistSlice';
import Link from 'next/link';

const WishlistPage = () => {
  const [isClient, setIsClient] = useState(false);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center justify-between py-4 border-b border-gray-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">${item.price}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromWishlist({ id: item.id, size: item.size }))}
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
