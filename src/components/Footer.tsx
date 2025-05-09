'use client';

import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 mt-0">
      <div className="max-w-6xl mx-auto px-0 grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 text-sm">
        {/* Brand Info */}
        <div>
          <h4 className="text-lg text-white font-semibold mb-4">LME</h4>
          <p className="text-gray-400 font-medium leading-relaxed">
            Premium streetwear for the bold. Oversized fits, clean designs, and everyday comfort.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-gray-400 font-semibold">
            <li><a href="/shop" className="hover:underline">Shop</a></li>
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/faq" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg text-white font-semibold mb-4">Customer Support</h4>
          <ul className="space-y-3 text-gray-400 font-semibold">
            <li><a href="/shipping" className="hover:underline">Shipping Info</a></li>
            <li><a href="/returns" className="hover:underline">Returns & Exchanges</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg text-white font-semibold mb-4">Follow Us</h4>
          <ul className="space-y-3 text-gray-400 font-semibold">
            <li className="flex items-center gap-2">
              <Instagram className="w-5 h-5" />
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="w-5 h-5" />
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter className="w-5 h-5" />
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-gray-400 text-sm text-center py-6 px-4">
        <p>&copy; 2025 Last Man On Earth. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-3">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5 hover:text-white transition" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-5 h-5 hover:text-white transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
