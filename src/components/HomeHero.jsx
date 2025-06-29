"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import AnimatedButton from "./AnimatedButton";

const slides = [
  {
    id: 1,
    image: "/images/home/hero-1.jpg",
    heading: "Elevate Your Everyday Look",
    description: "Discover our latest collection of oversized fits and minimal designs that speak your style.",
  },
  {
    id: 2,
    image: "/images/home/hero-2.jpg",
    heading: "Minimal Meets Bold",
    description: "Explore our unique blend of minimal designs and vibrant colorways.",
  },
  {
    id: 3,
    image: "/images/home/style-1.jpg",
    heading: "Crafted for Comfort",
    description: "Our oversized tees are made with premium fabric for all-day comfort and versatility.",
  },
];

export default function HomeHero() {
  return (
    <section className="">
      <Swiper
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 444000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="flex items-center justify-center bg-cover bg-center py-24 px-14 lg:px-24 min-h-[80vh] text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="max-w-7xl w-full text-start">
                <h1 className="text-4xl sm:text-7xl font-extrabold mb-6 leading-tight">
                  {slide.heading}
                </h1>
                <p className="text-base w-full sm:text-base mb-8 max-w-xl text-white opacity-60">
                  {slide.description}
                </p>
                <AnimatedButton
                  text="Shop Now"
                  color="#fff"
                  textColor = "#000"
                  spanBg="#ffffff"
                  url="/shop"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
