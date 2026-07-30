"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { initGSAP, setupMagneticEffect, splitTextIntoWords } from "../lib/gsap";

const slides = [
  {
    id: 1,
    image: "/images/home/hero-1.png",
    subtitle: "LAST MAN ON EARTH // DROP 01",
    heading: "MINIMAL MEETS BOLD",
    description: "Post-apocalyptic oversized fits engineered for high velocity and street rebellion.",
    cta: "Shop Drop",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/home/hero-2.png",
    subtitle: "MOTORSPORT LIVERY // COLLECTION",
    heading: "ELEVATE YOUR EVERYDAY LOOK",
    description: "Heavyweight cotton, raw edges, and kinetic graphics built to outlast the storm.",
    cta: "Explore Fits",
    link: "/shop",
  },
  {
    id: 3,
    image: "/images/home/hero-3.png",
    subtitle: "SURVIVAL GEAR // LIMITED",
    heading: "CRAFTED FOR COMFORT & GRIT",
    description: "Premium oversized silhouettes. Designed in the shadows, worn in the light.",
    cta: "View Catalog",
    link: "/shop",
  },
];

const AUTOPLAY_DURATION = 6; // seconds

export default function HomeHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const headlineRef = useRef(null);
  const buttonRef = useRef(null);
  const progressRef = useRef(null);
  const timerRef = useRef(null);

  // Magnetic Button Effect
  useEffect(() => {
    if (!buttonRef.current) return;
    const cleanup = setupMagneticEffect(buttonRef.current, 0.4);
    return cleanup;
  }, [currentIndex]);

  // GSAP Animations on slide change & Parallax scrub on scroll
  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP();

    // Headline Word Split Reveal Animation
    if (headlineRef.current) {
      const wordSpans = splitTextIntoWords(headlineRef.current);
      gsap.fromTo(
        wordSpans,
        { yPercent: 120, opacity: 0, rotate: 3 },
        { yPercent: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "power3.out", stagger: 0.05 }
      );
    }

    // Background Layer Parallax Effect on Scroll
    if (heroRef.current && bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Progress Bar Animation
    if (progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: AUTOPLAY_DURATION, ease: "linear" }
      );
    }

    // Autoplay Timer
    timerRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DURATION * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  const handleNext = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const activeSlide = slides[currentIndex];

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black text-white grain-overlay flex items-center"
    >
      {/* Background Parallax & Ken Burns Zoom Layer */}
      <div ref={bgRef} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <Image
          src={activeSlide.image}
          alt={activeSlide.heading}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 scale-105 transition-transform duration-[8000ms] ease-out hover:scale-110"
        />
        {/* Dark Editorial Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 container mx-auto px-6 sm:px-14 lg:px-20 max-w-7xl">
        <div className="max-w-3xl">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600/90 text-white text-[11px] font-extrabold uppercase tracking-widest mb-6 glow-chip-red">
            <span>{activeSlide.subtitle}</span>
          </div>

          {/* Animated Headline */}
          <h1
            ref={headlineRef}
            className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6 text-white"
          >
            {activeSlide.heading}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-neutral-300 font-medium mb-10 max-w-xl leading-relaxed">
            {activeSlide.description}
          </p>

          {/* Magnetic CTA Button */}
          <div className="flex items-center space-x-6">
            <Link href={activeSlide.link}>
              <div
                ref={buttonRef}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-extrabold uppercase tracking-widest text-sm overflow-hidden shadow-2xl transition duration-300 hover:bg-red-700"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>{activeSlide.cta}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Controls & Progress Bar */}
      <div className="absolute bottom-8 left-6 sm:left-14 right-6 sm:right-14 z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Animated Progress Bar */}
        <div className="w-full sm:w-1/3 bg-neutral-800/80 h-[3px] relative overflow-hidden">
          <div ref={progressRef} className="h-full bg-red-500 w-0" />
        </div>

        {/* Slide Counter & Arrows */}
        <div className="flex items-center space-x-6 justify-between sm:justify-end">
          <div className="text-xs font-mono tracking-widest text-neutral-400">
            <span className="text-white font-bold">0{currentIndex + 1}</span> / 0{slides.length}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="p-3 bg-neutral-900/80 border border-neutral-800 text-white hover:bg-red-600 hover:border-red-600 transition duration-300"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-neutral-900/80 border border-neutral-800 text-white hover:bg-red-600 hover:border-red-600 transition duration-300"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
