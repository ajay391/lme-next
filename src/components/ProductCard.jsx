"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const imageSrc = product.image || "/images/home/new-1.png";
  const hoverImageSrc = product.hoverImage || product.images?.[0] || imageSrc;

  return (
    <div className="group relative bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <Link
        href={`/product/${product.slug || product.id}`}
        className="block relative aspect-[3/4] w-full overflow-hidden bg-neutral-100"
      >
        {/* Primary Image */}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
        />

        {/* Secondary Crossfade Image if available */}
        {hoverImageSrc && hoverImageSrc !== imageSrc && (
          <Image
            src={hoverImageSrc}
            alt={`${product.name} alternate`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Badge Tag */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-mono font-black uppercase px-2.5 py-1 tracking-widest z-10 shadow-md">
            NEW DROP
          </span>
        )}

        {/* Quick View Button Slide-up */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <button className="w-full py-2.5 bg-black hover:bg-red-600 text-white font-mono font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center space-x-2 transition duration-200 shadow-lg">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick View & Add</span>
          </button>
        </div>
      </Link>

      {/* Card Info Section */}
      <div className="p-4 sm:p-5 bg-white border-t border-neutral-100">
        <div className="text-[10px] font-mono uppercase text-red-600 font-bold mb-1 tracking-wider">
          {product.category || "STREETWEAR"}
        </div>
        <Link href={`/product/${product.slug || product.id}`}>
          <h3 className="text-sm sm:text-base font-black uppercase text-neutral-900 tracking-tight truncate group-hover:text-red-600 transition duration-200">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center space-x-3 mt-2 font-mono">
          <span className="text-base sm:text-lg font-black text-black group-hover:underline group-hover:decoration-red-600">
            ₹{product.price}
          </span>
          {(product.oldPrice || product.old_price) && (
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.oldPrice || product.old_price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
