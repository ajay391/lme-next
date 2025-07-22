// components/WeeklyDrop.tsx
import Image from 'next/image';
import Link from 'next/link';
import ProductShowcase from './ProductShowcase';
import AnimatedButton from "../components/AnimatedButton";

const WeeklyDrop = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-14 md:py-16 px-3 sm:px-8 md:px-12 lg:px-12 xl:px-32 gap-12 bg-black">
      {/* Left Column */}
      <div className="md:w-1/2 text-center md:text-start">
        <h2 className="text-5xl mt-10 sm:mt-0 sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase mb-4 text-white">
          Nightfall Oversized Hoodie
        </h2>

        <p className="text-white text-base mb-6 opacity-60">
          Introducing the limited-edition "StreetFade Tee" – crafted for everyday rebellion and effortless style. Available only this week.
        </p>
        <AnimatedButton text="Check It Out" color = "#ffffff" textColor = "#000" url="/shop" />

      </div>

      {/* Right Column */}
      <div className="md:w-1/2">
      <ProductShowcase/>
        {/* <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/products/streetfade-tee.jpg" // Replace with your image
            alt="StreetFade Tee"
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transition-transform duration-500"
          />
        </div> */}
      </div>
    </section>
  );
};

export default WeeklyDrop;
