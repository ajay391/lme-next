'use client';

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart } from "lucide-react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import profile from "../../public/images/profile.png";
import { login, logout } from "@/store/authSlice";  // Import logout action
import { useRouter } from "next/router";
import { memo } from "react";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null); // Track hover state
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector((state: any) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Assuming Redux handles the authentication state, 
    // so we don't need to check the token manually anymore.
    if (!authState.isAuthenticated) {
      dispatch(logout()); // If no token or logged out, mark as logged out
    }
  }, [authState.isAuthenticated, dispatch]);

  const cartItemCount = useSelector((state: any) => state.cart.items.length);
  const wishlistItemCount = useSelector((state: any) => state.wishlist.items.length);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Logout user through Redux
    router.push("/login"); // Redirect to login page
  };

  if (!isMounted) return null;

  return (
    <nav className="bg-white p-3 py-4 border-b shadow-none sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between relative">
        {/* Left: Logo */}
        <div className="text-gray-800 font-bold text-lg z-10">
          <Link href="/">
            <Image src={logo} alt="Logo" width={40} height={40} className="object-contain" />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/" className="text-gray-800 hover:text-red-500">Home</Link>
          <Link href="/shop" className="text-gray-800 hover:text-red-500">Shop</Link>
          <Link href="/about" className="text-gray-800 hover:text-red-500">About Us</Link>
        </div>

        {/* Right: Icons */}
        <div className="hidden md:flex items-center space-x-6 z-10">
          {/* Wishlist Icon */}
          <Link href="/wishlist">
            <div className="relative flex items-center text-gray-800 hover:text-red-500">
              <Heart className="w-5 h-5" />
              {wishlistItemCount > 0 && (
                <span className="absolute top-[-5px] right-[-10px] text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </div>
          </Link>

          {/* Cart Icon */}
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

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button onClick={() => setIsProfileOpen((prev) => !prev)}>
              <Image
                src={profile}
                alt="Profile"
                className="w-8 h-8 rounded-full hover:border-red-500 transition"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-40 p-2 border border-gray-200 z-50">
                {authState.isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      className="block text-gray-800 hover:text-red-500 px-4 py-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-gray-800 hover:text-red-500 px-4 py-2"
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
              {wishlistItemCount > 0 && (
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
          <button onClick={toggleMobileMenu} className="text-2xl">☰</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center text-xl font-semibold space-y-6">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-4 right-6 text-3xl font-bold text-gray-700"
          >
            ×
          </button>
          <Link href="/" onClick={toggleMobileMenu} className="hover:text-red-500">Home</Link>
          <Link href="/shop" onClick={toggleMobileMenu} className="hover:text-red-500">Shop</Link>
          <Link href="/about" onClick={toggleMobileMenu} className="hover:text-red-500">About Us</Link>
          <Link href="/wishlist" onClick={toggleMobileMenu} className="hover:text-red-500">Wishlist</Link>
          <Link href="/cart" onClick={toggleMobileMenu} className="hover:text-red-500">Cart</Link>
          {authState.isAuthenticated ? (
            <>
              <Link href="/profile" onClick={toggleMobileMenu} className="hover:text-red-500">Profile</Link>
              <button onClick={handleLogout} className="hover:text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" onClick={toggleMobileMenu} className="hover:text-red-500">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);
