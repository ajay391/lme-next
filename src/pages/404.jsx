'use client';

import Link from 'next/link';
import Image from 'next/image';
import notFoundImg from "../../public/images/no-results.png";
export default function Custom404() {
  return (
    <div className="min-h-[70vh] flex flex-col lg:flex-row items-center justify-center bg-white text-gray-800 px-6 py-16 gap-12">
      {/* Left Column - Image */}
      <div className="w-full max-w-md">
        <Image
          src={notFoundImg}
          alt="Page not found illustration"
          className="w-60 sm:w-80 h-auto mx-auto"
          priority
        />
      </div>

      {/* Right Column - Message */}
      <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl">
        <h1 className="text-8xl font-bold text-black mb-10">404</h1>
        <p className="text-2xl font-semibold mb-5">Oops! Page not found</p>
        <p className="text-gray-600 mb-10">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back home.
        </p>
        <Link href="/">
          <span className="px-6 py-2 bg-red-500 text-white text-lg rounded-sm hover:bg-black transition">
            Go Back Home
          </span>
        </Link>
      </div>
    </div>
  );
}
