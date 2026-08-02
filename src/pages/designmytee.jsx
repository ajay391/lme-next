'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { createNewDesignRequest } from '../utils/designMyTeeStore';
import WorkflowDiagramModal from '../components/designmytee/WorkflowDiagramModal';
import {
  Sparkles,
  Palette,
  Upload,
  Layers,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Shirt,
  FileCheck,
  X,
  Network,
  ChevronLeft,
  ChevronRight,
  Flame,
  Eye,
  Sliders,
  Check
} from 'lucide-react';
import toast from 'react-hot-toast';

const CREATION_EXAMPLES = [
  {
    id: 1,
    title: 'Cyberpunk Cyber-Tiger Graphic',
    type: 'Oversized Heavyweight Tee',
    technique: 'Screen Print + Neon Foil',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    tag: 'Neon Cyberpunk',
    qty: '50 units batch'
  },
  {
    id: 2,
    title: 'Vintage Botanical Peony & Skull',
    type: 'Heavyweight Fleece Hoodie',
    technique: 'High-Density Embroidery',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    tag: 'Embroidery Special',
    qty: '100 units batch'
  },
  {
    id: 3,
    title: '90s Distressed Skate Typography',
    type: 'Acid Wash Vintage Tee',
    technique: 'Distressed Puff Print',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&auto=format&fit=crop&q=80',
    tag: 'Streetwear Nostalgia',
    qty: '75 units batch'
  },
  {
    id: 4,
    title: 'Minimalist Boutique Crest Monogram',
    type: 'Piqué Cotton Polo Shirt',
    technique: 'Tone-on-Tone Crest Stitching',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tag: 'Bespoke Luxury',
    qty: '30 units batch'
  },
  {
    id: 5,
    title: 'Acid Wash Gothic Crest Hoodie',
    type: 'French Terry Pullover',
    technique: 'Discharge Print + Distressed Hem',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
    tag: 'Limited Run',
    qty: '60 units batch'
  }
];

