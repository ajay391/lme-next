"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Heart, Instagram, Twitter, Facebook, User, Menu, X } from "lucide-react";
import { login, logout } from "../store/authSlice";
import { useRouter } from "next/router";
import { fetchWishlist } from "../store/wishlistSlice";
import { gsap, initGSAP } from "../lib/gsap";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const profileRef = useRef(null);
  const logoRef = useRef(null);
  const cartIconRef = useRef(null);
  const prevCartCount = useRef(0);

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

  // GSAP Logo Load Pulse & Scroll Listener
  useEffect(() => {
    if (!isMounted) return;
    initGSAP();

    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, rotate: -8, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
    }

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // GSAP Cart Bounce
  useEffect(() => {
    if (!isMounted || !cartIconRef.current) return;
    if (cartItemCount > prevCartCount.current) {
      gsap.fromTo(
        cartIconRef.current,
        { scale: 1 },
        { scale: 1.4, duration: 0.3, ease: "back.out(3.5)", yoyo: true, repeat: 1 }
      );
    }
    prevCartCount.current = cartItemCount;
  }, [cartItemCount, isMounted]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
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
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className="bg-black text-xs text-neutral-300 px-4 sm:px-14 py-2 border-b border-neutral-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <a href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-red-500 transition">
              <Twitter className="w-4 h-4" />
            </a>
          </div>

          <div className="hidden sm:block text-center uppercase tracking-widest text-[11px] font-bold text-red-500">
            Free Express Shipping Nationwide — Post-Apocalyptic Streetwear
          </div>

          <div className="flex space-x-6 items-center uppercase tracking-wider text-[11px]">
            <Link href="/contact" className="hover:text-red-500 transition">Contact</Link>
            <Link href="/faqs" className="hover:text-red-500 transition">FAQs</Link>
            <Link href="/support" className="hover:text-red-500 transition">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar: Transparent on Hero, Crisp White on Scroll */}
      <nav
        className={`w-full px-4 sm:px-14 py-4 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-neutral-200 text-black shadow-md shadow-black/5"
            : "bg-black/90 backdrop-blur-md border-white/10 text-white shadow-xl shadow-black/40"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-3 z-10" ref={logoRef}>
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-10 h-10 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="LME Logo"
                  width={40}
                  height={40}
                  className="object-contain group-hover:scale-110 transition duration-300"
                />
              </div>
              <span className={`font-extrabold text-lg tracking-wider uppercase transition ${isScrolled ? "text-black group-hover:text-red-600" : "text-white group-hover:text-red-500"}`}>
                Last Man On Earth
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 z-10 font-bold uppercase text-sm tracking-wider">
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "DesignMyTee", path: "/designmytee" },
              { label: "About Us", path: "/about-us" },
            ].map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative py-1 group transition ${isScrolled ? "text-neutral-800 hover:text-black" : "text-neutral-200 hover:text-white"}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-300 ease-out" />
              </Link>
            ))}

            {/* Wishlist */}
            <Link href="/wishlist" className={`relative group p-1 transition ${isScrolled ? "text-neutral-800 hover:text-red-600" : "text-neutral-200 hover:text-red-500"}`}>
              <Heart className="w-5 h-5 group-hover:scale-110 transition duration-200" />
              {authState.isAuthenticated && wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] font-extrabold bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className={`relative group p-1 transition ${isScrolled ? "text-neutral-800 hover:text-red-600" : "text-neutral-200 hover:text-red-500"}`}>
              <div ref={cartIconRef}>
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition duration-200" />
              </div>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] font-extrabold bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative flex items-center" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((prev) => !prev)}
                className={`transition focus:outline-none p-1 ${isScrolled ? "text-neutral-800 hover:text-red-600" : "text-neutral-200 hover:text-red-500"}`}
                aria-label="Profile Menu"
              >
                <User className="w-5 h-5" />
              </button>

              {isProfileOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-2xl rounded-none w-44 p-2 border border-neutral-200 z-50 animate-in fade-in slide-in-from-top-2">
                  {authState.isAuthenticated ? (
                    <>
                      <Link
                        href="/profile"
                        className="block text-neutral-800 hover:bg-red-600 hover:text-white px-4 py-2 text-xs uppercase tracking-widest transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => setIsLogoutConfirmOpen(true)}
                        className="w-full text-left text-neutral-800 hover:bg-red-600 hover:text-white px-4 py-2 text-xs uppercase tracking-widest transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block text-neutral-800 hover:bg-red-600 hover:text-white px-4 py-2 text-xs uppercase tracking-widest transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/wishlist" className="relative p-1">
              <Heart className={`w-5 h-5 ${isScrolled ? "text-black" : "text-white"}`} />
              {authState.isAuthenticated && wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-1">
              <ShoppingCart className={`w-5 h-5 ${isScrolled ? "text-black" : "text-white"}`} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMobileMenu} className={`transition p-1 ${isScrolled ? "text-black hover:text-red-600" : "text-white hover:text-red-500"}`}>
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        <div
          className={`absolute left-0 right-0 bg-white border-b border-neutral-200 z-40 transition-all duration-300 ease-in-out overflow-hidden uppercase ${
            isMobileMenuOpen ? "max-h-[500px] opacity-100 py-4 shadow-xl" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <nav className="flex flex-col items-start px-6 gap-2 md:hidden tracking-wider text-sm font-bold">
            <Link href="/" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
              Home
            </Link>
            <Link href="/shop" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
              Shop
            </Link>
            <Link href="/designmytee" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600 flex items-center justify-between">
              <span>DesignMyTee</span>
              <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded font-mono font-bold">CUSTOM</span>
            </Link>
            <Link href="/about-us" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
              About Us
            </Link>
            <Link href="/wishlist" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
              Wishlist
            </Link>
            <Link href="/cart" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
              Cart
            </Link>

            {authState.isAuthenticated ? (
              <>
                <Link href="/profile" onClick={toggleMobileMenu} className="w-full py-3 border-b border-neutral-200 text-neutral-800 hover:text-red-600">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    toggleMobileMenu();
                    setIsLogoutConfirmOpen(true);
                  }}
                  className="w-full text-left py-3 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={toggleMobileMenu} className="w-full py-3 text-red-600 hover:text-red-700">
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Logout Modal */}
        {isLogoutConfirmOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white border border-neutral-200 p-6 w-80 max-w-sm text-center shadow-2xl">
              <h2 className="text-lg font-extrabold text-black uppercase mb-2">Confirm Logout</h2>
              <p className="text-neutral-600 text-xs mb-6">Are you sure you want to log out of your session?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsLogoutConfirmOpen(false)}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs uppercase tracking-wider font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsLogoutConfirmOpen(false);
                    handleLogout();
                  }}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 text-xs uppercase tracking-wider font-bold"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default memo(Navbar);
