import React from 'react';
import { Truck, Star, ShieldCheck, IndianRupee } from 'lucide-react';

const features = [
  {
    icon: <Truck className="w-8 h-8 text-red-500" />,
    title: 'Free Delivery',
    description: 'Shop with confidence using encrypted, safe, and trusted payment methods.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
    title: 'Premium Quality',
    description: 'Get your streetwear fast and free, with no extra shipping costs on all orders.',
  },
  {
    icon: <IndianRupee className="w-8 h-8 text-red-500" />,
    title: 'Made in India',
    description: 'Get your streetwear fast and free, with no extra shipping costs on all orders.',
  },
  {
    icon: <Star className="w-8 h-8 text-red-500" />,
    title: 'Limited Drops',
    description: 'Shop with confidence using encrypted, safe, and trusted payment methods.',
  },
];

export const WhyUs = () => (
  <section className="bg-white py-16 px-3 sm:px-10 lg:px-24">
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    
      {/* Left Column */}
      <div className='max-w-lg'>
        <h2 className="text-5xl font-bold mb-4 uppercase">Why shop with us?</h2>
        <p className="text-gray-700 text-lg">
          We blend quality, culture, and creativity to deliver products that feel as good as they look.
        </p>
      </div>

      {/* Right Column */}
      <div className="grid grid-cols-2 gap-6">
        {features.map((item, index) => (
          <div key={index} className="text-start">
            <div className="flex justify-start mb-5">{item.icon}</div>
            <h3 className="font-semibold text-xl mb-3 uppercase">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-8">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
