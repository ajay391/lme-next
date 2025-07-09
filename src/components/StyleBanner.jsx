import React from 'react';
import Image from 'next/image';
import styleOne from "../../public/images/home/style-1.png"; // Update the path to your images
import styleTwo from "../../public/images/home/style-2.png"; // Update the path to your images
import AnimatedButton from "../components/AnimatedButton";
import CircleButton from './CircleButton';
import Link from 'next/link';

const StyleBanner = () => {
  return (
    <div className="py-5 md:py-16 px-3 sm:px-8 md:px-14 lg:px-14 xl:px-14">

      <div className="max-w-3xl text-start pb-16">
        <h1 className="text-4xl sm:text-4xl md:text-4xl font-bold mb-4 uppercase">
          Redefine Survival Style with <br /><span className="text-primary text-red-500"> Last Man on Earth</span>
        </h1>
        <p className="text-base text-gray-600">
          Born from resilience, designed for rebellion—our pieces speak louder than trends. With bold silhouettes and statement designs, Last Man on Earth outfits you for a future unknown.
        </p>
      </div>

      {/* Desktop layout (>= 1200px) */}
      <div className="hidden xl:block">
        {/* First row - image (col-8) + box (col-4) */}
        <div className="flex flex-wrap mb-8">
          <div className="w-8/12 pr-0">
            <Image
              src={styleOne} // Replace with your image path
              alt="Featured Image"
              width={600} // Adjust width as needed
              height={300} // Adjust height as needed
              className="w-full h-full object-cover rounded-none max-h-[500px]"
            />
          </div>
          <div className="w-4/12">
            <div className="bg-black text-white rounded-none w-full p-7 flex flex-col justify-end h-[500px]">
              <h5 className="text-5xl font-extrabold uppercase mb-4">
                Gear for the End of the World
              </h5>
              <p className="text-sm text-opacity-60 mb-4">
                Inspired by dystopian grit and street survival, our collection is crafted for those who lead, not follow. Be the story that survives.
              </p>
              {/* <AnimatedButton text="Explore More" color = "#ffffff" textColor='#000' spanBg="#ef4444" url="/shop" /> */}
              <Link href="/shop">
                <CircleButton color="black" />
              </Link>

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
          <div className="w-4/12 pr-0">
            <div className="bg-red-500 text-black rounded-none w-full p-7 flex flex-col justify-end h-[500px]">
              <h1 className="text-5xl text-white font-extrabold uppercase mb-4">
                Stand Alone. Stand Strong.
              </h1>
              <p className="text-sm text-white opacity-60 mb-4">
                From oversized tees to statement hoodies, explore essentials that echo rebellion, strength, and street precision. This is survival redefined.
              </p>
              {/* <AnimatedButton text="Shop Collection" color="#fff" textColor='#000' spanBg="#ffffff" url="/shop" /> */}
              <Link href="/shop">
                <CircleButton color="red" />
              </Link>
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
              className="w-full h-full object-cover rounded-none max-h-[500px]"
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
              <h5 className="text-6xl font-extrabold uppercase mb-4">
                Gear for the End of the World
              </h5>
              <p className="text-sm text-opacity-60 mb-4">
                Inspired by dystopian grit and street survival, our collection is crafted for those who lead, not follow. Be the story that survives.
              </p>
              {/* <AnimatedButton text="Explore More" color = "#ffffff" textColor='#000' spanBg="#ef4444" url="/shop" /> */}
              <CircleButton color="black" />
            </div>
          </div>
          <div className="w-6/12 pl-2">
            <div className="bg-red-500 text-black rounded-md w-full p-7 flex flex-col justify-end h-[500px]">
              <h1 className="text-6xl text-white font-extrabold uppercase mb-4">
                Stand Alone. Stand Strong.
              </h1>
              <p className="text-sm text-white opacity-60 mb-4">
                From oversized tees to statement hoodies, explore essentials that echo rebellion, strength, and street precision. This is survival redefined.
              </p>
              {/* <AnimatedButton text="Shop Collection" color="#fff" textColor='#000' spanBg="#ffffff" url="/shop" /> */}
              <CircleButton color="red" />
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
          <div className="bg-black text-white rounded-md w-full p-5 flex flex-col justify-end min-h-[380px] max-h-[500px]">
            <h5 className="text-4xl font-extrabold uppercase mb-4">
              Gear for the End of the World
            </h5>
            <p className="text-base text-opacity-60 mb-4">
              Inspired by dystopian grit and street survival, our collection is crafted for those who lead, not follow. Be the story that survives.
            </p>
            {/* <AnimatedButton text="Explore More" color = "#ffffff" textColor='#000'  spanBg="#ef4444" url="/shop" /> */}
            <CircleButton color="black" />

          </div>
        </div>

        {/* Second box */}
        <div className="mb-4">
          <div className="bg-red-500 text-black rounded-md w-full p-5 flex flex-col justify-end min-h-[380px] max-h-[500px]">
            <h1 className="text-4xl text-white font-extrabold uppercase mb-4 ">
              Stand Alone. Stand Strong.
            </h1>
            <p className="text-base text-white opacity-60 mb-4">
              From oversized tees to statement hoodies, explore essentials that echo rebellion, strength, and street precision. This is survival redefined.
            </p>
            {/* <AnimatedButton text="Shop Collection" color="#fff" textColor='#000' spanBg="#ffffff" url="/shop" /> */}
            <CircleButton color="red" />
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
export default StyleBanner;