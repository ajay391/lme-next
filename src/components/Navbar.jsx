"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart, Instagram, Twitter, Facebook, User, Menu, X } from "lucide-react";
import { IoPersonOutline } from "react-icons/io5";
// import logo from "../../public/images/logo.png";
// import profile from "../../public/images/profile.png";
import { login, logout } from "../store/authSlice";
import { useRouter } from "next/router";
import { fetchWishlist } from "../store/wishlistSlice";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const authState = useSelector((state) => state.auth);
  const cartItemCount = useSelector((state) => state.cart.items.length);
  const wishlistItemCount = useSelector((state) => state.wishlist.items.length);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [authState.isAuthenticated, dispatch]);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      dispatch(logout());
    }
  }, [authState.isAuthenticated, dispatch]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false); // Close only if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isMounted) return null;

  return (
    <>

      <div className="bg-black text-sm text-gray-400 px-3 sm:px-14 md:px-14 lg:px-14 xl:px-14 py-2 border-b">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Icons */}
          <div className="flex space-x-4 items-center">
            <a href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv" target="_blank" className="hover:text-red-500"> <Instagram className="w-5 h-5 hover:text-white transition" /></a>
            <a href="#" className="hover:text-red-500"><Facebook className="w-5 h-5 hover:text-white transition" /></a>
            <a href="#" className="hover:text-red-500"> <Twitter className="w-5 h-5 hover:text-white transition" /></a>
          </div>

          {/* Right Links */}
          <div className="flex space-x-6 items-center">
            <Link href="/contact" className="hover:text-red-500">Contact</Link>
            <Link href="/faqs" className="hover:text-red-500">FAQs</Link>
            <Link href="/support" className="hover:text-red-500">Support</Link>
          </div>
        </div>
      </div>
      <nav className="bg-white px-3 sm:px-14 md:px-14 lg:px-14 xl:px-14 py-4 border-b shadow-none sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between relative">
          {/* Left: Logo */}
          <div className="text-gray-800 font-bold text-lg z-10">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={45} height={45} className="object-contain" />
              {/* <h3 className="text-red-500">LAST MAN ON EARTH</h3> */}
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="hidden md:flex items-center space-x-6 z-10">
            <Link href="/" className="text-lg text-gray-800 hover:text-red-500">Home</Link>
            <Link href="/shop" className="text-lg text-gray-800 hover:text-red-500">Shop</Link>
            <Link href="/about-us" className="text-lg text-gray-800 hover:text-red-500">About Us</Link>

            {/* Wishlist */}
            <Link href="/wishlist">
              <div className="relative flex items-center text-gray-800 hover:text-red-500">
                <Heart className="w-5 h-5" />
                {authState.isAuthenticated && wishlistItemCount > 0 && (
                  <span className="absolute top-[-5px] right-[-10px] text-[10px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <div className="relative flex items-center text-gray-800 hover:text-red-500">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-[-5px] right-[-10px] text-[10px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Profile */}
            <div className="relative flex" ref={profileRef}>
              <button onClick={() => setIsProfileOpen((prev) => !prev)}>
                {/* <Image
                  src="/images/profile.png"
                  width="100"
                  height="100"
                  alt="Profile"
                  className="w-8 h-8 rounded-full hover:border-red-500 transition"
                /> */}
                <User className="w-5 h-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-40 p-2 border border-gray-200 z-50">
                  {authState.isAuthenticated ? (
                    <>
                      <Link
                        href="/profile"
                        className="block text-gray-800 rounded-sm hover:bg-red-100 hover:text-red-500 px-4 py-2"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => setIsLogoutConfirmOpen(true)}
                        className="w-full text-left text-gray-800 rounded-sm hover:bg-red-100 hover:text-red-500 px-4 py-2"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block text-gray-800 hover:text-red-500 px-4 py-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center space-x-4 text-gray-800">
            <Link href="/wishlist">
              <div className="relative flex items-center text-gray-800 hover:text-red-500">
                <Heart className="w-5 h-5" />
                {authState.isAuthenticated && wishlistItemCount > 0 && (
                  <span className="absolute top-[-5px] right-[-10px] text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/cart">
              <div className="relative flex items-center text-gray-800 hover:text-red-500">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute top-[-5px] right-[-10px] text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
            <button onClick={toggleMobileMenu} className="text-gray-800 hover:text-red-500 transition md:hidden">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}

        {/* Mobile Slide-Down Menu */}
        <div
          className={`absolute left-0 right-0 bg-white shadow-md z-40 transition-all duration-300 ease-in-out overflow-hidden uppercase ${isMobileMenuOpen ? 'max-h-[500px] opacity-100 translate-y-4' : 'max-h-0 opacity-0 -translate-y-2'
            }`}
        >
          <nav className="flex flex-col items-start gap-0 md:hidden">
            <Link
              href="/"
              onClick={toggleMobileMenu}
              className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={toggleMobileMenu}
              className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
            >
              Shop
            </Link>
            <Link
              href="/about-us"
              onClick={toggleMobileMenu}
              className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
            >
              About Us
            </Link>
            <Link
              href="/wishlist"
              onClick={toggleMobileMenu}
              className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
            >
              Wishlist
            </Link>
            <Link
              href="/cart"
              onClick={toggleMobileMenu}
              className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
            >
              Cart
            </Link>

            {authState.isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  onClick={toggleMobileMenu}
                  className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    setIsLogoutConfirmOpen(true);
                  }}
                  className="block w-full px-3 border-t py-4 text-start text-red-600 hover:text-red-700 transition font-medium uppercase"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={toggleMobileMenu}
                className="block w-full px-3 border-t py-4 text-gray-800 hover:text-red-600 transition font-medium uppercase"
              >
                Login
              </Link>
            )}
          </nav>
        </div>


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


      </nav>
    </>
  );
};

export default memo(Navbar);
