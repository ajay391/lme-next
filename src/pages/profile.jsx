"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import profile from "../../public/images/profile.png";
import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { ChevronDown, ChevronUp, CirclePlus, Delete, FilePenLine, Plus, Trash } from "lucide-react";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { RiMenu2Fill } from "react-icons/ri";
import { FaUser, FaBoxOpen, FaHome, FaHeart, FaSignOutAlt } from "react-icons/fa";
import emptyOrders from "../../public/images/delete.png";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  // const [isEditOpen, setIsEditOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);  // for profile
  const [isAddressEditOpen, setIsAddressEditOpen] = useState(false);  // for address
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    full_name: '',
    street_address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone_number: '',
    is_default: false,
  });

  const [editAddress, setEditAddress] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axiosInstance.get("/auth/profile-data/");
        const data = res.data;

        setForm({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || "",
          address: data.user.address || "",
        });
        setAddresses(data.addresses || []);
        setOrders(data.orders || []);
        setWishlist(data.wishlist || []);
      } catch (err) {
        console.error("Failed to load profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsProfileEditOpen(false);
  };

  const handleAddAddress = async () => {
    try {
      const res = await axiosInstance.post('/auth/my-addresses/', newAddress);
      const newAddr = res.data;

      // ✅ If new address is marked as default, update existing ones in state
      let updatedAddresses = addresses;

      if (newAddr.is_default) {
        updatedAddresses = addresses.map((addr) => ({
          ...addr,
          is_default: false,
        }));
      }

      // ✅ Add the new one
      setAddresses([...updatedAddresses, newAddr]);
      setIsAddOpen(false);
      toast.success("Address added");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add address");
    }
  };


  const handleUpdateAddress = async () => {
    try {
      const res = await axiosInstance.put(`/auth/my-addresses/${editAddress}/`, editForm);
      const updated = addresses.map((a) => (a.id === editAddress ? res.data : a));
      setAddresses(updated);
      setIsAddressEditOpen(false);
      toast.success("Address updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update address");
    }
  };
  const handleDeleteAddress = async (id) => {
    try {
      await axiosInstance.delete(`/auth/my-addresses/${id}/`);
      setAddresses(addresses.filter((a) => a.id !== id));
      toast.success("Address deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address");
    }
  };
  const handleSetAsDefault = async (id) => {
    try {
      const res = await axiosInstance.put(`/auth/my-addresses/${id}/`, {
        is_default: true,
      });

      // Update address list state: set only this one as default
      const updated = addresses.map((a) =>
        a.id === id ? { ...a, is_default: true } : { ...a, is_default: false }
      );
      setAddresses(updated);

      toast.success("Address set as default");
    } catch (err) {
      console.error(err);
      toast.error("Failed to set as default");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="hidden md:block w-full h-fit md:w-72 bg-white rounded-md shadow-md p-6">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 mb-4 rounded-full bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Main Section Skeleton */}
          <div className="flex-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-sm shadow-md p-6 border border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>

            {/* Orders Skeleton */}
            {/* <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-md" />
            ))}
          </div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="fixed flex gap-3 bottom-6 right-6 z-50 bg-black text-white p-2 rounded-sm shadow-lg focus:outline-none md:hidden"
            aria-label="Open menu"
          >
            <RiMenu2Fill size={22} /> MENU

          </button>

          <div className="hidden md:block w-full h-fit md:w-72 bg-white rounded-md shadow-md p-6">
            <div className="flex  items-center mb-8">
              <div className="relative mr-3">
                <Image
                  src={profile}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full object-cover "
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{form.name}</h2>
                <p className="text-gray-500 text-sm">{form.email}</p>

              </div>
            </div>


            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-3 rounded-sm font-medium ${activeTab === "profile" ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-3 rounded-sm font-medium ${activeTab === "orders" ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full text-left px-4 py-3 rounded-sm font-medium ${activeTab === "addresses" ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full text-left px-4 py-3 rounded-sm font-medium ${activeTab === "wishlist" ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                Wishlist
              </button>
              <button onClick={() => setIsLogoutConfirmOpen(true)} className="w-full text-left px-4 py-3 rounded-sm font-medium text-gray-700 hover:bg-gray-100">
                Logout
              </button>
            </nav>
          </div>

          {isMenuOpen && (
            <div className="fixed inset-0 z-50 flex items-end md:hidden">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Sheet Panel */}
              <div className="relative w-full bg-white rounded-t-xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">My Account</h2>
                  <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="space-y-3">
                  {[
                    { key: "profile", label: "Profile Information", icon: <FaUser className="mr-2" size={20} /> },
                    { key: "orders", label: "My Orders", icon: <FaBoxOpen className="mr-2" size={20} /> },
                    { key: "addresses", label: "Saved Addresses", icon: <FaHome className="mr-2" size={20} /> },
                    { key: "wishlist", label: "Wishlist", icon: <FaHeart className="mr-2" size={20} /> },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => {
                        setActiveTab(item.key);
                        setIsMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full flex items-center text-left px-4 py-3 rounded-sm font-medium transition uppercase ${activeTab === item.key ? "bg-red-100 text-red-700" : "text-gray-700 hover:bg-gray-100"
                        }`}
                    >
                      {/* {item.icon} */}
                      {item.label}
                    </button>
                  ))}

                  <button
                    onClick={() => setIsLogoutConfirmOpen(true)}
                    className="w-full flex items-center text-left px-4 py-3 text-gray-500 hover:text-black hover:bg-gray-100 rounded-md transition uppercase"
                  >
                    {/* <FaSignOutAlt className="mr-2" /> */}
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          )}

          {isLogoutConfirmOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-sm shadow-lg p-6 w-80 sm:w-full max-w-sm text-center">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Confirm Logout</h2>
                <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsLogoutConfirmOpen(false)}
                    className="px-4 py-2 rounded-sm border text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsLogoutConfirmOpen(false);
                      handleLogout(); // Your logout function
                    }}
                    className="px-4 py-2 rounded-sm bg-red-600 text-white hover:bg-red-700"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Information */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-sm p-0 md:p-6 ">
                <div className="flex flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-3">
                  <div>
                    <h2 className="text-xl font-medium uppercase text-red-500 mb-1">Profile</h2>
                    <p className="text-sm text-gray-500">Basic information about your account</p>
                  </div>
                  <button
                    onClick={() => setIsProfileEditOpen(true)}
                    className="px-0 py-2 text-sm rounded-sm text-red-500 hover:text-black transition"
                  >
                    <FaEdit size={22} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 gap-y-5 gap-x-8 ">
                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Full Name</label>
                    <p className="text-base font-medium text-gray-800">{form.name || "—"}</p>
                  </div>

                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Email</label>
                    <p className="text-base font-medium text-gray-800">{form.email || "—"}</p>
                  </div>

                  <div>
                    <label className="block text-gray-500 text-sm mb-1">Phone</label>
                    <p className="text-base font-medium text-gray-800">{form.phone || "—"}</p>
                  </div>

                  {/* Optional: Future additional info */}
                  {/* <div>
      <label className="block text-gray-500 text-sm mb-1">Gender</label>
      <p className="text-base font-medium text-gray-800">Male</p>
    </div> */}
                </div>
              </div>

            )}

            {/* Edit Profile Modal */}
            {isProfileEditOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-md shadow-xl w-full max-w-md">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Edit Profile</h3>
                      <button
                        onClick={() => setIsProfileEditOpen(false)}
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
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={form.email}
                          readOnly
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-2 border rounded-md focus:ring-red-500 focus:border-red-500 opacity-65"
                        />
                      </div>
                      {/*<div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div> */}
                      {/* <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div> */}
                      <div className="flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsProfileEditOpen(false)}
                          className="px-4 py-2 border rounded-sm bg-black text-white hover:bg-white hover:text-black"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-red-600 text-white rounded-sm hover:bg-red-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-sm p-0 sm:p-6">
                <h2 className="text-xl font-medium text-red-500 mb-6 uppercase">My Orders</h2>

                <div className="space-y-6">
                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center p-6 rounded-md ">
                      <Image
                        src={emptyOrders}
                        alt="Profile"
                        width={120}    // or your desired size
                        height={120}
                        className="object-cover mb-5"
                      />
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">No Orders Yet</h3>
                      <p className="text-gray-500 text-sm mb-4">
                        Looks like you haven't placed any orders yet. Start shopping now!
                      </p>
                      <a
                        href="/shop"
                        className="inline-block bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition"
                      >
                        Go to Shop
                      </a>
                    </div>
                  ) : (
                    orders.map((order) => {
                      const firstItem = order.items[0];
                      const extraItems = order.items.length - 1;

                      return (
                        <div
                          key={order.id}
                          className="rounded-lg border border-gray-200 p-5 hover:shadow-md transition space-y-4"
                        >
                          {/* Status and Date */}
                          <div className="flex items-center justify-start gap-3">
                            <span className={`inline-block px-3 py-1 text-xs rounded-sm font-medium
                              ${order.status === "Delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}>
                              &bull; {order.status}
                            </span>
                            <span className="text-gray-400">|</span>
                            <p className="text-sm text-gray-500 mt-[5px]">
                              {new Date(order.created_at).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>

                          {/* Product Info Row */}
                          <div className="flex gap-4 items-start">
                            {/* Product Image */}
                            <div className="relative">
                              <Image
                                src={firstItem.product_image}
                                alt={firstItem.product_name}
                                width={64}
                                height={64}
                                className="rounded-md border object-cover"
                              />
                              {extraItems > 0 && (
                                <span className="absolute -bottom-1 -right-1 bg-black text-white text-[10px] px-1 py-[1px] rounded">
                                  +{extraItems}
                                </span>
                              )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-col justify-between gap-1">
                              <p className="text-sm text-black font-medium ">Order ID: <span className="text-red-500 font-medium">{order.order_id}</span></p>
                              <p className="text-sm text-gray-700 font-medium">
                                {firstItem.product_name}
                                {extraItems > 0 && (
                                  <span className="text-gray-500 font-normal"> + {extraItems} more item{extraItems > 1 ? "s" : ""}</span>
                                )}
                              </p>
                              <h6 className="text-base font-medium text-gray-900">₹{order.total_price}</h6>
                            </div>
                          </div>

                          {/* View Details Button */}
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                              className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
                            >
                              {expandedOrderId === order.id ? (
                                <>
                                  Hide Details
                                  <ChevronUp size={16} />
                                </>
                              ) : (
                                <>
                                  View Details
                                  <ChevronDown size={16} />
                                </>
                              )}
                            </button>
                          </div>

                          {/* Expand Details */}
                          {expandedOrderId === order.id && (
                            <div className="mt-4 border-t pt-4 space-y-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                  <Image
                                    src={item.product_image}
                                    alt={item.product_name}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover border"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{item.product_name}</p>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })


                  )}
                </div>
              </div>
            )}


            {activeTab === "addresses" && (
              <div className="bg-white rounded-sm p-0 sm:p-6 ">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium uppercase text-red-500">Saved Addresses</h2>
                  <button
                    onClick={() => setIsAddOpen(true)}
                    className="px-3 py-2 text-red-500 text-sm font-medium"
                  >
                    <IoIosAddCircle size={26} />
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <p className="text-gray-500 text-sm">You haven't added any addresses yet.</p>
                ) : (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="relative border rounded-sm p-5 hover:shadow-md transition bg-white"
                      >
                        {/* Default badge */}
                        {addr.is_default && (
                          <span className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-sm font-medium">
                            &bull; Default
                          </span>
                        )}

                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-gray-800">{addr.full_name}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {addr.street_address},<br />
                            {addr.city}, {addr.state} - {addr.postal_code},<br />
                            {addr.country}
                          </p>
                          <p className="text-gray-500 text-sm">Phone: {addr.phone_number}</p>
                        </div>

                        <div className="flex justify-between items-center mt-4 flex-wrap">
                          {/* Left side: Edit + (Delete if not default) */}
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setEditAddress(addr.id);
                                setEditForm({ ...addr });
                                setIsAddressEditOpen(true);
                              }}
                              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              <FilePenLine size={18} />
                            </button>

                            {!addr.is_default && (
                              <button
                                onClick={() => setDeleteConfirmId(addr.id)}
                                className="text-sm text-red-600 hover:text-red-800 font-medium"
                              >
                                <Trash size={18} />
                              </button>
                            )}
                          </div>

                          {/* Right side: Set as Default */}
                          {!addr.is_default && (
                            <button
                              onClick={() => handleSetAsDefault(addr.id)}
                              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {deleteConfirmId && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                  <p className="text-gray-800 mb-4">Are you sure you want to delete this address?</p>
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 text-sm border text-gray-600 hover:text-gray-800"
                      onClick={() => setDeleteConfirmId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => {
                        handleDeleteAddress(deleteConfirmId);
                        setDeleteConfirmId(null);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isAddOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-auto overflow-y-auto max-h-[90vh]">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-normal text-red-500 uppercase" >Add New Address</h3>
                      <button onClick={() => setIsAddOpen(false)} className="text-gray-400 hover:text-gray-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddAddress();
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {Object.entries(newAddress)
                        .filter(([key]) => !["id", "created_at", "updated_at", "user", "is_default"].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                              {key.replace(/_/g, " ")}
                            </label>
                            <input
                              value={value}
                              onChange={(e) => setNewAddress({ ...newAddress, [key]: e.target.value })}
                              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        ))}

                      {/* ✅ Set as Default checkbox */}
                      <div className="col-span-full flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="is_default"
                          checked={newAddress.is_default}
                          onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="is_default" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>

                      <div className="col-span-full flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsAddOpen(false)}
                          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            )}

            {isAddressEditOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-xl mx-auto overflow-y-auto max-h-[90vh]">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-normal text-red-500 uppercase">Edit Address</h3>
                      <button
                        onClick={() => setIsAddressEditOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdateAddress();
                      }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {Object.entries(editForm)
                        .filter(([key]) => !["id", "created_at", "updated_at", "user", "is_default"].includes(key))
                        .map(([key, value]) => (
                          <div key={key} className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                              {key.replace(/_/g, " ")}
                            </label>
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                              required
                            />
                          </div>
                        ))}

                      {/* ✅ Set as Default checkbox */}
                      <div className="col-span-full flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="is_default_edit"
                          checked={editForm.is_default}
                          onChange={(e) => setEditForm({ ...editForm, is_default: e.target.checked })}
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="is_default_edit" className="text-sm text-gray-700">
                          Set as default address
                        </label>
                      </div>

                      <div className="col-span-full flex justify-end gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setIsAddressEditOpen(false)}
                          className="px-4 py-2 border rounded-sm text-gray-700 hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
                        >
                          Update Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}




            {/* Wishlist */}
            {activeTab === "wishlist" && (
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="px-0 pb-6 sm:p-6">
                  <h2 className="text-xl font-medium uppercase text-red-500">Wishlist</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 px-0 sm:px-6">
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
                        {/* <p className="text-sm text-gray-500 mb-1">Size: {item.size} | Color: {item.color}</p> */}
                        <div className="flex justify-between items-center">
                          <span className="font-normal text-red-500">₹{item.product_detail.price}</span>
                          <div className="flex gap-0">
                            {/* Wishlist or cart icons */}
                            <button className="p-2 text-red-500 hover:text-red-600" title="Remove">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              className="p-2 text-gray-500 hover:text-indigo-600"
                              title="View Product"
                              onClick={() => router.push(`/product/${item.product_detail.id}`)} // or use slug if available
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-5 w-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                />
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


    </div>
  );
};

export default Profile;

// pages/profile.jsx
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
    props: {}, // can pass token or other data
  };
}
