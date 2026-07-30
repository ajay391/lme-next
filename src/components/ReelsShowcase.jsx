"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import c3 from "../../public/images/products/c3.jpg";
import c4 from "../../public/images/products/c4.png";
import c5 from "../../public/images/products/c5.png";
import c6 from "../../public/images/products/c6.png";
import c7 from "../../public/images/products/c7.png";
import c8 from "../../public/images/products/c8.png";
import c9 from "../../public/images/products/c9.png";
import { initGSAP } from "../lib/gsap";

const reelsData = [
  { image: c6, title: "Redline Series // Drop 01" },
  { image: c5, title: "Slipstream Livery" },
  { image: c4, title: "Blackout Grid" },
  { image: c3, title: "Trackside Underground" },
  { image: c7, title: "Livery Line Cut" },
  { image: c8, title: "Overtake High Voltage" },
  { image: c9, title: "Ghost Driver Silhouette" },
];

export default function ReelsShowcase() {
  const marqueeTrackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const { gsap } = initGSAP();

    // GSAP Infinite Horizontal Marquee Loop
    if (marqueeTrackRef.current) {
      const track = marqueeTrackRef.current;
      const totalWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: `-=${totalWidth}`,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
        },
      });
    }

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    if (tweenRef.current) tweenRef.current.timeScale(0.3);
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) tweenRef.current.timeScale(1);
  };

  return (
    <section className="py-24 bg-black text-white grain-overlay overflow-hidden border-b border-neutral-900">
      <div className="container mx-auto px-4 sm:px-14 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <span className="text-xs font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-2">
            // INSTAGRAM REELS SHOWCASE
          </span>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white">
            Straight From The Feed
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-lg">
            Watch it. Wear it. Live the movement before it hits the streets.
          </p>
        </div>

        <a
          href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center space-x-3 px-6 py-3 bg-neutral-900 border border-neutral-800 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition duration-300 shadow-xl"
        >
          <Instagram className="w-4 h-4 text-red-500 group-hover:text-white transition" />
          <span>Follow @lastmanonearth.in</span>
        </a>
      </div>

      {/* Marquee Container */}
      <div
        className="w-full overflow-hidden relative cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={marqueeTrackRef} className="flex space-x-6 w-max py-4">
          {/* Double the array for seamless infinite looping */}
          {[...reelsData, ...reelsData].map((reel, idx) => (
            <div
              key={idx}
              className="group relative w-[240px] sm:w-[280px] aspect-[9/16] bg-neutral-900 border border-neutral-900 overflow-hidden flex-shrink-0 transition-transform duration-500 hover:scale-105 hover:border-red-600 shadow-2xl"
            >
              <Image
                src={reel.image}
                alt={reel.title}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Center Play Icon Hover Reveal */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Reel Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 z-10">
                <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-wider block mb-1">
                  REEL DROP
                </span>
                <h3 className="text-sm font-extrabold uppercase text-white truncate">
                  {reel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
