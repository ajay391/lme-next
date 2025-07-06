import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../store/wishlistSlice';
import Link from 'next/link';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">Your wishlist is empty.</p>
        </div>
      ) : (
        <>
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-5 gap-4 px-4 py-3 border-b font-semibold text-gray-700 text-sm">
            <div className="col-span-2">Product</div>
            <div className="">Unit Price</div>
            <div className="">Stock</div>
            <div className="text-right">Action</div>
          </div>

          {/* Item Rows */}
          <div className="space-y-6 mt-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center bg-white shadow-sm p-4 rounded-lg border"
              >
                {/* Image + Product */}
                <div className="sm:col-span-2 flex items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product_detail?.image}`}
                    alt={item.product_detail?.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {item.product_detail?.name}
                    </h3>
                    {/* <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p> */}
                  </div>
                </div>

                {/* Unit Price */}
                <div className="text-gray-700 font-medium">
                  ₹{item.product_detail?.price}
                </div>

                {/* Stock */}
                <div>
                  <span className="inline-block px-2 py-1 text-xs  bg-green-100 text-green-600">
                    In Stock
                  </span>
                </div>

                {/* Actions */}
                <div className="text-left">
                <div className="flex sm:justify-start flex-col sm:flex-row gap-2 sm:items-center text-left">
                  <Link
                    href={`/product/${item.product_detail?.id}`}
                    className="text-sm text-center text-blue-600 hover:underline"
                  >
                    View 
                  </Link>
                  <button
                    onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Wishlist Button */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
