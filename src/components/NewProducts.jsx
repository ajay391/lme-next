"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductCard from "./ProductCard";


const featuredProducts = [
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",  // Example of a product with oldPrice
    image: "/images/home/new-1.png",
    images: [
      "/images/products/category-1.png",
      "/images/products/category-2.png",
      "/images/products/category-3.png"
    ],
    category: "T-Shirts",
    description: "A comfortable black tee, perfect for any occasion.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 2,
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: "1999",
    image: "/images/home/new-3.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-3.png",
      "/images/products/category-4.png"
    ],
    category: "Hoodies",
    description: "A clean, urban-style hoodie in white with minimalist design.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 3,
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: "1199",
    image: "/images/home/new-4.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-4.png",
      "/images/products/category-5.png"
    ],
    category: "T-Shirts",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",  // Example of a product with oldPrice
    image: "/images/home/new-2.png",
    images: [
      "/images/products/category-1.png",
      "/images/products/category-2.png",
      "/images/products/category-3.png"
    ],
    category: "T-Shirts",
    description: "A comfortable black tee, perfect for any occasion.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 2,
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: "1999",
    image: "/images/home/new-5.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-3.png",
      "/images/products/category-4.png"
    ],
    category: "Hoodies",
    description: "A clean, urban-style hoodie in white with minimalist design.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
  {
    id: 3,
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: "1199",
    image: "/images/home/new-6.png",
    images: [
      "/images/products/category-3.png",
      "/images/products/category-4.png",
      "/images/products/category-5.png"
    ],
    category: "T-Shirts",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
        sizes: ["S", "M", "L", "XL"],
    isNew: true, 
  },
];


export const NewProducts = () => {
  return (
    <section className="py-16 px-8 sm:px-14 md:px-14 lg:px-14 xl:px-14">
      <h2 className="text-5xl font-bold mb-4 text-start">New Drops</h2>
      <p className="text-base text-black opacity-60 mb-12 text-start max-w-2xl">
        Discover our latest collection—unique styles, premium fabrics, and perfect fits. Limited stock, once they're gone, they're gone!
      </p>

      <Swiper
        className="newproducts-swiper text-sm"
        spaceBetween={20}
        loop={true}
        navigation={true}
        pagination={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 3,
          },
          1154: {
            slidesPerView: 4,
          },
        }}
      >
        {featuredProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
