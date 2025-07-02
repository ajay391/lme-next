"use client";

import React from "react";

const ShippingPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Shipping & Delivery Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 29, 2025</p>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Delivery Timeline</h2>
          <p>
            Orders are typically processed within <strong>1–2 business days</strong> after payment confirmation.
            Once dispatched, your order will be delivered within <strong>8–14 business days</strong> depending on your location.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Shipping Charges</h2>
          <p>
            We offer <strong>free shipping</strong> on all prepaid orders across India. Additional shipping fees may apply to remote areas or international deliveries.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Order Tracking</h2>
          <p>
            Once your order is shipped, you will receive an email and/or SMS with a tracking number and carrier details. You can track your order through the shipping partner’s website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Delayed or Lost Packages</h2>
          <p>
            In rare cases, delays may occur due to unforeseen logistics issues, public holidays, or bad weather. If your order is delayed or not received within 14 days, please contact our support team for assistance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Address & Delivery Issues</h2>
          <p>
            Please ensure your shipping address and contact number are correct at the time of checkout. We are not responsible for failed deliveries due to incorrect addresses or unavailability of the recipient.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Contact Us</h2>
          <p>
            For any shipping or delivery-related queries, feel free to reach out to:
          </p>
          <ul className="mt-2 text-gray-600">
            <li>📧 Email: <a href="mailto:lastmanonearth.india@gmail.com" className="text-red-500 hover:underline">lastmanonearth.india@gmail.com</a></li>
            <li>📞 Phone: +91-8594069080</li>
            <li>📍 Address: Kerala,India</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ShippingPage;
