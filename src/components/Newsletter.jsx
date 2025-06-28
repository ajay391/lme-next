'use client';
import React from 'react';

export const Newsletter = () => {
  return (
    <section className="bg-gray-200 py-24 px-6 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Column */}
        <div>
          <h2 className="text-6xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-700 text-lg opacity-60">
            Stay updated with our latest drops, exclusive offers, and style tips — directly to your inbox.
          </p>
        </div>

        {/* Right Column */}
        <form className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};
