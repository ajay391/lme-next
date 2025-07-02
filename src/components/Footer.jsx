'use client';

import { Instagram, Twitter, Facebook } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white text-white pt-0 mt-0 border-t-2 border-gray-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-3 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 py-16 text-sm">
        {/* Brand Info */}
        <div>
          {/* <h4 className="text-lg text-white font-semibold mb-4">LME</h4> */}
          <Image src="/images/logo.png" alt="Logo" width={55} height={55} className="object-contain mb-5" />
          
          <p className="text-base text-gray-400 leading-relaxed">
            Premium streetwear for the bold. Oversized fits, clean designs, and everyday comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div className='footer-links'>
          <h4 className="text-lg text-black font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 md:space-y-3 text-base text-gray-400 font-medium">
            <li><a href="/shop" className="hover:text-red-500">Shop</a></li>
            <li><a href="/about" className="hover:text-red-500">About Us</a></li>
            <li><a href="/contact" className="hover:text-red-500">Contact</a></li>
            <li><a href="/faq" className="hover:text-red-500">FAQs</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className='footer-links'>
          <h4 className="text-lg text-black font-medium mb-4">Customer Support</h4>
          <ul className="space-y-2 md:space-y-3 text-base text-gray-400 font-medium">
            <li><a href="/shipping" className="hover:text-red-500">Shipping Info</a></li>
            <li><a href="/refund" className="hover:text-red-500">Returns & Exchanges</a></li>
            <li><a href="/privacy" className="hover:text-red-500">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-red-500">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className='footer-links'>
          <h4 className="text-lg text-black font-medium mb-4">Follow Us</h4>
          <ul className="space-y-2 md:space-y-3 text-base text-gray-400 font-medium">
            <li className="flex items-center gap-2 hover:text-red-500">
              <Instagram className="w-5 h-5" />
              <a href="https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="flex items-center gap-2 hover:text-red-500">
              <Facebook className="w-5 h-5" />
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li className="flex items-center gap-2 hover:text-red-500">
              <Twitter className="w-5 h-5" />
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
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
