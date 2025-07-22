import Head from 'next/head';
import { useState } from 'react';

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Orders are typically delivered within 4–7 business days.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, you can return any item within 7 days of delivery if it's unworn and tagged.",
  },
  // Add more FAQs as needed
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <>
      <Head>
        <title>FAQs | Last Man on Earth</title>
        <meta name="description" content="Frequently asked questions about shipping, returns, and more at Last Man on Earth." />
      </Head>
      <div className="min-h-[70vh] bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800 uppercase ">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-10 text-base">Find answers to common questions about orders, shipping, returns, and more.</p>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleToggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  <span className="text-2xl text-red-500 ml-4">{openIndex === i ? '−' : '+'}</span>
                </button>
                {openIndex === i && (
                  <div id={`faq-panel-${i}`} className="px-6 py-5 text-gray-600 text-base animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease;
        }
      `}</style>
    </>
  );
}
