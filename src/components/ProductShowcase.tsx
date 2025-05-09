'use client';

import { useState } from 'react';
import Image from 'next/image';

import car1 from "../../public/images/products/category-1.avif";
import car2 from "../../public/images/products/category-3.avif";
import car3 from "../../public/images/products/category-4.avif";
import car4 from "../../public/images/products/category-5.avif";

const productImages = [car1, car2, car3, car4];
export default function ProductShowcase() {
    const [activeImage, setActiveImage] = useState(productImages[0]);
  
    return (
      <div className="w-full px-4 py-8">
        {/* Main Image */}
        <div className="w-full">
            <div className="relative w-full aspect-square min-h-[300px] sm:min-h-[400px] md:min-h-0 rounded-2xl overflow-hidden shadow-md">
                <Image
                src={activeImage}
                alt="Featured Product"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                />
            </div>
        </div>
  
        {/* Thumbnails */}
        <div className="mt-4 overflow-x-auto">
          <div className="flex sm:grid sm:grid-cols-4 gap-2 w-max sm:w-full">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`relative aspect-square min-w-[72px] sm:min-w-0 w-20 sm:w-full border-2 rounded-3xl overflow-hidden transition ${
                  activeImage === img ? 'border-red-500' : 'border-none'
                } `}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 10vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
  