"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Image from "next/image";
import AnimatedButton from "./AnimatedButton";

const slides = [
  {
    id: 1,
    image: "/images/home/hero-1.png",
    heading: "Elevate Your Everyday Look",
    description: "Discover our latest collection of oversized fits and minimal designs that speak your style.",
  },
  {
    id: 2,
    image: "/images/home/hero-2.png",
    heading: "Minimal Meets Bold",
    description: "Explore our unique blend of minimal designs and vibrant colorways.",
  },
  {
    id: 3,
    image: "/images/home/hero-3.png",
    heading: "Crafted for Comfort",
    description: "Our oversized tees are made with premium fabric for all-day comfort and versatility.",
  },
];

export default function HomeHero() {
  return (
    <section className="relative">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div className="relative min-h-[80vh] w-full">
              {/* ✅ Optimized Background Image */}
              <Image
                src={slide.image}
                alt={slide.heading}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Overlay Content */}
              <div className="absolute inset-0 z-10 flex text-center sm:text-start items-center justify-start px-12 sm:px-12 lg:px-24 text-white">
                <div className="max-w-7xl">
                  <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-7xl max-w-[700px] font-semibold mb-6 leading-tight uppercase">
                    {slide.heading}
                  </h1>
                  <p className="text-base sm:text-lg mb-8 max-w-xl opacity-70">
                    {slide.description}
                  </p>
                  <AnimatedButton
                    text="Shop Now"
                    color="#fff"
                    textColor="#000"
                    spanBg="#ffffff"
                    url="/shop"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
