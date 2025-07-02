"use client";

import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-red-500">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 29, 2025</p>

      <div className="space-y-8 text-base leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
          <p>
            At <strong>Last Man on Earth</strong>, we are committed to protecting your privacy.
            This policy outlines how we collect, use, and protect your personal data when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Personal details such as name, email, phone number, and shipping address</li>
            <li>Payment details (handled securely via our payment partners)</li>
            <li>Browsing behavior, device info, and IP address for analytics</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Fulfill your orders and process payments</li>
            <li>Send you order updates, newsletters, and promotions (only if opted-in)</li>
            <li>Improve website performance and user experience</li>
            <li>Prevent fraud and ensure site security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
          <p>
            We do not sell your personal data. We may share your information with:
          </p>
          <ul className="list-disc ml-6 text-gray-600">
            <li>Trusted service providers (e.g., payment gateways, delivery partners)</li>
            <li>Law enforcement or regulatory bodies if required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
          <p>
            We use cookies to personalize your experience, analyze site traffic, and serve targeted ads. You can manage cookie preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">6. Data Retention</h2>
          <p>
            We retain your information only for as long as necessary to fulfill our obligations and comply with legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">7. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data. To make a request, please contact us using the details below.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">8. Security</h2>
          <p>
            We implement appropriate security measures to safeguard your data. However, no system is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">9. Changes to this Policy</h2>
          <p>
            We may update this policy occasionally. Any changes will be posted on this page with an updated date.
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

export default PrivacyPolicyPage;
