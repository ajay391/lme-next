"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../public/images/profile.png";
import axiosInstance from "../utils/axiosInstance";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    email: "",
    phone: "",
    address: ""
  });

  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("auth/me/");
        const user = res.data.user;
        setForm({
          name: user.name,
          email: user.email,
          phone: user.phone || "",
          address: user.address || "",
        });
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axiosInstance.get("/auth/my-addresses/");
        
        setAddresses(res.data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/my-orders/");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, []);

  const [wishlist, setWishlist] = useState([]);
    useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axiosInstance.get("/wishlist/"); // Adjust if your endpoint is different
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

 
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditOpen(false);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow p-6 h-fit">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 mb-4">
                <Image 
                  src={profile} 
                  alt="Profile" 
                  fill
                  className="rounded-full object-cover border-4 border-indigo-100"
                />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{form.name}</h2>
              <p className="text-gray-500 text-sm">{form.email}</p>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activeTab === "profile" ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activeTab === "orders" ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activeTab === "addresses" ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium ${activeTab === "wishlist" ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Wishlist
              </button>
              <button className="w-full text-left px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Information */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                  <button 
                    onClick={() => setIsEditOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Full Name:</span>
                    <span className="font-medium">{form.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Email:</span>
                    <span className="font-medium">{form.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-32 text-gray-500">Phone:</span>
                    <span className="font-medium">{form.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="w-32 text-gray-500">Address:</span>
                    <span className="font-medium flex-1">{form.address}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
                </div>
                
                <div className="divide-y">
                  {orders.map((order) => (
                      <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors border-b">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">Order #{order.id}</div>
                            <div className="text-sm text-gray-500">Placed on {new Date(order.created_at).toLocaleDateString()}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" :
                              order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {order.status}
                            </span>
                            <div className="text-right">
                              <div className="font-medium">₹{order.total_price}</div>
                              <div className="text-sm text-gray-500">{order.items.length} items</div>
                            </div>
                          </div>
                        </div>

                        {/* View Details Toggle */}
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            {expandedOrderId === order.id ? "Hide Details" : "View Details"}
                          </button>
                        </div>

                        {/* Expanded Order Details */}
                        {expandedOrderId === order.id && (
                          <div className="mt-4 space-y-4 border-t pt-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4">
                                <Image
                                  src={item.product_image}
                                  alt={item.product_name}
                                  width={60}
                                  height={60}
                                  className="rounded object-cover"
                                />
                                <div>
                                  <h4 className="font-semibold">{item.product_name}</h4>
                                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm font-medium">
                    Add New Address
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="border rounded-lg p-6 hover:border-indigo-300 transition-colors relative">
                      {addr.is_default && (
                        <span className="absolute top-4 right-4 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <h3 className="font-medium text-lg mb-2">{addr.full_name}</h3>
                      <p className="text-gray-600 mb-4">
                        {addr.street_address}, {addr.city}, {addr.state}, {addr.postal_code}, {addr.country}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">Phone: {addr.phone_number}</p>
                      <div className="flex gap-3">
                        <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Edit</button>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">Remove</button>
                        {!addr.is_default && (
                          <button className="text-gray-600 hover:text-gray-800 text-sm font-medium ml-auto">
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative aspect-square bg-gray-100">
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE}/${item.product_detail?.image}`}
                          alt={item.product_detail.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1">{item.product_detail.name}</h3>
                        <p className="text-sm text-gray-500 mb-1">Size: {item.size} | Color: {item.color}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold">₹{item.product_detail.price}</span>
                          <div className="flex gap-2">
                            {/* Wishlist or cart icons */}
                            <button className="p-2 text-red-500 hover:text-red-600" title="Remove">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button className="p-2 text-gray-500 hover:text-indigo-600" title="Add to cart">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
                <button 
                  onClick={() => setIsEditOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({...form, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditOpen(false)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;