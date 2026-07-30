"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import car1 from "../../public/images/home/new-1.png";
import car2 from "../../public/images/home/new-5.png";
import car3 from "../../public/images/home/new-6.png";
import car4 from "../../public/images/home/new-4.png";
import { gsap, initGSAP } from "../lib/gsap";

const productImages = [
  { id: 1, src: car1, alt: "Nightfall Hoodie Front View" },
  { id: 2, src: car2, alt: "Nightfall Hoodie Back Print" },
  { id: 3, src: car3, alt: "Nightfall Hoodie Detail Shot" },
  { id: 4, src: car4, alt: "Nightfall Hoodie Lifestyle Fit" },
];

export default function ProductShowcase() {
  const [activeImage, setActiveImage] = useState(productImages[0]);
  const mainImageRef = useRef(null);
  const floatContainerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const { gsap } = initGSAP();

    // 1. 3s Floating Yoyo Loop for Product Cutout
    if (floatContainerRef.current) {
      gsap.to(floatContainerRef.current, {
        y: -14,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }

    // 2. Breathing Red Spotlight Glow Pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        scale: 1.15,
        opacity: 0.7,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, []);

  const handleThumbnailClick = (imgObj) => {
    if (imgObj.id === activeImage.id) return;

    if (mainImageRef.current) {
      gsap.to(mainImageRef.current, {
        opacity: 0,
        scale: 0.94,
        duration: 0.2,
        onComplete: () => {
          setActiveImage(imgObj);
          gsap.to(mainImageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    } else {
      setActiveImage(imgObj);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row items-center gap-6 w-full">
      {/* Vertical Thumbnail Rail */}
      <div className="flex md:flex-col space-x-3 md:space-x-0 md:space-y-3 z-20 overflow-x-auto md:overflow-visible py-2">
        {productImages.map((item) => {
          const isSelected = activeImage.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleThumbnailClick(item)}
              className={`relative w-16 h-16 sm:w-20 sm:h-20 aspect-square border-2 overflow-hidden transition-all duration-300 ${
                isSelected
                  ? "border-red-600 scale-105 shadow-xl shadow-red-600/30"
                  : "border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      {/* Main Product Showcase with Glowing Spotlight & Float */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-[420px] sm:min-h-[520px]">
        {/* Breathing Red Spotlight Glow */}
        <div
          ref={glowRef}
          className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-red-600/25 blur-3xl pointer-events-none z-0"
        />

        {/* Floating Product Image Container */}
        <div ref={floatContainerRef} className="relative z-10 w-full max-w-lg aspect-[4/5] rounded-none overflow-hidden shadow-2xl bg-neutral-950 border border-neutral-800">
          <div ref={mainImageRef} className="relative w-full h-full">
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
