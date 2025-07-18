import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../store/wishlistSlice';
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shopCart from "../../public/images/add-to-favorites.png";
import SizeModal from '../components/SizeModal';
import { PiTrash } from "react-icons/pi";
import { FaEye } from 'react-icons/fa';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setIsSizeModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 min-h-[70vh]">
      <h2 className="text-xl font-medium uppercase text-gray-800 mb-10">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-6">
          <Image src={shopCart} alt="Wishlist Empty" width={70} height={70} className="mb-5" />
          <h2 className="text-2xl font-semibold text-gray-700">Your Wishlist is Empty</h2>
          <p className="text-md max-w-md text-center">
            Looks like you haven't added anything to your wishlist yet. Start exploring and save your favorite items for later!
          </p>
          <Link href="/shop" className="bg-black text-white px-6 py-2 rounded-sm hover:bg-gray-800 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="border rounded-sm overflow-hidden hover:shadow-lg transition-shadow bg-white">
                <div className="relative aspect-square bg-gray-100 cursor-pointer" onClick={() => router.push(`/product/${item.product_detail.id}`)}>
                  <Image
                    src={item.product_detail?.image || '/placeholder.png'}
                    alt={item.product_detail?.name || 'Product Image'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3
                    className="font-medium text-gray-900 mb-2 text-lg line-clamp-1 cursor-pointer "
                    onClick={() => router.push(`/product/${item.product_detail.id}`)}
                  >
                    {item.product_detail?.name}
                  </h3>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-500 text-base font-medium">Rs. {item.product_detail?.price}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="hover:text-black transition uppercase font-medium"
                      title="Add to Cart"
                    >
                      Add to Cart
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
                        className="text-red-500 hover:text-red-600"
                        title="Remove"
                      >
                        <PiTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="text-sm px-4 py-2 bg-red-500 text-white hover:bg-black transition"
            >
              Clear Wishlist
            </button>
          </div>

          <SizeModal
            isOpen={isSizeModalOpen}
            sizes={String(selectedItem?.product_detail?.available_sizes || '').split(',').map(s => s.trim())}
            onClose={() => {
              setSelectedItem(null);
              setIsSizeModalOpen(false);
            }}
            onSelect={(size) => {
              dispatch(
                addToCart({
                  id: selectedItem.product_detail.id,
                  name: selectedItem.product_detail.name,
                  price: selectedItem.product_detail.price,
                  image: selectedItem.product_detail.image,
                  quantity: 1,
                  size,
                  color: selectedItem.color || "",
                })
              );
              toast.success("Added to cart!");
              setIsSizeModalOpen(false);
              setSelectedItem(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default WishlistPage;
