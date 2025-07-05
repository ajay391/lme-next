import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";


export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axiosInstance.get("/auth/my-addresses/");
        const allAddresses = res.data;
        setAddresses(allAddresses);

        const defaultAddress = allAddresses.find(addr => addr.is_default);
        if (defaultAddress) {
          setValue("fullName", defaultAddress.full_name);
          setValue("email", defaultAddress.email);
          setValue("street", defaultAddress.street_address);
          setValue("city", defaultAddress.city);
          setValue("state", defaultAddress.state);
          setValue("postalCode", defaultAddress.postal_code);
          setValue("country", defaultAddress.country);
          setValue("phone", defaultAddress.phone_number);
          setSelectedAddressId(defaultAddress.id.toString()); // Set selected option
        }
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      }
    };

    fetchAddresses();
  }, []);


  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data) => {
  if (cartItems.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  try {
    // 1. Create Razorpay Order
    const razorRes = await axiosInstance.post("/orders/create-razorpay-order/", { amount });

    const options = {
      key: razorRes.data.key,
      amount: razorRes.data.amount,
      currency: razorRes.data.currency,
      name: "Nowhere Store",
      description: "Test Transaction",
      order_id: razorRes.data.order_id,
      handler: async function (response) {
        // 2. Handle successful payment
        try {
          const orderData = {
            full_name: data.fullName,
            phone_number: data.phone,
            street_address: data.street,
            city: data.city,
            state: data.state,
            postal_code: data.postalCode,
            country: data.country,
            total_price: amount,
            items: cartItems.map(item => ({
              product: item.id,
              quantity: item.quantity,
              price: item.price,
            })),
            payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          };

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/checkout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(orderData),
          });

          if (res.ok) {
            setOrderSuccess(true);
            dispatch(clearCart());
          } else {
            alert("Order failed to save.");
          }
        } catch (err) {
          console.error("Payment success but order save failed:", err);
        }
      },
      prefill: {
        name: data.fullName,
        email: data.email,
        contact: data.phone,
      },
      theme: {
        color: "#000000",
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Error in Razorpay Payment:", error);
    alert("Something went wrong while initiating payment.");
  }
};


  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-6 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span> / <span className="text-black ">Checkout</span>
      </div>

      {orderSuccess ? (
        <div className="bg-green-100 p-6 rounded text-center">
          <h3 className="text-2xl font-semibold text-green-800 mb-2">
            Order Placed Successfully!
          </h3>
          <p className="text-green-700">We’ve sent a confirmation to your email.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Cart Summary */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Your Cart</h3>
            {cartItems.length === 0 ? (
              <div className="bg-red-100 p-4 rounded text-red-700">Your cart is empty.</div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cartItems.map((item, index) => (
                    <li key={index} className="flex gap-4 border rounded p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          Size: {item.size} | Color: {item.color}
                        </p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="font-medium">
                        ₹{item.price * item.quantity}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="text-right font-bold text-lg mt-4">
                  Total: ₹
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                  )}
                </div>
              </>
            )}
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="text-base space-y-4 checkout-form">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                {...register("fullName", { required: "Full Name is required" })}
                className="w-full border p-2 rounded"
                placeholder="Enter Full Name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* <div>
              <label className="block font-medium mb-1">Shipping Address</label>
              <textarea
                {...register("address", { required: "Address is required" })}
                className="w-full border p-2 rounded"
                placeholder="123 Street, City, Country"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div> */}
            {addresses.length > 0 && (
              <div className="mb-4">
                <label className="block font-medium mb-1">Select Address</label>
                <select
                  value={selectedAddressId}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setSelectedAddressId(selectedId); // Track selected ID
                    const selected = addresses.find(a => a.id === parseInt(selectedId));
                    if (selected) {
                      setValue("fullName", selected.full_name);
                      setValue("email", selected.email);
                      setValue("street", selected.street_address);
                      setValue("city", selected.city);
                      setValue("state", selected.state);
                      setValue("postalCode", selected.postal_code);
                      setValue("country", selected.country);
                      setValue("phone", selected.phone_number);
                    }
                  }}
                  className="w-full border p-2 rounded"
                >
                  <option value="">-- Select Address --</option>
                  {addresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.full_name} - {addr.street_address}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block font-medium mb-1">Street Address</label>
              <input
                {...register("street", { required: "Street address is required" })}
                className="w-full border p-2 rounded"
                placeholder="123 Main St"
              />
              {errors.street && (
                <p className="text-red-500 text-sm">{errors.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">City</label>
                <input
                  {...register("city", { required: "City is required" })}
                  className="w-full border p-2 rounded"
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">State</label>
                <input
                  {...register("state", { required: "State is required" })}
                  className="w-full border p-2 rounded"
                  placeholder="State"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Postal Code</label>
                <input
                  {...register("postalCode", { required: "Postal code is required" })}
                  className="w-full border p-2 rounded"
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Country</label>
                <input
                  {...register("country", { required: "Country is required" })}
                  className="w-full border p-2 rounded"
                  placeholder="Country"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country.message}</p>
                )}
              </div>
            </div>


            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                {...register("phone", {
                  required: "Phone is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                className="w-full border p-2 rounded"
                placeholder="Enter Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
