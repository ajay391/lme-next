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
    router.push(isAuthenticated ? '/checkout' : '/login');
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 min-h-[70vh]">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500 flex justify-center items-center flex-col gap-6">
          <PiShoppingCartSimple size={80} className="text-gray-400" />
          <h4 className="text-2xl font-semibold text-gray-700">
             Your cart is empty.
          </h4>
          <p className="text-base max-w-[500px] text-gray-500">
            It looks like you haven't added any items to your cart yet. Start browsing our products and add some to your cart.
          </p>
          <Link href="/shop">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-red-500 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden sm:grid grid-cols-6 gap-4 px-4 py-3 border-b font-semibold text-gray-700 text-sm">
            <div className="col-span-2">Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-center">Unit Price</div>
            <div className="text-center">Subtotal</div>
            <div className="text-center">Action</div>
          </div>

          <div className="space-y-6 mt-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center bg-white shadow-sm p-4 rounded-lg border"
              >
                <div className="sm:col-span-2 flex items-center gap-4">
                  <img
                    src={item.image || 'https://via.placeholder.com/80'}
                    alt={item.name || 'Product'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 border rounded px-2 py-1">
                    <button
                      className="text-lg px-2 text-gray-600 hover:text-black transition"
                      onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size, color: item.color }))}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-lg px-2 text-gray-600 hover:text-black transition"
                      onClick={() => dispatch(addQuantity({ id: item.id, size: item.size, color: item.color }))}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                </div>

                <div className="sm:hidden flex flex-col gap-1 mt-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Price:</span>
                    <span className="font-semibold text-gray-800">₹{item.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-semibold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>

                <div className="hidden sm:table-cell text-center text-gray-700 font-medium">
                  ₹{item.price}
                </div>
                <div className="hidden sm:table-cell text-center text-gray-700 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-end sm:text-center">
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 border-t pt-6">
            <h4 className="text-xl font-medium text-gray-800">
              Total: ₹{totalPrice.toFixed(2)}
            </h4>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
