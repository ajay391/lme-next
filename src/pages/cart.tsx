import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set this to true once client-side rendering starts
  }, []);

  console.log(isAuthenticated ,"auth ")

  // Always return a wrapper around the render content to avoid hook misalignment
  if (!isClient) return <div>Loading...</div>; // Just render loading initially

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      // If authenticated, proceed to checkout
      router.push('/checkout');
    } else {
      // Otherwise, redirect to login page
      router.push('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
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
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xl font-semibold text-gray-800">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => dispatch(clearCart())}
                className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handleProceedToCheckout}
                className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
