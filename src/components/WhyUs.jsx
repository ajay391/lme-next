"use client";

import { useEffect, useRef } from "react";
import { Truck, ShieldCheck, IndianRupee, Flame } from "lucide-react";
import { initGSAP } from "../lib/gsap";

const features = [
  {
    number: "01",
    icon: Truck,
    title: "Free Express Delivery",
    description: "Lightning-fast nationwide shipping on all street orders with zero hidden fees.",
    isHighlighted: false,
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Heavyweight Quality",
    description: "Constructed with 100% combed cotton, French Terry, and reinforced double stitching.",
    isHighlighted: false,
  },
  {
    number: "03",
    icon: IndianRupee,
    title: "Crafted in India",
    description: "Designed, cut, and printed locally with premium artisanal craftsmanship.",
    isHighlighted: false,
  },
  {
    number: "04",
    icon: Flame,
    title: "Limited Quantity Drops",
    description: "Exclusive batch runs. Once a collection sells out, it is archived forever.",
    isHighlighted: true, // Reversed visual emphasis card
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const chipsRef = useRef([]);

  useEffect(() => {
    const { gsap } = initGSAP();

    if (sectionRef.current && cardsRef.current.length > 0) {
      // Card Stagger Up Entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Icon Chips Scale & Rotate Settle
      if (chipsRef.current.length > 0) {
        gsap.fromTo(
          chipsRef.current,
          { scale: 0.5, rotate: -15, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.7,
            ease: "back.out(2)",
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 78%",
            },
          }
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-24 px-4 sm:px-14 bg-white text-black border-b border-neutral-200 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column Header */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
              // THE LME ADVANTAGE
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              Why <span className="text-red-600">LME?</span>
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
              We blend raw street culture, heavy fabrics, and uncompromising design to outfit the modern rebel.
            </p>
          </div>

          {/* Right Column 2x2 Feature Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.number}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className={`group relative p-6 sm:p-8 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between ${
                    item.isHighlighted
                      ? "bg-black text-white border border-black shadow-2xl"
                      : "bg-neutral-50 text-black border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300"
                  }`}
                >
                  <div>
                    {/* Top Row: Solid Icon Chip + Monospace Sequence Marker */}
                    <div className="flex items-center justify-between mb-6">
                      <div
                        ref={(el) => (chipsRef.current[index] = el)}
                        className={`w-12 h-12 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                          item.isHighlighted
                            ? "bg-red-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span
                        className={`font-mono text-xs font-black tracking-widest ${
                          item.isHighlighted ? "text-neutral-400" : "text-neutral-400"
                        }`}
                      >
                        [ {item.number} ]
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-black uppercase tracking-tight mb-3 transition duration-200 ${
                        item.isHighlighted
                          ? "text-white group-hover:text-red-500"
                          : "text-black group-hover:text-red-600"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-medium ${
                        item.isHighlighted ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}