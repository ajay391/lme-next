"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Star, Flame, ShoppingCart, Zap, ArrowRight } from "lucide-react";
import ProductShowcase from "./ProductShowcase";
import { initGSAP, setupMagneticEffect } from "../lib/gsap";

const sizes = ["S", "M", "L", "XL", "XXL"];

export default function WeeklyDrop() {
  const [selectedSize, setSelectedSize] = useState("L");
  const [isAdding, setIsAdding] = useState(false);
  const sectionRef = useRef(null);
  const stockBarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const { gsap } = initGSAP();

    if (stockBarRef.current) {
      gsap.fromTo(
        stockBarRef.current,
        { width: "0%" },
        {
          width: "92%",
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stockBarRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (buttonRef.current) {
      const cleanup = setupMagneticEffect(buttonRef.current, 0.4);
      return cleanup;
    }
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);
    toast.success(`Nightfall Hoodie (Size ${selectedSize}) added to cart!`);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-3 sm:px-14 bg-neutral-950 text-white grain-overlay border-b border-neutral-900 overflow-hidden relative"
    >
      {/* Ambient Red Radial Backdrop Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Showcase */}
          <div className="lg:col-span-6">
            <ProductShowcase />
          </div>

          {/* Right Column Product Details */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 bg-neutral-900/60 border border-neutral-800 p-4 sm:p-8 md:p-12 shadow-2xl backdrop-blur-md">
            {/* Chip & Ratings */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                <Flame className="w-3.5 h-3.5" />
                <span>LIMITED DROP FEATURE</span>
              </div>

              <div className="flex items-center space-x-2 text-xs font-mono text-neutral-300">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold">4.9</span>
                <span className="text-neutral-500">(128 Reviews)</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
                Nightfall Oversized Hoodie
              </h2>
              <span className="text-xs font-mono text-red-500 font-extrabold uppercase tracking-widest block mt-2">
                // MOTORSPORT LIVERY SERIES 01
              </span>
            </div>

            {/* Pricing Row */}
            <div className="flex items-center space-x-4 pt-2 border-t border-neutral-800">
              <span className="text-3xl sm:text-4xl font-black text-white">
                ₹2,499
              </span>
              <span className="text-base text-neutral-500 line-through font-mono">
                ₹3,499
              </span>
              <span className="px-2.5 py-1 bg-red-600/20 border border-red-600/40 text-red-500 text-[10px] font-mono font-extrabold uppercase tracking-widest">
                28% OFF
              </span>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-medium">
              Engineered with 450GSM ultra-heavyweight combed French Terry cotton, double-layered structure hood, custom metal hardware, and reflective back graphic print.
            </p>

            {/* Stock Urgency Bar */}
            <div className="space-y-2 py-2">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs font-mono text-neutral-300 gap-1">
                <span className="flex items-center space-x-1.5 text-red-500 font-bold text-[11px] sm:text-xs">
                  <Zap className="w-3.5 h-3.5 fill-current shrink-0" />
                  <span>URGENCY: ONLY 14 LEFT IN STOCK</span>
                </span>
                <span className="text-neutral-400 font-bold text-[11px] sm:text-xs">92% ALLOCATED</span>
              </div>
              <div className="w-full h-2.5 bg-neutral-950 border border-neutral-800 overflow-hidden relative">
                <div
                  ref={stockBarRef}
                  className="h-full bg-gradient-to-r from-red-700 to-red-500 relative"
                  style={{ width: "92%" }}
                />
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white font-extrabold uppercase tracking-wider">SELECT SIZE:</span>
                <span className="text-neutral-400 underline cursor-pointer hover:text-white">SIZE GUIDE</span>
              </div>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2.5 sm:py-3 text-xs font-black font-mono uppercase tracking-wider sm:tracking-widest border transition-all duration-200 ${
                      selectedSize === sz
                        ? "bg-red-600 border-red-600 text-white shadow-lg scale-105"
                        : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Feature Badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-2 text-[9px] sm:text-[10px] font-mono text-neutral-400 text-center">
              <div className="p-2 sm:p-2.5 bg-neutral-950 border border-neutral-800">
                <span className="text-white font-bold block">450 GSM</span> French Terry
              </div>
              <div className="p-2 sm:p-2.5 bg-neutral-950 border border-neutral-800">
                <span className="text-white font-bold block">REFLECTIVE</span> Back Print
              </div>
              <div className="p-2 sm:p-2.5 bg-neutral-950 border border-neutral-800">
                <span className="text-white font-bold block">OVERSIZED</span> Street Cut
              </div>
            </div>

            {/* Magnetic CTA Add To Cart Button */}
            <div className="pt-4">
              <button
                ref={buttonRef}
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 sm:py-5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider sm:tracking-widest flex items-center justify-center space-x-2 sm:space-x-3 transition duration-300 shadow-2xl"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span className="truncate">{isAdding ? "ADDING TO CART..." : `SECURE YOUR FIT — ₹2,499 (${selectedSize})`}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
