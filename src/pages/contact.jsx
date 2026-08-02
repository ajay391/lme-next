'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Query',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill out all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you! Your message has been sent to our team.');
      setFormData({ name: '', email: '', subject: 'General Query', message: '' });
    }, 600);
  };

  return (
    <>
      <Head>
        <title>Contact Us | Last Man On Earth</title>
        <meta name="description" content="Get in touch with Last Man On Earth for support, custom design inquiries, partnerships, or general feedback." />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-14 bg-white border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-4 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                // GET IN TOUCH
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                Let's <span className="text-red-600">Connect.</span>
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                Have a query about your order, want to collaborate on a custom release, or need help with sizing? Reach out to our team below.
              </p>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <section className="py-16 sm:py-20 px-4 sm:px-14 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Direct Info Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
                  <span className="text-xs font-mono font-extrabold uppercase text-red-600 tracking-wider block">// DIRECT CONTACT</span>
                  
                  <div className="space-y-6 divide-y divide-neutral-100">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-none bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Email Support</span>
                        <a href="mailto:lme.india@gmail.com" className="text-sm font-extrabold text-black hover:text-red-600 font-mono transition">
                          lme.india@gmail.com
                        </a>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Average response: under 2 hours</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 rounded-none bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Phone & WhatsApp Support</span>
                        <p className="text-sm font-extrabold text-black font-mono">+91 98765 43210</p>
                        <p className="text-[11px] text-neutral-500 font-mono mt-0.5">Mon - Sat: 10:00 AM - 7:00 PM IST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 pt-6">
                      <div className="w-10 h-10 rounded-none bg-black text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">Studio Address</span>
                        <p className="text-sm font-extrabold text-black">Last Man On Earth Apparel Lab</p>
                        <p className="text-xs text-neutral-600 font-mono">Kerala, India — 682001</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Quick Hub Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <Link
                    href="/designmytee"
                    className="p-5 bg-white border border-neutral-200 hover:border-red-600 shadow-sm transition group"
                  >
                    <Sparkles className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition" />
                    <span className="font-extrabold text-black block uppercase">DesignMyTee Lab</span>
                    <span className="text-neutral-500 text-[11px]">Bespoke custom T-shirt requests →</span>
                  </Link>

                  <Link
                    href="/support"
                    className="p-5 bg-white border border-neutral-200 hover:border-red-600 shadow-sm transition group"
                  >
                    <ShieldCheck className="w-5 h-5 text-red-600 mb-2 group-hover:scale-110 transition" />
                    <span className="font-extrabold text-black block uppercase">Support Portal</span>
                    <span className="text-neutral-500 text-[11px]">Returns, exchanges & tickets →</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-neutral-200 shadow-xl space-y-6">
                <div>
                  <span className="text-xs font-mono font-extrabold uppercase text-red-600 tracking-wider block mb-1">// SEND A MESSAGE</span>
                  <h2 className="text-2xl font-black uppercase text-black tracking-tight">How Can We Help You?</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Subject Category</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                    >
                      <option value="General Query">General Query</option>
                      <option value="Order Tracking & Shipping">Order Tracking & Shipping</option>
                      <option value="Custom DesignMyTee Request">Custom DesignMyTee Request</option>
                      <option value="Press & PR Inquiry">Press & PR Inquiry</option>
                      <option value="Wholesale & Bulk Run">Wholesale & Bulk Run</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Your Message *</label>
                    <textarea
                      rows="5"
                      required
                      placeholder="Write your message details here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs leading-relaxed focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider px-8 py-4 text-xs transition shadow-lg shadow-red-600/20 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
