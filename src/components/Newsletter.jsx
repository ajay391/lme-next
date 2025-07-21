'use client';
import React, { useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const isValidEmail = (email) => {
    // Basic regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      await axiosInstance.post('/auth/newsletter/', { email });
      toast.success('Successfully subscribed to the newsletter!');
      setEmail('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-red-500 py-24 px-3 sm:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Column */}
        <div>
          <h2 className="text-5xl text-white font-bold mb-4 uppercase">Subscribe to Our Newsletter</h2>
          <p className="text-white text-base opacity-60">
            Stay updated with our latest drops, exclusive offers, and style tips — directly to your inbox.
          </p>
        </div>

        {/* Right Column - Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full flex-1 px-4 py-3 rounded-sm border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-sm hover:bg-white hover:text-black transition font-medium"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default Newsletter;
