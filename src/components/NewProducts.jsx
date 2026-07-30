"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { initGSAP } from "../lib/gsap";

const featuredProducts = [
  {
    id: 1,
    name: "Formula 1 - Oversized T-shirt",
    category: "Oversized Tee",
    price: "999",
    oldPrice: "1499",
    image: "/images/home/new-1.png",
    hoverImage: "/images/products/category-1.png",
    isNew: true,
  },
  {
    id: 2,
    name: "Urban Apex - Oversized Hoodie",
    category: "Heavyweight Hoodie",
    price: "1799",
    oldPrice: "2499",
    image: "/images/home/new-3.png",
    hoverImage: "/images/products/category-2.png",
    isNew: true,
  },
  {
    id: 3,
    name: "Nowhere Graphic - Street Tee",
    category: "Oversized Tee",
    price: "899",
    oldPrice: "1299",
    image: "/images/home/new-4.png",
    hoverImage: "/images/products/category-3.png",
    isNew: true,
  },
  {
    id: 4,
    name: "Blackout Grid - Oversized Tee",
    category: "Oversized Tee",
    price: "999",
    oldPrice: "1399",
    image: "/images/home/new-2.png",
    hoverImage: "/images/products/category-4.png",
    isNew: true,
  },
  {
    id: 5,
    name: "Slipstream Livery - Hoodie",
    category: "Heavyweight Hoodie",
    price: "1899",
    oldPrice: "2599",
    image: "/images/home/new-5.png",
    hoverImage: "/images/products/category-5.png",
    isNew: true,
  },
  {
    id: 6,
    name: "Redline Moto - Graphics Tee",
    category: "Oversized Tee",
    price: "799",
    oldPrice: "1199",
    image: "/images/home/new-6.png",
    hoverImage: "/images/products/category-1.png",
    isNew: true,
  },
];

export default function NewProducts() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP();

    if (sectionRef.current && cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 sm:px-14 bg-white text-black overflow-hidden border-b border-neutral-200">
      <div className="container mx-auto max-w-7xl">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-neutral-200 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest">
                New Drops
              </span>
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                // Limited Stock Available
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black">
              Fresh Off The Line
            </h2>
          </div>

          <Link href="/shop" className="group inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-red-600 transition">
            <span>View Drop Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 text-red-600" />
          </Link>
        </div>

        {/* Products Swiper Slider */}
        <Swiper
          className="newproducts-swiper overflow-visible"
          spaceBetween={20}
          loop={true}
          navigation={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
        >
          {featuredProducts.map((product, index) => (
            <SwiperSlide key={product.id}>
              <div
                ref={(el) => (cardsRef.current[index] = el)}
                className="group relative bg-white border border-neutral-200 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-500 hover:border-neutral-400"
              >
                {/* Product Image Container */}
                <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  {/* Base Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  {/* Secondary Image Crossfade on Hover */}
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} alternate view`}
                    fill
                    className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  />

                  {/* Pulsing Chip */}
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 tracking-widest z-10">
                      NEW
                    </span>
                  )}

                  {/* Quick Action Button Slide-Up on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <button className="w-full py-3 bg-black hover:bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition duration-200 shadow-lg">
                      <ShoppingBag className="w-4 h-4" />
                      <span>Quick View & Add</span>
                    </button>
                  </div>
                </Link>

                {/* Card Info */}
                <div className="p-5">
                  <div className="text-[11px] font-mono uppercase text-red-600 font-bold mb-1 tracking-wider">
                    {product.category}
                  </div>
                  <h3 className="text-base font-extrabold uppercase text-neutral-900 truncate group-hover:text-red-600 transition duration-200">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-3 mt-3">
                    <span className="text-lg font-black text-black group-hover:underline group-hover:decoration-red-600">
                      ₹{product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{product.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}