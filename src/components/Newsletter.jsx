"use client";

import { useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import { initGSAP } from "../lib/gsap";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success
  const buttonRef = useRef(null);

  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      await axiosInstance.post("/auth/newsletter/", { email });
      setStatus("success");
      toast.success("Welcome to the Last Man on Earth Syndicate!");

      // GSAP Button morph animation
      const { gsap } = initGSAP();
      if (buttonRef.current) {
        gsap.fromTo(
          buttonRef.current,
          { scale: 0.95 },
          { scale: 1, duration: 0.4, ease: "back.out(2)" }
        );
      }

      setTimeout(() => {
        setEmail("");
        setStatus("idle");
      }, 3000);
    } catch (err) {
      setStatus("idle");
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-14 bg-red-600 text-white overflow-hidden newsletter-pattern">
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-700/80 via-red-600/90 to-red-700/80 pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Content */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>JOIN THE SYNDICATE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-tight">
              Get Early Access To Secret Drops
            </h2>

            <p className="text-neutral-100 text-sm sm:text-base font-medium opacity-90 max-w-lg">
              Subscribers receive early access 1 hour before public drop launch, exclusive discount codes, and unreleased lookbooks.
            </p>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER YOUR EMAIL..."
                  required
                  disabled={status === "loading" || status === "success"}
                  className="w-full px-5 py-4 bg-black text-white placeholder-neutral-500 text-xs font-mono tracking-wider border-2 border-transparent newsletter-input-focus focus:outline-none transition duration-300"
                />
              </div>

              <button
                ref={buttonRef}
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`px-8 py-4 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all duration-300 shadow-2xl ${
                  status === "success"
                    ? "bg-green-600 text-white"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {status === "loading" && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>SUBSCRIBING...</span>
                  </>
                )}
                {status === "success" && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>SUBSCRIBED!</span>
                  </>
                )}
                {status === "idle" && (
                  <>
                    <span>JOIN NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
