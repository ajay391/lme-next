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
import { Eye, Heart, Trash2 } from 'lucide-react';
import { FaEye } from 'react-icons/fa';
import { BiSolidTrashAlt } from "react-icons/bi";
import shopCart from "../../public/images/add-to-favorites.png";
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';
import { LiaTimesSolid } from "react-icons/lia";
import AddToCartButton from '../components/AddToCartButton';
import SizeModal from '../components/SizeModal';
import { PiTrash } from "react-icons/pi";
import { MdAddShoppingCart } from "react-icons/md";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
//   const wishlistItems = [
//     {
//         "id": 14,
//         "product": 3,
//         "product_detail": {
//             "id": 3,
//             "name": "Zoned Out Club",
//             "description": "pro des",
//             "price": "222.00",
//             "stock": 2,
//             "image": "http://res.cloudinary.com/dxtmkvwrp/image/upload/v1751560070/wofibdjyfzf2in0wodgk.png",
//             "images": [
//                 "http://res.cloudinary.com/dxtmkvwrp/image/upload/v1751561809/qxohqs8cfhotpuuf5asp.png",
//                 "http://res.cloudinary.com/dxtmkvwrp/image/upload/v1751561822/ultvok5foccff8dbnusu.png"
//             ],
//             "available_sizes": "S,M,L",
//             "available_colors": "Red",
//             "category": 1,
//             "tags": [],
//             "is_new": false,
//             "created_at": "2025-07-03T01:44:16.454749Z",
//             "updated_at": "2025-07-14T07:21:35.386595Z"
//         },
//         "size": "",
//         "color": ""
//     }
// ]
  const dispatch = useDispatch();

  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedItem, setSelectedItem] = useState(null); // item to add to cart
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  const handleSizeChange = (itemId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [itemId]: size,
    }));
  };

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 min-h-[70vh]">
      {/* <div className='mb-5 flex justify-start items-center'>

          <span className="hover:underline cursor-pointer text-gray-500">Home</span> &nbsp;<IoIosArrowForward />&nbsp; <span className="text-black ">Wishlist </span>
      </div> */}
      <h2 className="text-xl font-medium uppercase text-gray-800 mb-6 ">Your Wishlist</h2>


      {wishlistItems.length === 0 ? (
        <div className="text-center py-10 sm:py-18 text-gray-500 flex justify-center items-center flex-col gap-6">
          <Image
            src={shopCart}
            alt="Profile"
            width={70}    // or your desired size
            height={70}
            className="object-cover mb-5"
          />
          <h2 className="text-2xl font-semibold text-gray-700">Your Wishlist is Empty</h2>
          <p className="text-md max-w-[500px]">
            Looks like you haven't added anything to your wishlist yet. Start exploring and save your favorite items for later!
          </p>

          <Link
            href="/shop"
            className="mt-0 inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Header Row */}
          <div className="hidden sm:grid grid-cols-5 gap-6 px-4 py-3 border-b font-medium text-gray-700 text-sm ">
            <div className="col-span-2 poppins-font">Product</div>
            <div className="poppins-font">Price</div>
            <div className="poppins-font">Stock</div>
            <div className="poppins-font">Action</div>
          </div>

          {/* Item Rows */}
          <div className="space-y-6 sm:space-y-0 mt-4 sm:mt-0">
            {wishlistItems.map((item) => {

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-5 gap-6 items-center bg-white px-0 sm:px-4 py-6 rounded-sm border-b sm:border-0 sm:border-b"
                >
                  {/* Image + Product */}
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <img
                      src={`${item.product_detail?.image}`}
                      // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product_detail?.image}`}
                      alt={item.product_detail?.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <Link
                        href={`/product/${item.product_detail?.id}`}
                        className="text-sm p-2 text-cente text-black rounded-sm"
                      >
                        <h3 className="text-base pr-3 font-medium  poppins-font text-gray-800">

                          {item.product_detail?.name}
                        </h3>
                      </Link>
                      {/* <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p> */}
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="text-red-500 font-medium flex justify-between sm:justify-start">
                    <span>
                      ₹{item.product_detail?.price}
                    </span>
                    <span className="inline-block sm:hidden px-2 py-1 text-xs bg-green-100 text-green-600">
                      &bull; In Stock
                    </span>

                  </div>

                  {/* Stock */}
                  <div className='hidden sm:flex'>
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-600">
                      &bull; In Stock
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="text-left">
                    <div className="flex justify-end sm:justify-start sm:flex-row gap-2 sm:items-center text-left">

                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setIsSizeModalOpen(true);
                        }}
                        className="text-sm px-2 text-black rounded-sm"
                        title="Add to Cart"
                      >
                        {/* Add to Cart */}
                        <MdAddShoppingCart size={20} />
                      </button>

                      {/* <Link
                        href={`/product/${item.product_detail?.id}`}
                        className="text-sm p-2 text-cente text-black rounded-sm"
                      >
                        <FaEye size={20} />
                      </Link> */}

                      <button
                        onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
                        className="text-sm px-2 text-red-500 rounded-sm hover:text-red-600"
                        title="Remove"
                      >
                        <PiTrash size={22} />
                      </button>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Clear Wishlist Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="text-sm px-0 py-2 rounded-sm transition text-red-500 "
            >
              Clear All
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
              // Dispatch to cart
              dispatch(
                addToCart({
                  id: selectedItem.product_detail.id,
                  name: selectedItem.product_detail.name,
                  price: selectedItem.product_detail.price,
                  image: selectedItem.product_detail.image,
                  quantity: 1,
                  size: size,
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
