import React from 'react';
import { Truck, Star, ShieldCheck, IndianRupee } from 'lucide-react';
import { BsCurrencyRupee } from "react-icons/bs";
import { MdStarPurple500 } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
const features = [
  {
    icon: <Truck className="w-8 h-8 text-red-500" />,
    title: 'Free Delivery',
    description: 'Shop with confidence using encrypted, safe, and trusted payment methods.',
  },
  {
    icon: <LuShieldCheck className="w-8 h-8 text-red-500" />,
    title: 'Premium Quality',
    description: 'Get your streetwear fast and free, with no extra shipping costs on all orders.',
  },
  {
    icon: <BsCurrencyRupee className="w-8 h-8 text-red-500" />,
    title: 'Made in India',
    description: 'Get your streetwear fast and free, with no extra shipping costs on all orders.',
  },
  {
    icon: <FaRegStar className="w-8 h-8 text-red-500" />,
    title: 'Limited Drops',
    description: 'Shop with confidence using encrypted, safe, and trusted payment methods.',
  },
];
const WhyUs = () => (
  <section className="bg-white py-16 px-3 sm:px-2 md:px-14 lg:px-14 xl:px-14">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
    
      {/* Left Column - 4/12 */}
      <div className="md:col-span-4 max-w-lg">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 uppercase">Why <span className='text-red-500'>LME?</span></h2>
        <p className="text-gray-700 text-base">
          We blend quality, culture, and creativity to deliver products that feel as good as they look.
        </p>
      </div>

      {/* Right Column - 8/12 */}
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((item, index) => (
          <div key={index} className="text-start bg-black py-12 px-8 sm:px-10 rounded-sm relative">
            {/* Icon styling */}
            <div className="absolute top-2 right-2 opacity-10 z-0">
              {React.cloneElement(item.icon, {
                className: "w-20 h-20 text-white",
              })}
            </div>

            {/* Foreground content */}
            <div className="relative z-10">
              {/* <div className="mb-5">{item.icon}</div> */}
              <h3 className="font-semibold text-xl mb-5 uppercase text-white">{item.title}</h3>
              <p className="text-sm text-white mb-0">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
export default WhyUs;