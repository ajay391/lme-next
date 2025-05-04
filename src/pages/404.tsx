// pages/404.tsx
'use client';

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link href="/">
        <span className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Go Back Home
        </span>
      </Link>
    </div>
  );
}
