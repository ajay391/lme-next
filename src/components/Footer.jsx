'use client';

import { Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-white pt-0 mt-0 border-t-2 border-gray-200">
      <div className=" mx-auto  px-3 sm:px-14 md:px-14 lg:px-14 xl:px-14 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-16 text-sm">
        {/* Brand Info */}
        <div>
          <h4 className="text-2xl sm:text-lg text-red-500 font-semibold mb-4 uppercase">Last Man On Earth</h4>
          {/* <Image src="/images/logo.png" alt="Logo" width={55} height={55} className="object-contain mb-5" /> */}

          <p className="text-base text-gray-400 leading-relaxed mb-7 ">
           Elevate your everyday style with bold, oversized streetwear. Designed for comfort, crafted for impact.
          </p>
          <ul className="text-base text-gray-600 font-medium flex items-center justify-start gap-4">
            <li className="flex items-center hover:text-red-500">
              <a href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv" target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6" /></a>
            </li>
            <li className="flex items-center hover:text-red-500">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook className="w-6 h-6" /></a>
            </li>
            <li className="flex items-center hover:text-red-500" >
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter className="w-6 h-6" /></a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}


        {/* Quick Links and Support - grouped on smaller screens */}
        <div className="md:col-span-2 grid grid-cols-2 gap-8">
          {/* Quick Links */}
          <div className="footer-links">
            <h4 className="text-lg text-black font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 md:space-y-3 text-base text-gray-400 font-medium">
              <li><a href="/shop" className="hover:text-red-500">Shop</a></li>
              <li><a href="/about-us" className="hover:text-red-500">About Us</a></li>
              <li><a href="/support" className="hover:text-red-500">Support</a></li>
              <li><a href="/faq" className="hover:text-red-500">FAQs</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-links">
            <h4 className="text-lg text-black font-medium mb-4">Customer Support</h4>
            <ul className="space-y-2 md:space-y-3 text-base text-gray-400 font-medium">
              <li><a href="/shipping" className="hover:text-red-500">Shipping Info</a></li>
              <li><a href="/refund" className="hover:text-red-500">Returns & Exchanges</a></li>
              <li><a href="/privacy" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-red-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className='footer-links'>
          <h4 className="text-lg text-black font-medium mb-4">Contact Us</h4>
          <ul className="text-base text-gray-400 font-medium space-y-3">
            <li className="flex items-center gap-2 hover:text-red-500 break-words">
              <Phone className="w-5 h-5 shrink-0" />
              <p
               
                className="break-all text-sm"
              >
                +91 XXXXX-XXXXX
              </p>
            </li>
            <li className="flex items-center gap-2 hover:text-red-500 break-words">
              <Mail className="w-5 h-5 shrink-0" />
              <a
               
                className="break-all text-sm"
              >
                lme.store.in@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black border-t border-gray-700 text-gray-400 text-sm text-center py-4 px-4">
        <p>&copy; 2025 Last Man On Earth. All rights reserved.</p>
        {/* <div className="flex justify-center gap-6 mt-3">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-white transition" />
          </a>
        </div> */}
      </div>
    </footer>
  );
}
