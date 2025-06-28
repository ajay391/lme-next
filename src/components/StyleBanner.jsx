import React from 'react';
import Image from 'next/image';
import styleOne from "../../public/images/home/style-1.jpg"; // Update the path to your images
import styleTwo from "../../public/images/home/style-2.jpg"; // Update the path to your images
import AnimatedButton from "../components/AnimatedButton";

export const StyleBanner = () => {
  return (
      <div className="py-5 md:py-16 px-8 sm:px-8 md:px-14 lg:px-14 xl:px-14">

        <div className="max-w-3xl text-start pb-16">
          <h1 className="text-5xl sm:text-5xl md:text-5xl font-bold mb-4 uppercase">
          Ship Your Website <span className="text-primary"> Quickly with Frameblox</span>
          </h1>
          <p className="text-base sm:text-base text-gray-600">
          Use prebuilt templates and components for a professional, stunning look. Save time and focus on content with our user-friendly, customizable design solutions.
          </p>
        </div>
      
      {/* Desktop layout (>= 1200px) */}
      <div className="hidden xl:block">
        {/* First row - image (col-8) + box (col-4) */}
        <div className="flex flex-wrap mb-8">
          <div className="w-8/12 pr-4">
            <Image
              src={styleOne} // Replace with your image path
              alt="Featured Image"
              width={600} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-full object-cover rounded-md max-h-[500px]"
            />
          </div>
          <div className="w-4/12">
            <div className="bg-black text-white rounded-md w-full p-7 flex flex-col justify-end h-[500px]">
              <h5 className="text-3xl font-extrabold uppercase mb-4">
                Built by the Streets, Made for You
              </h5>
              <p className="text-sm text-opacity-60 mb-4">
                From the streets to your style—our journey is all about self-expression
                and rebellion. Join the movement.
              </p>
              <AnimatedButton text="Explore More" color = "#ffffff" spanBg="#ef4444" url="/shop" />
              {/* <a
                href="#"
                className="border border-white px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-white hover:text-black transition duration-300"
              >
                Read our story
              </a> */}
            </div>
          </div>
        </div>
        
        {/* Second row - box (col-4) + image (col-8) */}
        <div className="flex flex-wrap">
          <div className="w-4/12 pr-4">
            <div className="bg-gray-200 text-black rounded-md w-full p-7 flex flex-col justify-end h-[500px]">
              <h1 className="text-3xl font-extrabold uppercase mb-4">
              Elevate Your Street Game
              </h1>
              <p className="text-sm opacity-60 mb-4">
              From bold graphics to everyday essentials, explore our latest drops and signature pieces designed for the culture.
              </p>
              <AnimatedButton text="Shop Collection" color="#ef4444" spanBg="#ffffff" url="/shop" />
              {/* <a
                href="#"
                className="border border-black px-4 py-2 rounded-md text-sm font-medium text-black hover:border-red-800 hover:bg-red-500 hover:text-white transition duration-300"
              >
                Read our story
              </a> */}
            </div>
          </div>
          <div className="w-8/12">
            <Image
              src={styleTwo} // Replace with your image path
              alt="Featured Image"
              width={600} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-full object-cover rounded-md max-h-[500px]"
            />
          </div>
        </div>
      </div>
  
      {/* Tablet layout (790px - 1199px) */}
      <div className="hidden md:block xl:hidden">
        {/* First row - image */}
        <div className="mb-8">
          <Image
            src={styleOne} // Replace with your image path
            alt="Featured Image"
            width={600} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-full object-cover rounded-md max-h-[500px]"
          />
        </div>
        
        {/* Second row - two boxes */}
        <div className="flex flex-wrap mb-8">
          <div className="w-6/12 pr-2">
            <div className="bg-black text-white rounded-md w-full p-7 flex flex-col justify-end h-[500px]">
              <h5 className="text-3xl font-extrabold uppercase mb-4">
                Built by the Streets, Made for You
              </h5>
              <p className="text-sm text-opacity-60 mb-4">
                From the streets to your style—our journey is all about self-expression
                and rebellion. Join the movement.
              </p>
              <AnimatedButton text="Explore More" color = "#ffffff" spanBg="#ef4444" url="/shop" />
            </div>
          </div>
          <div className="w-6/12 pl-2">
            <div className="bg-gray-200 text-black rounded-md w-full p-7 flex flex-col justify-end h-[500px]">
              <h1 className="text-3xl font-extrabold uppercase mb-4">
              Elevate Your Street Game
              </h1>
              <p className="text-sm opacity-60 mb-4">
              From bold graphics to everyday essentials, explore our latest drops and signature pieces designed for the culture.
              </p>
              <AnimatedButton text="Shop Collection" color="#ef4444" spanBg="#ffffff" url="/shop" />
            </div>
          </div>
        </div>
        
        {/* Third row - second image */}
        <div>
          <Image
            src={styleTwo} // Replace with your image path
            alt="Featured Image"
            width={600} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-full object-cover rounded-md max-h-[500px]"
          />
        </div>
      </div>
  
      {/* Mobile layout (< 790px) */}
      <div className="md:hidden">
        {/* First image */}
        <div className="mb-4">
          <Image
            src={styleOne} // Replace with your image path
            alt="Featured Image"
            width={600} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-full object-cover rounded-md min-h-[300px] max-h-[500px]"
          />
        </div>
        
        {/* First box */}
        <div className="mb-4">
          <div className="bg-black text-white rounded-md w-full p-7 flex flex-col justify-end min-h-[380px] max-h-[500px]">
            <h5 className="text-3xl font-extrabold uppercase mb-4">
              Built by the Streets, Made for You
            </h5>
            <p className="text-sm text-opacity-60 mb-4">
              From the streets to your style—our journey is all about self-expression
              and rebellion. Join the movement.
            </p>
            <AnimatedButton text="Explore More" color = "#ffffff" spanBg="#ef4444" url="/shop" />
          </div>
        </div>
        
        {/* Second box */}
        <div className="mb-4">
          <div className="bg-gray-200 text-black rounded-md w-full p-7 flex flex-col justify-end min-h-[380px] max-h-[500px]">
            <h1 className="text-3xl font-extrabold uppercase mb-4">
              Elevate Your Street Game
              </h1>
              <p className="text-sm opacity-60 mb-4">
              From bold graphics to everyday essentials, explore our latest drops and signature pieces designed for the culture.
              </p>
              <AnimatedButton text="Shop Collection" color="#ef4444" spanBg="#ffffff" url="/shop" />
          </div>
        </div>
        
        {/* Second image */}
        <div>
          <Image
            src={styleTwo} // Replace with your image path
            alt="Featured Image"
            width={600} // Adjust width as needed
            height={300} // Adjust height as needed
            className="w-full h-full object-cover rounded-md min-h-[300px] max-h-[500px] "
          />
        </div>
      </div>
    </div>
  );
};
