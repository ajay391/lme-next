import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import Script from "next/script";
import { CircleCheck } from "lucide-react";
import shopCart from "../../public/images/shopping-bag.png";
import jsPDF from "jspdf";
import Image from "next/image";
import logoBase64 from "../utils/logoBase";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useFormikContext } from "formik";

import { useRef } from "react";

export default function CheckoutPage() {
  const formikRef = useRef();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCharge = 0;
  // {
  //   "id": 6,
  //   "order_id": "LME2507135ADA35",
  //   "user": 5,
  //   "created_at": "2025-07-13T03:39:43.729316Z",
  //   "status": "Pending",
  //   "total_price": "599.00",
  //   "full_name": "Ajay P R",
  //   "phone_number": "7736840046",
  //   "street_address": "Anthony Vattathara Road",
  //   "city": "Kochi",
  //   "state": "Kerala",
  //   "postal_code": "682304",
  //   "country": "India",
  //   "items": [
  //     {
  //       "id": 19,
  //       "product": 1,
  //       "product_name": "FI - Oversized Tee",
  //       "product_image": "http://res.cloudinary.com/dxtmkvwrp/image/upload/v1751038830/tol1tjbrnlla0yxpfvt2.png",
  //       "quantity": 1,
  //       "price": "599.00"
  //     }
  //   ]
  // }

  // Validation Schema

  const CheckoutSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    street: Yup.string().required("Street address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postalCode: Yup.string().required("Postal code is required"),
    country: Yup.string().required("Country is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
      .required("Phone number is required"),
  });

  const downloadOrderSummary = () => {
    if (!orderDetails) return;

    const doc = new jsPDF();
    const left = 20;
    let y = 20;
    const rightAlign = 180;

    try {
      setIsDownloading(true);
      // Add Logo
      doc.addImage(logoBase64, "PNG", left, y, 15, 15);
      y += 20;

      // --- Title / Branding ---
      doc.setFontSize(22);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Helvetica", "bold");
      // doc.text("Last Man on Earth", left, y);
      y += 8;
      doc.setFontSize(14);
      doc.setTextColor(120, 120, 120);
      doc.text("Order Summary", left, y);
      doc.setDrawColor(0);
      doc.line(left, y + 2, 180, y + 2); // underline
      y += 10;

      // --- Order Info ---
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.setFont("Helvetica", "normal");
      doc.text(`Order ID: ${orderDetails.order_id}`, left, y);
      doc.text(`Status: ${orderDetails.status}`, left, y += 8);
      doc.text(`Date: ${new Date(orderDetails.created_at).toLocaleString()}`, left, y += 8);

      // --- Customer Info ---
      y += 12;
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Helvetica", "bold");
      doc.text("Customer Details", left, y);
      doc.setDrawColor(220);
      doc.line(left, y + 2, 180, y + 2);
      y += 8;

      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.setFont("Helvetica", "normal");
      doc.text(`Name: ${orderDetails.full_name}`, left, y += 8);
      doc.text(`Phone: ${orderDetails.phone_number}`, left, y += 8);
      const email = orderDetails.email || "Not Provided";
      doc.text(`Email: ${email}`, left, y += 8);
      doc.text(`Address: ${orderDetails.street_address}, ${orderDetails.city}, ${orderDetails.state} - ${orderDetails.postal_code}, ${orderDetails.country}`, left, y += 8);

      // --- Items ---
      y += 14;
      doc.setFontSize(13);
      doc.setTextColor(0, 0, 0);
      doc.setFont("Helvetica", "bold");
      doc.text("Items", left, y);
      doc.line(left, y + 2, 180, y + 2);
      y += 8;

      // Table Headers
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text("Item", left, y);
      doc.text("Qty", left + 100, y);
      doc.text("Price", rightAlign, y, { align: "right" });

      y += 4;
      doc.line(left, y + 2, 180, y + 2);
      y += 8;

      // Table Items
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(40, 40, 40);

      orderDetails.items.forEach((item, index) => {
        y += 8;
        const cleanPrice = parseFloat(String(item.price).replace(/[^\d.]/g, ""));
        doc.text(`${index + 1}. ${item.product_name}`, left, y);
        doc.text(`${item.quantity}`, left + 100, y);
        doc.text(`Rs. ${cleanPrice.toFixed(2)}`, rightAlign, y, { align: "right" });
      });

      // --- Total ---
      y += 12;
      doc.setDrawColor(0);
      doc.setLineWidth(0.5);
      doc.line(left, y, 180, y);

      y += 8;
      const totalClean = parseFloat(String(orderDetails.total_price).replace(/[^\d.]/g, ""));
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(13);
      doc.text(`Total Amount:`, left + 90, y);
      doc.text(`Rs. ${totalClean.toFixed(2)}`, rightAlign, y, { align: "right" });

      // --- Footer ---
      y += 20;
      doc.setFont("Helvetica", "italic");
      doc.setFontSize(11);
      doc.setTextColor(100, 100, 100);
      doc.text("Thank you for shopping with Lastmanonearth!", left, y);
      doc.text("For support, contact needhelp.lme@gmail.com", left, y + 6);

      // Save the file
      doc.save(`Order_${orderDetails.order_id}.pdf`);
    } catch (error) {
      console.error("PDF download failed:", error);
    } finally {
      setIsDownloading(false); // ✅ Stop loader
    }
  };


  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axiosInstance.get("/auth/my-addresses/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const addressData = res.data;
        setAddresses(addressData);

        // ✅ Set first address as selected and prefill the form
        if (addressData.length > 0) {
          const firstAddress = addressData[0];
          setSelectedAddressId(String(firstAddress.id));

          // ⚠️ Delay execution until Formik is ready
          setTimeout(() => {
            setFormikValuesFromAddress(firstAddress);
          }, 0);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  function setFormikValuesFromAddress(address) {
    // Access Formik context
    const formik = formikRef.current;
    if (!formik) return;

    const { setFieldValue, setTouched } = formik;

    setFieldValue("fullName", address.full_name);
    setFieldValue("email", address.email || "");
    setFieldValue("street", address.street_address);
    setFieldValue("city", address.city);
    setFieldValue("state", address.state);
    setFieldValue("postalCode", address.postal_code);
    setFieldValue("country", address.country);
    setFieldValue("phone", address.phone_number);

   setTouched({
  fullName: false,
  email: false,
  street: false,
  city: false,
  state: false,
  postalCode: false,
  country: false,
  phone: false,
});
  }




  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = async (data, formikHelpers) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const errors = await formikHelpers.validateForm();

  if (Object.keys(errors).length > 0) {
    // 👇 Force all error fields to show messages
    formikHelpers.setTouched(
      Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
      true
    );

    toast.error("Please fill all required fields correctly.");
    return;
  }

    const amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      // 1. Create Razorpay Order
      setIsSubmitting(true);
      const razorRes = await axiosInstance.post("/orders/create-razorpay-order/", { amount });

      const options = {
        key: razorRes.data.key,
        amount: razorRes.data.amount,
        currency: razorRes.data.currency,
        name: "LME",
        description: "Test Transaction",
        order_id: razorRes.data.order_id,
        handler: async function (response) {
          // 2. Handle successful payment
          try {
            const orderData = {
              full_name: data.fullName,
              phone_number: data.phone,
              email: data.email,
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
              const orderResponse = await res.json();
              setOrderSuccess(true);
              dispatch(clearCart());
              setOrderDetails({ ...orderResponse, email: data.email });
              window.scrollTo({ top: 0, behavior: 'smooth' });
              toast.success("Order Placed Successfully")
            } else {
              toast.error("Order failed to save.");
            }
          } catch (err) {
            console.error("Payment success but order save failed:", err);
          } finally {
            setIsSubmitting(false); // ✅ Reset submitting
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
        ondismiss: function () {
          toast("Payment popup closed.");
          setIsSubmitting(false); // <-- This fixes the loading issue
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Razorpay Payment:", error);
      toast.error("Something went wrong while initiating payment.");
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-10 sm:mb-6 text-sm text-gray-500">
          {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2> */}
          <span className="hover:underline cursor-pointer">Home</span> / <span className="text-black ">Checkout</span>
        </div>

        {orderSuccess ? (
          <div className="bg-white rounded-sm sm:p-8 text-center space-y-6 animate-fade-in">
            <div className="flex justify-center">
              <Image
                src={shopCart}
                alt="Profile"

                className="w-20 h-20 rounded-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-green-700">
              Your Order Has Been Placed!
            </h3>
            <p className="text-gray-600 max-w-xl mx-auto">
              Thank you for shopping with us. We'll send you a shipping confirmation email as soon as your order ships.
            </p>
            {orderDetails && (
              <div className="text-sm text-gray-500">
                <p className="mb-2 "><strong>Order ID:</strong> <span className="text-red-600 poppins-font">#{orderDetails.order_id}</span> </p>
                <p><strong>Estimated Delivery:</strong> 4–7 business days</p>
              </div>
            )}
            <div className="flex justify-center pt-2">
              <a
                href="/shop"
                className="inline-block px-5 py-2 mx-2 bg-green-600 text-white rounded-sm hover:bg-green-700 transition"
              >
                Continue Shopping
              </a>
              <button
                onClick={downloadOrderSummary}
                disabled={isDownloading}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-sm hover:bg-gray-900 transition disabled:opacity-50 h-[40px]"
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Downloading...</span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1.5A2.5 2.5 0 006.5 20h11a2.5 2.5 0 002.5-2.5V16M16 10l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span className="hidden sm:inline">Download Order Summary</span>
                  </>
                )}
              </button>

            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {/* Cart Summary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Your Cart</h3>
                {cartItems.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                  </span>
                )}
              </div>
              {cartItems.length === 0 ? (
                <div className="bg-red-100 p-4 rounded text-red-700">Your cart is empty.</div>
              ) : (
                <>
                  <ul className="space-y-4">
                    {cartItems.map((item, index) => (
                      <li key={index} className="flex gap-4 border rounded-sm p-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-md font-semibold mb-1 poppins-font">{item.name}</h4>
                          <p className="text-sm text-gray-500 mb-1">
                            Size: {item.size} {item.color && ` | Color: ${item.color}`}
                          </p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-lg font-medium text-red-500">
                          {/* ₹{item.price * item.quantity} */}
                          ₹{item.price * item.quantity}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gray-50 py-5 rounded-md shadow-sm mt-4 ">
                    <h4 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Order Summary</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <p>Subtotal</p>
                      <span className="">₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-4">
                      <p>Shipping</p>
                      {/* <span>₹{shippingCharge}</span> */}
                      <span className="bg-green-200 text-green-700 py-0 px-2 rounded-sm">Free</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-semibold text-black">
                      <span>Total</span>
                      <span>Rs.{(subtotal + shippingCharge).toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Checkout Form */}
            <Formik
              innerRef={formikRef}
              initialValues={{
                fullName: '',
                email: '',
                street: '',
                city: '',
                state: '',
                postalCode: '',
                country: '',
                phone: '',
              }}
              validationSchema={CheckoutSchema}
              onSubmit={onSubmit}
            >
              {({ values, handleChange, handleSubmit, errors, touched, setFieldValue, setTouched }) => (


                <Form onSubmit={handleSubmit} className="text-base space-y-4 checkout-form">

                  {addresses.length > 0 && (
                    <div className="mb-4">
                      <label className="block font-medium mb-1">Select from saved Address</label>
                      <select
                        value={selectedAddressId}
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          setSelectedAddressId(selectedId);

                          const selected = addresses.find(a => a.id === parseInt(selectedId));

                          if (selected) {
                            setFieldValue("fullName", selected.full_name);
                            setFieldValue("email", selected.email);
                            setFieldValue("street", selected.street_address);
                            setFieldValue("city", selected.city);
                            setFieldValue("state", selected.state);
                            setFieldValue("postalCode", selected.postal_code);
                            setFieldValue("country", selected.country);
                            setFieldValue("phone", selected.phone_number);

                            // ✅ Mark fields as touched so Yup validates
                            setTouched({
                              fullName: true,
                              email: true,
                              street: true,
                              city: true,
                              state: true,
                              postalCode: true,
                              country: true,
                              phone: true,
                            });
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
                    <label className="block font-medium mb-1">Full Name</label>
                    <Field
                      type="text"
                      name="fullName"
                      className="w-full border p-2 rounded-sm focus:ring-1 focus:ring-black focus:outline-none"
                      placeholder="Enter Full Name"
                    />
                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Email</label>

                    <Field
                      type="text"
                      name="email"
                      className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                      placeholder="Enter Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>



                  <div>
                    <label className="block font-medium mb-1">Street Address</label>

                    <Field
                      type="text"
                      name="street"
                      className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                      placeholder="Enter Full Name"
                    />
                    <ErrorMessage name="street" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">City</label>

                      <Field
                        type="text"
                        name="city"
                        className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                        placeholder="Enter Full Name"
                      />
                      <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">State</label>

                      <Field
                        type="text"
                        name="state"
                        className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                        placeholder="Enter Full Name"
                      />
                      <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium mb-1">Postal Code</label>

                      <Field
                        type="text"
                        name="postalCode"
                        className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                        placeholder="Enter Full Name"
                      />
                      <ErrorMessage name="postalCode" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div>
                      <label className="block font-medium mb-1">Country</label>

                      <Field
                        type="text"
                        name="country"
                        className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                        placeholder="Enter Full Name"
                      />
                      <ErrorMessage name="country" component="div" className="text-red-500 text-sm" />
                    </div>
                  </div>


                  <div>
                    <label className="block font-medium mb-1">Phone Number</label>

                    <Field
                      type="text"
                      name="phone"
                      className="w-full border p-2 rounded-sm  focus:ring-1 focus:ring-black focus:outline-none"
                      placeholder="Enter Full Name"
                    />
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        <span>Placing Order...</span>
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </>
  );
}


export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies?.access_token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // or pass token/user data if needed
  };
}
