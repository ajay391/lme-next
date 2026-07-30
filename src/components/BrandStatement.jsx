"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { initGSAP, setupMagneticEffect } from "../lib/gsap";

export default function BrandStatement() {
  const sectionRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const { gsap } = initGSAP();

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current].filter(Boolean);

    if (sectionRef.current && lines.length > 0) {
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (buttonRef.current) {
      const cleanup = setupMagneticEffect(buttonRef.current, 0.4);
      return cleanup;
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 px-4 sm:px-14 bg-white text-black border-b border-neutral-200 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Line-by-line Manifesto Lines */}
          <div className="lg:col-span-7">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold mb-4 block">
              // BRAND MANIFESTO
            </span>
            <div className="space-y-2">
              <h2
                ref={line1Ref}
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-black"
              >
                Wear The Movement.
              </h2>
              <h2
                ref={line2Ref}
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-red-600"
              >
                Break The Mold.
              </h2>
              <h2
                ref={line3Ref}
                className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-neutral-400"
              >
                Survive The Norm.
              </h2>
            </div>
          </div>

          {/* Right Column: Copy & Magnetic CTA */}
          <div className="lg:col-span-5 bg-neutral-50 border border-neutral-200 p-8 sm:p-12 shadow-sm">
            <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
              Forged in the concrete jungles where style meets substance, we are more than apparel — we are armor for the urban warrior. Drawing from the rhythm of subway trains, back-alley art, and motorsport grit, we design for those who write their own rules.
            </p>
            <p className="text-neutral-600 text-sm leading-relaxed mb-8">
              Heavyweight hoodies, statement tees, and silhouettes that command attention. This isn’t just fashion; it’s a revolution stitched in cotton and canvas.
            </p>

            <Link href="/shop" className="inline-block">
              <div
                ref={buttonRef}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-black text-white font-extrabold uppercase tracking-widest text-xs overflow-hidden shadow-xl transition duration-300 hover:bg-red-600"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}