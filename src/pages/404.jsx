"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import notFoundImg from "../../public/images/no-results.jpg";
import { ArrowLeft, Home } from "lucide-react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Page Not Found | Last Man On Earth</title>
        <meta
          name="description"
          content="The requested streetwear page could not be found."
        />
      </Head>

      <main className="min-h-[75vh] bg-white text-black flex flex-col lg:flex-row items-center justify-center px-6 py-16 gap-12 selection:bg-red-600 selection:text-white">
        {/* Left Column - Image */}
        <div className="w-full max-w-md">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-xl">
            <Image
              src={notFoundImg}
              alt="404 Page Not Found"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column - Message */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-lg">
          <span className="text-xs font-mono font-extrabold uppercase text-red-600 tracking-widest block mb-2">
            // ERROR 404
          </span>
          <h1 className="text-6xl sm:text-8xl font-black text-black uppercase tracking-tighter mb-4 leading-none">
            LOST DROP
          </h1>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-neutral-800 tracking-tight mb-3">
            Page Not Found In Archive
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 mb-8 leading-relaxed">
            The page or drop URL you were looking for doesn't exist or has been moved. Head back to the store home or explore the catalog.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <button className="px-6 py-3.5 bg-red-600 hover:bg-black text-white font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-red-600/20 flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Return To Home</span>
              </button>
            </Link>
            <Link href="/shop">
              <button className="px-6 py-3.5 border border-neutral-300 hover:border-black text-black font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition duration-200">
                Shop Catalog
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
