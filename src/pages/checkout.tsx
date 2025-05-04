// pages/checkout.tsx

import { useForm, SubmitHandler } from "react-hook-form";


type CheckoutFormInputs = {
    fullName: string;
    email: string;
    address: string;
    phone: string;
  };

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<CheckoutFormInputs>();

  const onSubmit = (data: CheckoutFormInputs) => {
    console.log("Order Data:", data);
    // Here you can call your backend API to place the order
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {!isSubmitSuccessful ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full border p-2 rounded"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Email</label>
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

          <div>
            <label className="block font-medium">Shipping Address</label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full border p-2 rounded"
              placeholder="123 Street, City, Country"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className="w-full border p-2 rounded"
              placeholder="9876543210"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Place Order
          </button>
        </form>
      ) : (
        <div className="bg-green-100 p-4 rounded text-center">
          <h3 className="text-xl font-semibold text-green-800">
            Order Placed Successfully!
          </h3>
          <p className="text-green-700">We’ve sent a confirmation to your email.</p>
        </div>
      )}
    </div>
  );
}
