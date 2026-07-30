"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styleOne from "../../public/images/home/style-1.png";
import styleTwo from "../../public/images/home/style-2.png";
import { initGSAP } from "../lib/gsap";

export default function StyleBanner() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const leftColRef = useRef(null);
  const rightBoxRef = useRef(null);
  const redPanelRef = useRef(null);
  const photoPanelRef = useRef(null);
  const copyRef = useRef(null);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP();

    // 1. Headline Color Animates (Black -> Signature Red)
    if (headlineRef.current) {
      gsap.to(headlineRef.current, {
        color: "#DC2626",
        ease: "power2.out",
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      });
    }

    // 2. Sliding Entrance for Grid 1
    if (leftColRef.current && rightBoxRef.current) {
      gsap.fromTo(
        leftColRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        rightBoxRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightBoxRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // 3. Red Panel Slide-in & Photo Scale
    if (redPanelRef.current) {
      gsap.fromTo(
        redPanelRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: redPanelRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (photoPanelRef.current) {
      gsap.fromTo(
        photoPanelRef.current,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: photoPanelRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    if (copyRef.current) {
      gsap.fromTo(
        copyRef.current,
        { filter: "blur(8px)", opacity: 0 },
        {
          filter: "blur(0px)",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: copyRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-14 bg-neutral-50 text-black border-b border-neutral-200 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="max-w-4xl text-start pb-16 border-b border-neutral-200">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 block">
            // EDITORIAL DROP CONCEPT
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-tight text-black">
            Redefine Survival Style with <br />
            <span ref={headlineRef} className="text-black transition-colors">
              Last Man on Earth
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg mt-6 max-w-2xl leading-relaxed font-medium">
            Born from resilience, designed for rebellion — our pieces speak louder than trends. With bold silhouettes and statement designs, Last Man on Earth outfits you for a future unknown.
          </p>
        </div>

        {/* Grid Row 1: Image Left + Black Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-12 items-stretch">
          <div ref={leftColRef} className="lg:col-span-8 relative min-h-[400px] lg:min-h-[500px] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
            <Image
              src={styleOne}
              alt="Gear for the End of the World"
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div ref={rightBoxRef} className="lg:col-span-4 bg-black text-white p-8 sm:p-12 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-4">
                [ EDITORIAL // 01 ]
              </span>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
                Gear for the End of the World
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                Inspired by dystopian grit and street survival, our collection is crafted for those who lead, not follow. Be the story that survives.
              </p>
            </div>

            <Link href="/shop" className="group inline-flex items-center space-x-4">
              <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
                <ArrowUpRight className="w-6 h-6 animate-spin group-hover:[animation-duration:1s]" style={{ animationDuration: "8s" }} />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-neutral-200 group-hover:text-white transition">
                Explore Collection
              </span>
            </Link>
          </div>
        </div>

        {/* Grid Row 2: Red Panel Left + Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-12 items-stretch">
          <div ref={redPanelRef} className="lg:col-span-5 bg-red-600 text-white p-8 sm:p-12 flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-[10px] font-mono text-black font-extrabold uppercase tracking-widest block mb-4">
                [ EDITORIAL // 02 ]
              </span>
              <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
                Stand Alone. <br />Stand Strong.
              </h3>
              <div ref={copyRef}>
                <p className="text-white text-sm sm:text-base leading-relaxed mb-8 font-medium">
                  From oversized tees to statement hoodies, explore essentials that echo rebellion, strength, and street precision. This is survival redefined.
                </p>
              </div>
            </div>

            <Link href="/shop" className="group inline-flex items-center space-x-4">
              <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="w-6 h-6 animate-spin group-hover:[animation-duration:1s]" style={{ animationDuration: "8s" }} />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-white group-hover:text-black transition">
                Shop Statement Fits
              </span>
            </Link>
          </div>

          <div className="lg:col-span-7 relative min-h-[400px] lg:min-h-[500px] overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
            <div ref={photoPanelRef} className="relative w-full h-full">
              <Image
                src={styleTwo}
                alt="Stand Alone Stand Strong"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}