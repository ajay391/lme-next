import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  clearCart,
  addQuantity,
  decreaseQuantity,
} from '../store/cartSlice';
import { PiShoppingCartSimple } from 'react-icons/pi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import shopCart from "../../public/images/empty-box.png";
import Image from 'next/image';
import { LiaTimesSolid } from 'react-icons/lia';
import { GoPlus } from "react-icons/go";
import { HiMiniMinus } from "react-icons/hi2";
import { BiSolidTrashAlt } from 'react-icons/bi';
import { PiTrash } from "react-icons/pi";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const handleProceedToCheckout = () => {
  if (isAuthenticated) {
    router.push('/checkout');
  } else {
    router.push('/login?next=/checkout');
  }
};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 min-h-[70vh]">
      <h2 className="text-xl font-medium uppercase text-gray-800 mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-10 sm:py-18 text-gray-500 flex justify-center items-center flex-col gap-6">
          <Image
            src={shopCart}
            alt="Profile"
            width={110}         // or your desired size
            height={110}
            className="object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-700">
            Your Cart is Empty.
          </h2>
          <p className="text-base max-w-[500px] text-gray-500">
            It looks like you haven't added any items to your cart yet. Start browsing our products and add some to your cart.
          </p>
          <Link href="/shop">
            <button className="bg-black text-white px-6 py-2 rounded-sm hover:bg-red-500 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:grid grid-cols-6 gap-4 px-4 py-6 border-b font-medium text-gray-700 text-sm">
            <div className="col-span-2 poppins-font">Product</div>
            <div className="text-center poppins-font">Price</div>
            <div className="text-center poppins-font">Quantity</div>
            <div className="text-center poppins-font">Total</div>
            <div className="text-center poppins-font">Action</div>
          </div>

          <div className="space-y-6 mt-10 sm:space-y-0 sm:mt-0">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="grid grid-cols-1 sm:grid-cols-6 gap-5 sm:gap-4 items-center bg-white px-0 sm:px-4 py-6 border-b sm:border-0 sm:border-b"
              >

                <div className="sm:col-span-2 flex items-center gap-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name || 'Product'}
                    className="w-20 h-20 object-cover rounded-sm"
                  />
                  <div>
                    <h3 className="text-base font-medium text-gray-800 poppins-font">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  </div>
                </div>

                <div className="hidden sm:table-cell text-center text-gray-700 font-medium">
                  ₹{item.price}
                </div>
                <div className="text-center flex justify-between sm:justify-center">
                  <div className="inline-flex items-center gap-2 rounded-sm px-0 py-1 ">
                    <button
                      className="text-lg p-2 text-black bg-white shadow-sm sm:shadow-sm border rounded-sm transition"
                      onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size, color: item.color }))}
                      aria-label="Decrease quantity"
                    >
                      <HiMiniMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-lg p-2 text-black bg-white shadow-sm sm:shadow-sm border rounded-sm transition"
                      onClick={() => dispatch(addQuantity({ id: item.id, size: item.size, color: item.color }))}
                      aria-label="Increase quantity"
                    >
                      <GoPlus />
                    </button>


                  </div>
                  <div className=" sm:hidden">
                    <button
                      onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                      className="text-red-500 bg-white px-2 py-2 rounded-sm text-2xl"
                    >
                      {/* Remove */}
                      {/* <BiSolidTrashAlt /> */}
                      <PiTrash />
                    </button>
                  </div>

                </div>

                <div className="sm:hidden flex justify-between gap-4 py-2 text-lg text-gray-700 ">
                  {/* <span className="font-medium text-red-500">₹{item.price}</span> */}
                  <div className="flex justify-between">
                    <span className="font-medium mr-3">Price</span>
                    <span className="font-medium text-red-500">₹{item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium mr-2">Total:</span>
                    <span className="font-medium text-black">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div className="hidden sm:table-cell text-center text-gray-700 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>


                <div className="hidden sm:block text-end sm:text-center">
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                    className="text-red-500 hover:underline text-sm"
                    title="Remove"
                  >
                    <PiTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-0 pt-6">
            <h4 className="text-xl font-medium text-gray-800">
              Subtotal: <span className=''> ₹{totalPrice.toFixed(2)}</span>
            </h4>
            <div className="flex gap-3 w-full sm:w-fit">
              {/* <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-6 py-2 rounded-sm hover:bg-red-600 transition"
              >
                Clear All
              </button> */}
              <button
                onClick={handleProceedToCheckout}
                className="bg-black text-white w-full sm:w-fit px-10 py-3 sm:py-2 rounded-sm hover:bg-gray-800 transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
