"use client";

import React from "react";

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Terms and Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 29, 2025</p>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Use of Website</h2>
          <p>
            By accessing our website, you agree to use it for lawful purposes only and not to copy, distribute, or modify any part of it without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Product Information</h2>
          <p>
            We strive to ensure accuracy in product details, descriptions, and pricing. Color variations may occur based on display settings. Availability is subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Orders & Payments</h2>
          <p>
            All orders are subject to acceptance and stock availability. Payment must be made at the time of purchase. We reserve the right to cancel or refuse any order.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Shipping & Delivery</h2>
          <p>
            Estimated shipping times may vary. Delays can occur due to external factors. Please ensure your shipping details are accurate at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Returns & Exchanges</h2>
          <p>
            Please refer to our <a href="/returns" className="text-red-500 hover:underline">Return Policy</a>. Items must be returned unused and in original packaging within the specified return window.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Intellectual Property</h2>
          <p>
            All content including logos, images, and text is owned by <strong>Last Man on Earth</strong> and is protected by intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>
            We are not responsible for indirect or incidental damages arising from your use of our website or products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Privacy</h2>
          <p>
            Please review our <a href="/privacy" className="text-red-500 hover:underline">Privacy Policy</a> to understand how we collect and use your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes to Terms</h2>
          <p>
            We may update these terms periodically. Updates will be posted on this page with a revised date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            📧 Email: <a href="mailto:lastmanonearth.india@gmail.com" className="text-red-500 hover:underline">lastmanonearth.india@gmail.com</a><br />
            📞 Phone: +91-8594069080<br />
            📍 Address: Kerala,India
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
