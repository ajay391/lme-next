import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CartPage = () => {
  const [isClient, setIsClient] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Enable rendering on client side
  }, []);

  if (!isClient) return <div>Loading...</div>;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
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
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex items-center justify-between py-4 border-b border-gray-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <p className="text-lg font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Color: {item.color}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size, color: item.color }))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Actions */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xl font-semibold text-gray-800">
              Total: ₹{totalPrice.toFixed(2)}
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
