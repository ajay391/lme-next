"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

import ProductCard from "./ProductCard";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";


const featuredProducts = [
  {
    id: 1,
    name: "Formula 1 - Oversized T-shirt",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "599",  // Example of a product with oldPrice
    image: "/images/home/new-1.png",
    images: [
      "/images/products/category-1.png",
      "/images/products/category-2.png",
      "/images/products/category-3.png"
    ],
    category: "T-Shirt",
    description: "A comfortable black tee, perfect for any occasion.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Formula 1 - Oversized T-shirt",
    slug: "urban-white-hoodie",
    price: "599",
    image: "/images/home/new-3.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-3.png",
      "/images/products/category-4.png"
    ],
    category: "T-Shirt",
    description: "A clean, urban-style hoodie in white with minimalist design.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 3,
    name: "Formula 1 - Oversized T-shirt",
    slug: "nowhere-graphic-tee",
    price: "599",
    image: "/images/home/new-4.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-4.png",
      "/images/products/category-5.png"
    ],
    category: "Oversized T-Shirt",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 1,
    name: "Formula 1 - Oversized T-shirt",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "699",  // Example of a product with oldPrice
    image: "/images/home/new-2.png",
    images: [
      "/images/products/category-1.png",
      "/images/products/category-2.png",
      "/images/products/category-3.png"
    ],
    category: "Oversized T-Shirt",
    description: "A comfortable black tee, perfect for any occasion.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 2,
    name: "Formula 1 - Oversized T-shirt",
    slug: "urban-white-hoodie",
    price: "599",
    image: "/images/home/new-5.png",
    images: [
      "/images/products/category-2.png",
      "/images/products/category-3.png",
      "/images/products/category-4.png"
    ],
    category: "T-Shirt",
    description: "A clean, urban-style hoodie in white with minimalist design.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
  {
    id: 3,
    name: "Formula 1 - Oversized T-shirt",
    slug: "nowhere-graphic-tee",
    price: "799",
    image: "/images/home/new-6.png",
    images: [
      "/images/products/category-3.png",
      "/images/products/category-4.png",
      "/images/products/category-5.png"
    ],
    category: "T-Shirt",
    description: "A graphic tee that showcases the Nowhere brand with bold prints.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
  },
];


const NewProducts = () => {
  return (
    <section className="py-16 px-3 sm:px-14 md:px-14 lg:px-14 xl:px-14">
      <h2 className="text-4xl font-bold mb-4 text-start uppercase">New Drops</h2>
      <p className="text-base sm:text-base text-black opacity-60 mb-8 text-start max-w-2xl">
        Discover our latest collection—unique styles, premium fabrics, and perfect fits. Limited stock, once they're gone, they're gone!
      </p>
      <div className="text-end mb-3">
        <Link href="/shop">
          <button className="group inline-flex items-center gap-2 text-red-500 hover:text-red-500 transition px-0 py-2 text-sm font-medium uppercase">
            View All
            <ChevronRight
              size={16}
              className="transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            />
          </button>
        </Link>
      </div>

      <Swiper
        className="newproducts-swiper text-sm"
        // spaceBetween={20}
        loop={true}
        navigation={true}
        pagination={false}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          991: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1154: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {featuredProducts.map((product, index) => (
          <SwiperSlide key={index}>
            <Link href={`/product/${product.id}`}>
              <div className="relative p-0 transition-all cursor-pointer">
                <div className="relative w-full h-[260px] sm:h-[340px] md:h-[360px] lg:h-[380px] xl:h-[400px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1154px) 25vw, (min-width: 991px) 33vw, 50vw"
                    priority={index === 0}
                  />
                </div>
                <div className="p-0">
                  {product.isNew && (
                    <span className="absolute top-3 left-4 bg-red-500 text-white text-sm px-3 py-0 rounded-sm">
                      New
                    </span>
                  )}
                  <h3 className="mt-5 text-lg font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {product.old_price && (
                      <h4 className="text-gray-400 line-through text-lg">₹{product.old_price}</h4>
                    )}
                    <h4 className="text-red-500 text-lg font-medium">₹{product.price}</h4>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default NewProducts;