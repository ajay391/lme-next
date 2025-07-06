import React from 'react';
import Link from 'next/link';
import AnimatedButton from "./AnimatedButton";

const BrandStatement = () => (
  <section className=" text-black py-16 px-3 sm:px-10 lg:px-24">
    <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      
      {/* Left Column: Big Impact Heading */}
      <div className="w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
        <h2 className="text-4xl sm:text-4xl md:text-7xl lg:text-7xl p-5 font-extrabold leading-tight uppercase ">
        Wear the Movement, Break the Mold.
        </h2>
      </div>

      {/* Right Column: Brand Story Paragraph and Button */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        <p className="text-base sm:text-base mb-6 max-w-xl mx-auto lg:mx-0 opacity-60">
          Forged in the concrete jungles where style meets substance, we're more than apparel—we're armor for the urban warrior. Drawing from the rhythm of subway trains, the poetry of back-alley art, and the symphony of sneakers on pavement, we design for those who write their own rules.
          <br /><br />
          Our collections fuse premium craftsmanship with underground aesthetics—think heavyweight hoodies, statement tees, and silhouettes that command attention. This isn't just fashion; it's a revolution stitched in cotton and canvas. Stand with us, wear your defiance, and redefine streetwear on your terms.
        </p>
        <AnimatedButton text="Shop Collection" color="#000" spanBg="#ffffff" url="/shop" />
      </div>

    </div>
  </section>
);
export default BrandStatement;