export default function DesignMyTeePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDiagramOpen, setIsDiagramOpen] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: 'Marcus Sterling',
    email: 'marcus@example.com',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield',
    title: '',
    description: '',
    tshirtType: 'Oversized Heavyweight Tee',
    placement: 'Back Graphic & Front Left Chest',
    quantity: '50',
    budgetRange: '$500 - $1,000',
    deadline: '2026-08-30',
    consentChecked: false,
    preferredColors: ['#000000', '#FF0055', '#00F0FF']
  });

  const [refImages, setRefImages] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80', title: 'Cyberpunk Reference' }
  ]);
  const [dragOver, setDragOver] = useState(false);

  // Lock body scroll when modal is open
  if (typeof window !== 'undefined') {
    if (isFormOpen || isDiagramOpen || submittedRequest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please enter a design title and detailed description.');
      return;
    }
    if (!formData.consentChecked) {
      toast.error('Please accept the consent terms to submit your request.');
      return;
    }

    const created = createNewDesignRequest({
      ...formData,
      referenceImages: refImages
    });

    setSubmittedRequest(created);
    setIsFormOpen(false);
    toast.success(`Request submitted successfully! Tracking ID: ${created.id}`);
  };

  const handleAddSampleRef = () => {
    const samples = [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
    ];
    const randomUrl = samples[Math.floor(Math.random() * samples.length)];
    setRefImages(prev => [...prev, { id: String(Date.now()), url: randomUrl, title: `Reference #${prev.length + 1}` }]);
    toast.success('Sample reference image uploaded!');
  };

  return (
    <>
      <Head>
        <title>DesignMyTee | Custom T-Shirt Creation Lab</title>
        <meta name="description" content="Collaborate with elite apparel designers to create bespoke custom streetwear, oversized graphic tees, and hoodies." />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
        
        {/* ========================================================================= */}
        {/* 1. ASYMMETRIC / LEFT-ALIGNED HERO WITH MOOD-BOARD COLLAGE                */}
        {/* ========================================================================= */}
        <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-14 bg-white border-b border-neutral-200 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Asymmetric Left-Aligned Manifesto */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                  // BESPOKE STUDIO
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
                  Create Your <br />
                  <span className="text-red-600">Custom T-Shirt</span>
                </h1>

                <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-xl">
                  From initial concept sketch to high-density production print. Collaborate 1-on-1 with senior apparel designers to engineer your signature custom collection.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider px-8 py-4 text-xs transition shadow-xl shadow-red-600/20 flex items-center gap-2 group"
                  >
                    <span>Start Your Design Request</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </button>

                  <button
                    onClick={() => setIsDiagramOpen(true)}
                    className="bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 font-mono font-bold text-xs px-6 py-4 transition flex items-center gap-2"
                  >
                    <Network className="w-4 h-4 text-red-600" />
                    <span>How It Works Workflow</span>
                  </button>
                </div>

                {/* Quick Trust Badges */}
                <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4 text-xs font-mono text-neutral-500">
                  <div>
                    <span className="text-black font-extrabold block text-sm">240GSM+</span>
                    <span>Heavy Cotton</span>
                  </div>
                  <div>
                    <span className="text-black font-extrabold block text-sm">1-ON-1</span>
                    <span>Pro Designers</span>
                  </div>
                  <div>
                    <span className="text-black font-extrabold block text-sm">7-14 DAYS</span>
                    <span>Production</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Mood-Board Style Collage */}
              <div className="lg:col-span-5 relative min-h-[420px] sm:min-h-[480px] flex items-center justify-center">
                {/* Ambient Red Glow Backdrop */}
                <div className="absolute w-72 h-72 rounded-full bg-red-600/15 blur-3xl pointer-events-none z-0" />

                {/* Main Central Card */}
                <div className="relative z-10 w-full max-w-sm bg-neutral-950 text-white p-4 border border-black shadow-2xl transform -rotate-2 hover:rotate-0 transition duration-300">
                  <div className="relative h-64 overflow-hidden bg-neutral-900 border border-neutral-800">
                    <img
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
                      alt="Cyberpunk Mockup"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white font-mono text-[9px] font-black uppercase px-2 py-0.5">
                      CONCEPT DRAFT V2
                    </span>
                  </div>
                  <div className="pt-3 flex items-center justify-between font-mono text-xs">
                    <span className="font-extrabold uppercase text-white">Cyber Tiger Tee</span>
                    <span className="text-neutral-400 text-[10px]">[ DMT-1021 ]</span>
                  </div>
                </div>

                {/* Overlapping Top-Right Swatch Chip */}
                <div className="absolute top-2 right-0 z-20 bg-white border border-neutral-200 p-3 shadow-xl transform rotate-6 max-w-[160px]">
                  <span className="text-[9px] font-mono font-extrabold uppercase text-neutral-400 block mb-1">Color Palette</span>
                  <div className="flex gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-black border border-neutral-300" />
                    <span className="w-5 h-5 rounded-full bg-red-600 border border-neutral-300" />
                    <span className="w-5 h-5 rounded-full bg-cyan-400 border border-neutral-300" />
                  </div>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1 block">Hex Spec Sync</span>
                </div>

                {/* Overlapping Bottom-Left Tech Spec Chip */}
                <div className="absolute bottom-2 left-0 z-20 bg-black text-white p-3.5 border border-neutral-800 shadow-2xl transform -rotate-3 max-w-[200px]">
                  <div className="flex items-center gap-1.5 text-red-500 font-mono text-[10px] font-extrabold uppercase">
                    <Flame className="w-3.5 h-3.5" /> High-Density Print
                  </div>
                  <p className="text-[11px] font-bold mt-1 text-neutral-200">Puff Screenprint & Tonal Embroidery</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. 4-STEP WORKFLOW TIMELINE STRIP (GHOST NUMERALS & ICON CHIPS)           */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-neutral-50 border-b border-neutral-200 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                // THE PROCESS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
                Seamless 4-Step Workflow
              </h2>
              <p className="text-neutral-600 text-sm font-medium">
                Engineered for speed, precision, and complete creative transparency.
              </p>
            </div>

            {/* Timeline Strip */}
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-neutral-200 z-0" />

              {[
                {
                  num: '01',
                  icon: Upload,
                  title: 'Submit Brief',
                  desc: 'Specify design title, drag-and-drop references, colors, garment type, and target deadline.'
                },
                {
                  num: '02',
                  icon: Layers,
                  title: 'Designer Assigned',
                  desc: 'Admin triages brief specs and assigns dedicated senior apparel specialist inside Admin portal.'
                },
                {
                  num: '03',
                  icon: Clock,
                  title: 'Revisions & Chat',
                  desc: 'Inspect initial concept drafts (v1, v2), chat via ticket thread, and request exact tweaks.'
                },
                {
                  num: '04',
                  icon: CheckCircle2,
                  title: 'Approve & Produce',
                  desc: 'Approve final artwork. Admin converts design directly into factory production order.'
                }
              ].map((step) => {
                const IconComp = step.icon;
                return (
                  <div key={step.num} className="relative z-10 bg-white p-6 sm:p-8 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300 transition group flex flex-col justify-between">
                    <div>
                      {/* Ghost Numeral Header */}
                      <div className="flex items-center justify-between mb-6">
                        {/* Icon Chip matching "Why LME" style */}
                        <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          <IconComp className="w-5 h-5" />
                        </div>

                        {/* Sequence Marker [ 01 ] */}
                        <span className="font-mono text-xs font-black tracking-widest text-neutral-400">
                          [ {step.num} ]
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black uppercase tracking-tight text-black group-hover:text-red-600 transition duration-200 mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EXAMPLE CREATIONS HORIZONTAL SHOWCASE CAROUSEL                         */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-white border-b border-neutral-200 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            {/* Header with Nav Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block mb-1">
                  // RECENT CREATIONS SHOWCASE
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
                  Proven Bespoke Runs
                </h2>
              </div>

              {/* Navigation Arrows matching Homepage Showcase */}
              <div className="flex items-center space-x-3">
                <button
                  ref={prevRef}
                  className="w-12 h-12 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-300 flex items-center justify-center transition duration-200"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  ref={nextRef}
                  className="w-12 h-12 bg-neutral-100 hover:bg-black hover:text-white border border-neutral-300 flex items-center justify-center transition duration-200"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Swiper Showcase Carousel */}
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              className="w-full"
            >
              {CREATION_EXAMPLES.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="group relative bg-neutral-50 border border-neutral-200 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-neutral-400 hover:shadow-xl">
                    <div className="relative h-72 w-full bg-neutral-900 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-red-600 text-white font-mono text-[10px] font-black uppercase px-2.5 py-0.5">
                        {item.tag}
                      </span>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase block">{item.type}</span>
                        <h3 className="text-base font-black text-black uppercase tracking-tight group-hover:text-red-600 transition mt-0.5">
                          {item.title}
                        </h3>
                      </div>

                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                        <span className="text-neutral-500">{item.technique}</span>
                        <span className="text-black font-extrabold">{item.qty}</span>
                      </div>

                      <button
                        onClick={() => setIsFormOpen(true)}
                        className="w-full mt-2 bg-neutral-100 hover:bg-red-600 hover:text-white text-black font-mono text-xs font-extrabold py-2.5 uppercase transition duration-200 flex items-center justify-center gap-1.5"
                      >
                        <span>Customize Like This</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FINAL HIGH-IMPACT CTA PANEL ("STAND ALONE, STAND STRONG")             */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-black text-white relative overflow-hidden">
          {/* Ambient Red Glow Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/20 blur-[140px] pointer-events-none" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: High-Impact Typography */}
              <div className="lg:col-span-8 space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-black block">
                  // BESPOKE APPAREL RUNS
                </span>
                <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                  Stand Alone, <br />
                  <span className="text-red-600">Stand Strong.</span>
                </h2>
                <p className="text-neutral-300 text-sm sm:text-base max-w-xl font-mono leading-relaxed">
                  Join over 1,250+ custom batch runs delivered across 450+ streetwear brands, teams, and artists nationwide.
                </p>

                {/* Actual Real Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-neutral-800">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-red-500">1,250+</span>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">Batches Completed</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white">450+</span>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">Brands & Teams</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white">99.4%</span>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">Approval Rate</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-red-500">7-14 Days</span>
                    <span className="text-[11px] font-mono text-neutral-400 block uppercase">Turnaround</span>
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Trigger */}
              <div className="lg:col-span-4 flex justify-start lg:justify-end">
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="w-full sm:w-auto bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase tracking-wider px-10 py-5 text-sm transition shadow-2xl shadow-red-600/30 flex items-center justify-center gap-2 group"
                >
                  <span>Start Your Design Request Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SUCCESS SCREEN MODAL                                                      */}
        {/* ========================================================================= */}
        {submittedRequest && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" data-lenis-prevent>
            <div className="bg-white border border-neutral-200 max-w-lg w-full p-8 text-center space-y-6 shadow-2xl" data-lenis-prevent>
              <div className="w-16 h-16 bg-red-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-black text-red-600 uppercase tracking-widest block">// SUBMISSION SUCCESSFUL</span>
                <h3 className="text-2xl font-black text-black uppercase mt-1">Design Request Submitted!</h3>
                <p className="text-xs text-neutral-500 font-mono mt-2">Your request is registered in our Admin system.</p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 text-left space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Tracking Request ID:</span>
                  <span className="font-bold text-red-600 text-sm">{submittedRequest.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Design Title:</span>
                  <span className="text-black font-bold truncate max-w-xs">{submittedRequest.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Garment Type:</span>
                  <span className="text-neutral-800">{submittedRequest.tshirtType}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/profile?tab=design-requests"
                  className="flex-1 bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider py-3.5 text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20"
                >
                  <span>Track on Profile Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setSubmittedRequest(null)}
                  className="bg-neutral-100 hover:bg-neutral-200 text-black font-mono font-bold text-xs py-3.5 px-4 transition border border-neutral-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* DESIGN REQUEST FORM MODAL                                                 */}
        {/* ========================================================================= */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
            <div className="bg-white border border-neutral-300 max-w-3xl w-full overflow-hidden shadow-2xl my-auto max-h-[92vh] flex flex-col text-black" data-lenis-prevent>
              {/* Modal Top Bar */}
              <div className="p-5 bg-black text-white flex items-center justify-between border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-red-600" />
                  <h3 className="text-base font-black uppercase tracking-wider text-white">Submit Custom T-Shirt Design Request</h3>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="text-neutral-400 hover:text-white p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-6 text-xs font-sans" data-lenis-prevent>
                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-neutral-50 border border-neutral-200">
                  <div>
                    <label className="text-[10px] font-mono font-black text-neutral-500 uppercase block mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-red-600 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-black text-neutral-500 uppercase block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2.5 text-black focus:outline-none focus:border-red-600 font-mono text-xs"
                    />
                  </div>
                </div>

                {/* Request Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-mono font-black text-neutral-500 uppercase block mb-1">Design Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cyberpunk Neon Tiger Graphic Tee"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-3 text-black text-sm focus:outline-none focus:border-red-600 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-black text-neutral-500 uppercase block mb-1">Detailed Design Description *</label>
                    <textarea
                      rows="3"
                      required
                      placeholder="Describe artwork concepts, mood, typography text, graphic style, illustrations, line weights..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-3 text-black text-xs leading-relaxed focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Drag and Drop Reference Images */}
                <div>
                  <label className="text-[10px] font-mono font-black text-neutral-500 uppercase block mb-1">Reference Images Upload (Drag & Drop)</label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleAddSampleRef(); }}
                    className={`border-2 border-dashed p-6 text-center transition ${
                      dragOver ? 'border-red-600 bg-red-50/50' : 'border-neutral-300 bg-neutral-50'
                    }`}
                  >
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-xs text-black font-bold">Drag & drop reference images here, or browse files</p>
                    <p className="text-[10px] text-neutral-400 font-mono mt-1">Supports PNG, JPG, WEBP, SVG (Max 10MB)</p>
                    <button
                      type="button"
                      onClick={handleAddSampleRef}
                      className="mt-3 bg-white hover:bg-neutral-100 text-black font-mono text-[11px] font-bold px-3 py-1.5 border border-neutral-300 inline-flex items-center gap-1 shadow-sm"
                    >
                      + Add Sample Reference Image
                    </button>
                  </div>

                  {refImages.length > 0 && (
                    <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                      {refImages.map((img) => (
                        <div key={img.id} className="relative w-20 h-20 overflow-hidden border border-neutral-300 flex-shrink-0">
                          <img src={img.url} alt="Ref" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specs Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono">
                  <div>
                    <label className="text-[10px] font-black text-neutral-500 uppercase block mb-1">T-Shirt Type</label>
                    <select
                      value={formData.tshirtType}
                      onChange={(e) => setFormData({ ...formData, tshirtType: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2 text-black"
                    >
                      <option value="Oversized Heavyweight Tee">Oversized Heavyweight Tee</option>
                      <option value="Regular Fit Crewneck">Regular Fit Crewneck</option>
                      <option value="Heavyweight Fleece Hoodie">Heavyweight Fleece Hoodie</option>
                      <option value="Piqué Cotton Polo Shirt">Piqué Cotton Polo Shirt</option>
                      <option value="Acid Wash Vintage Tee">Acid Wash Vintage Tee</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-neutral-500 uppercase block mb-1">Print Placement</label>
                    <select
                      value={formData.placement}
                      onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2 text-black"
                    >
                      <option value="Front & Back">Front & Back</option>
                      <option value="Front Only">Front Graphic Only</option>
                      <option value="Back Graphic & Left Chest">Back Graphic & Left Chest</option>
                      <option value="Sleeve & Chest">Sleeve & Chest Print</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-neutral-500 uppercase block mb-1">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2 text-black"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-neutral-500 uppercase block mb-1">Budget Range</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-white border border-neutral-300 p-2 text-black"
                    >
                      <option value="$200 - $500">$200 - $500</option>
                      <option value="$500 - $1,000">$500 - $1,000</option>
                      <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                      <option value="$2,500+">$2,500+</option>
                    </select>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-center gap-2 p-3 bg-neutral-50 border border-neutral-200">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consentChecked}
                    onChange={(e) => setFormData({ ...formData, consentChecked: e.target.checked })}
                    className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-neutral-300"
                  />
                  <label htmlFor="consent" className="text-xs text-neutral-600 font-mono cursor-pointer">
                    I agree to the DesignMyTee custom terms & review lifecycle.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="flex justify-end gap-3 pt-2 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2.5 text-xs text-neutral-500 hover:text-black font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider px-6 py-3 text-xs transition shadow-lg shadow-red-600/20 flex items-center gap-2"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Submit Design Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Workflow Diagram Modal */}
        <WorkflowDiagramModal isOpen={isDiagramOpen} onClose={() => setIsDiagramOpen(false)} />
      </main>
    </>
  );
}
