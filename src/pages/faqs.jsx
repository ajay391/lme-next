'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, ChevronDown, HelpCircle, MessageSquare, ArrowRight, Truck, RefreshCw, Shirt, ShieldCheck, Phone } from 'lucide-react';

const FAQ_CATEGORIES = ['All', 'Shipping & Delivery', 'Returns & Exchanges', 'Custom DesignMyTee', 'Sizing & Care'];

const ALL_FAQS = [
  {
    category: 'Shipping & Delivery',
    question: 'How long does nationwide express delivery take?',
    answer: 'Orders are processed within 24 hours. Express shipping typically arrives in 3–5 business days across major metro cities in India, and 5–7 business days for non-metro locations.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'Do you offer Cash on Delivery (COD)?',
    answer: 'Yes! Cash on Delivery is available across most pincodes in India. Pin code eligibility will be automatically verified at checkout.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How can I track my dispatched order?',
    answer: 'Once your order is shipped from our Kerala warehouse, you will receive a tracking link via SMS and email. You can also track your live shipment under My Orders on your account profile.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'What is your return & exchange policy?',
    answer: 'We offer a 7-day hassle-free return and exchange policy from the date of delivery. Items must be unworn, unwashed, with original LME tags and packaging intact.'
  },
  {
    category: 'Returns & Exchanges',
    question: 'How do I initiate a size exchange or return?',
    answer: 'You can initiate an exchange or return directly from the My Orders section in your profile, or submit a support ticket on our Support page. Our team will arrange a reverse pickup.'
  },
  {
    category: 'Custom DesignMyTee',
    question: 'How does the DesignMyTee custom request process work?',
    answer: 'Submit your design brief, reference image, quantity, and garment preference on /designmytee. An admin will assign a senior designer who uploads concept revisions (v1, v2) for your approval before converting to a production run.'
  },
  {
    category: 'Custom DesignMyTee',
    question: 'What is the minimum batch quantity for custom apparel?',
    answer: 'Custom DesignMyTee orders start at small batch runs (as low as 25-30 units). We handle bulk runs up to 1,000+ units with tiered volume pricing.'
  },
  {
    category: 'Sizing & Care',
    question: 'How do your oversized T-shirts fit?',
    answer: 'Our oversized tees feature a signature drop-shoulder silhouette with extended length and boxy proportions. If you prefer a traditional regular fit, we recommend ordering one size down.'
  },
  {
    category: 'Sizing & Care',
    question: 'What garment weight (GSM) do you use?',
    answer: 'We use heavy 240GSM to 280GSM 100% combed cotton for oversized t-shirts, and 380GSM French Terry fleece for heavyweight hoodies. Built for structure and longevity.'
  },
  {
    category: 'Sizing & Care',
    question: 'How should I wash and care for heavy graphic tees?',
    answer: 'Wash inside-out in cold water on a gentle cycle. Do not bleach or tumble dry high. Iron inside-out and never directly over screenprinted or puff graphics.'
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(0); // First open by default

  const filteredFaqs = ALL_FAQS.filter(faq => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>FAQs | Last Man On Earth</title>
        <meta name="description" content="Frequently asked questions about shipping, delivery, returns, custom DesignMyTee runs, and garment care at Last Man On Earth." />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
        
        {/* HERO HEADER */}
        <section className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-14 bg-white border-b border-neutral-200">
          <div className="container mx-auto max-w-4xl text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
              // KNOWLEDGE BASE
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h1>
            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium max-w-xl mx-auto">
              Find instant answers to questions regarding orders, express shipping, returns, custom apparel, and garment sizing.
            </p>

            {/* Search Input */}
            <div className="relative max-w-xl mx-auto pt-4">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 mt-2" />
              <input
                type="text"
                placeholder="Search questions by keyword (e.g. shipping, return, 240GSM)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-mono bg-neutral-50 border border-neutral-300 pl-11 pr-4 py-3 text-black focus:outline-none focus:border-red-600 shadow-sm"
              />
            </div>
          </div>
        </section>

        {/* FAQ CONTENT SECTION */}
        <section className="py-16 sm:py-20 px-4 sm:px-14 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto max-w-4xl space-y-8">
            
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start sm:justify-center border-b border-neutral-200">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIdx(null); }}
                  className={`px-4 py-2 text-xs font-mono font-bold whitespace-nowrap transition border ${
                    activeCategory === cat
                      ? 'bg-red-600 text-white border-red-600 shadow-md'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, i) => {
                  const isOpen = openIdx === i;
                  return (
                    <div key={i} className="bg-white border border-neutral-200 shadow-sm overflow-hidden transition">
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-black hover:text-red-600 transition"
                      >
                        <span className="uppercase tracking-tight">{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-red-600 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-neutral-600 font-mono leading-relaxed border-t border-neutral-100 pt-4 bg-neutral-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white border border-neutral-200 font-mono text-xs text-neutral-400">
                  No questions found matching your search.
                </div>
              )}
            </div>

            {/* Need More Help Card */}
            <div className="bg-black text-white p-8 border border-neutral-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-extrabold text-red-500 uppercase block mb-1">// STILL HAVE QUESTIONS?</span>
                <h3 className="text-xl font-black uppercase text-white">Can't Find What You're Looking For?</h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">Our customer support team is on standby to assist you directly.</p>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <Link
                  href="/contact"
                  className="bg-red-600 hover:bg-white hover:text-black text-white font-mono font-bold text-xs px-5 py-3 transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" /> Contact Team
                </Link>
                <Link
                  href="/support"
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-mono font-bold text-xs px-5 py-3 border border-neutral-700 transition"
                >
                  Support Portal
                </Link>
              </div>
            </div>

          </div>
        </section>

      </main>
    </>
  );
}
