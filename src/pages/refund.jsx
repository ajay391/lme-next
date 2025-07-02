"use client";

import React from "react";

const CancelRefundPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Cancellation & Refund Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 29, 2025</p>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Order Cancellation</h2>
          <p>
            You can cancel your order within <strong>24 hours</strong> of placing it. To cancel, please contact us immediately at{" "}
            <a href="mailto:support@yourbrand.com" className="text-red-500 hover:underline">lastmanonearth.india@gmail.com</a>.
          </p>
          <p>
            Orders already dispatched cannot be cancelled. Once shipped, please refer to the return policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Return Conditions</h2>
          <ul className="list-disc ml-6 text-gray-600">
            <li>You may request a return within <strong>7 days</strong> of receiving the product.</li>
            <li>The item must be unused, in original packaging, and in the same condition you received it.</li>
            <li>Products like innerwear or customized items are not eligible for return.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. Refund Process</h2>
          <p>
            Once we receive and inspect the returned product, we will initiate your refund to the original payment method within <strong>5–7 business days</strong>.
          </p>
          <p>
            Shipping fees are non-refundable unless the product was damaged or incorrect.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Late or Missing Refunds</h2>
          <p>
            If you haven’t received your refund yet:
          </p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Double-check your bank or payment account.</li>
            <li>Contact your bank; it may take some time before your refund is officially posted.</li>
            <li>If you've done all of this and still have not received your refund, please contact us.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Contact Us</h2>
          <p>
            For any queries related to cancellation or refund, reach out to us at:
          </p>
          <ul className="mt-2 text-gray-600">
            <li>📧 Email: <a href="mailto:lastmanonearth.india@gmail.com" className="text-red-500 hover:underline">lastmanonearth.india@gmail.com</a></li>
            <li>📞 Phone: +91-8594069080</li>
            <li>📍 Address: Kerala, India</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CancelRefundPage;
