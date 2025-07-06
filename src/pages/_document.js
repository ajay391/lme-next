// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Preconnect for font optimization (if using Google Fonts) */}
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> */}

        {/* Razorpay Checkout (will be loaded where needed) */}
        {/* It's better to lazy-load Razorpay script only where needed (e.g. in checkout page) */}
      </Head>
      <body className="antialiased text-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
