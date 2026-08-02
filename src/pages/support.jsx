'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, Package, RefreshCw, Send, FileText, CheckCircle2, MessageSquare, ArrowRight, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    issueCategory: 'order',
    description: ''
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.description.trim()) {
      toast.error('Please enter your email and issue description.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket({
        id: ticketId,
        orderId: formData.orderId || 'N/A',
        email: formData.email,
        category: formData.issueCategory,
        timestamp: new Date().toLocaleString()
      });
      toast.success(`Support ticket ${ticketId} created successfully!`);
    }, 600);
  };

  return (
    <>
      <Head>
        <title>Customer Support Portal | Last Man On Earth</title>
        <meta name="description" content="Submit a customer support ticket for order tracking, size returns, exchanges, or technical issues at Last Man On Earth." />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
        
        {/* HERO HEADER */}
        <section className="relative pt-24 sm:pt-32 pb-16 px-4 sm:px-14 bg-white border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-4 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                // HELP & TICKET DESK
              </span>
              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-black leading-none">
                Customer <span className="text-red-600">Support</span>
              </h1>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                Need assistance with an order dispatch, size exchange, return, or technical issue? Submit a ticket below for priority resolution.
              </p>
            </div>
          </div>
        </section>

        {/* SELF-SERVICE ACTION CARDS */}
        <section className="py-12 px-4 sm:px-14 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-neutral-200 shadow-sm space-y-3">
                <Package className="w-8 h-8 text-red-600 mb-1" />
                <h3 className="text-base font-black uppercase text-black">Track Shipment</h3>
                <p className="text-xs text-neutral-600 font-mono leading-relaxed">
                  Track live delivery dispatch status for active orders directly in your user profile.
                </p>
                <Link href="/profile?tab=orders" className="text-xs font-mono font-bold text-red-600 hover:text-black inline-flex items-center gap-1 pt-1">
                  Go to My Orders →
                </Link>
              </div>

              <div className="p-6 bg-white border border-neutral-200 shadow-sm space-y-3">
                <RefreshCw className="w-8 h-8 text-red-600 mb-1" />
                <h3 className="text-base font-black uppercase text-black">Returns & Exchanges</h3>
                <p className="text-xs text-neutral-600 font-mono leading-relaxed">
                  7-day hassle-free size exchange window on unworn garments with original tags intact.
                </p>
                <Link href="/faqs" className="text-xs font-mono font-bold text-red-600 hover:text-black inline-flex items-center gap-1 pt-1">
                  Read Return Policy →
                </Link>
              </div>

              <div className="p-6 bg-white border border-neutral-200 shadow-sm space-y-3">
                <MessageSquare className="w-8 h-8 text-red-600 mb-1" />
                <h3 className="text-base font-black uppercase text-black">WhatsApp Live Help</h3>
                <p className="text-xs text-neutral-600 font-mono leading-relaxed">
                  Chat directly with our customer care representatives on WhatsApp for urgent queries.
                </p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-bold text-red-600 hover:text-black inline-flex items-center gap-1 pt-1">
                  Open WhatsApp Chat →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TICKET FORM SECTION */}
        <section className="py-16 sm:py-20 px-4 sm:px-14 bg-white border-b border-neutral-200">
          <div className="container mx-auto max-w-3xl">
            <div className="bg-white p-6 sm:p-10 border border-neutral-200 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs font-mono font-extrabold uppercase text-red-600 tracking-wider block mb-1">// PRIORITY TICKET SYSTEM</span>
                <h2 className="text-2xl font-black uppercase text-black tracking-tight">Submit Support Request</h2>
                <p className="text-xs text-neutral-500 font-mono mt-1">Guaranteed response within 24 business hours.</p>
              </div>

              {submittedTicket ? (
                <div className="p-6 bg-neutral-950 text-white space-y-4 border border-black shadow-xl text-center">
                  <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center rounded-full mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase block">// TICKET CREATED</span>
                    <h3 className="text-xl font-black uppercase text-white mt-1">Support Ticket Submitted!</h3>
                    <p className="text-xs text-neutral-400 font-mono mt-1">Our support team has received your ticket.</p>
                  </div>

                  <div className="p-4 bg-neutral-900 border border-neutral-800 text-left font-mono text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Ticket ID:</span>
                      <span className="font-bold text-red-500">{submittedTicket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Order ID:</span>
                      <span className="text-white">{submittedTicket.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Email Address:</span>
                      <span className="text-white">{submittedTicket.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="bg-red-600 hover:bg-white hover:text-black text-white font-mono font-bold text-xs px-6 py-3 uppercase transition"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Order ID (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. ORD-9821"
                        value={formData.orderId}
                        onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Your Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Issue Category *</label>
                    <select
                      value={formData.issueCategory}
                      onChange={(e) => setFormData({ ...formData, issueCategory: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs font-mono focus:outline-none focus:border-red-600"
                    >
                      <option value="order">Order Tracking & Delivery</option>
                      <option value="return">Return / Size Exchange Request</option>
                      <option value="custom">Custom DesignMyTee Inquiry</option>
                      <option value="payment">Payment & Refund Issue</option>
                      <option value="defective">Defective / Damaged Item</option>
                      <option value="technical">Technical Website Issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-extrabold text-neutral-500 uppercase block mb-1">Detailed Description of Issue *</label>
                    <textarea
                      rows="5"
                      required
                      placeholder="Please describe your issue in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 p-3 text-black text-xs leading-relaxed focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider px-8 py-4 text-xs transition shadow-lg shadow-red-600/20 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Ticket...' : 'Submit Support Request'}</span>
                  </button>
                </form>
              )}

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
