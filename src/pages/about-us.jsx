import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, Flame, ShieldCheck, Sparkles, Layers, Globe, CheckCircle2 } from 'lucide-react';

const CORE_VALUES = [
  {
    number: "01",
    icon: Flame,
    title: "Heavyweight Foundations",
    description: "Constructed strictly with 240GSM+ 100% combed cotton and heavy French Terry fleece. Built to outlast trends."
  },
  {
    number: "02",
    icon: Layers,
    title: "Artisanal Craftsmanship",
    description: "Designed, screenprinted, and embroidered with high-density puff techniques and reinforced double-needle stitching."
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Exclusive Batch Runs",
    description: "Strict limited-edition drops. Once a collection sells out, it is archived forever into the LME vault."
  },
  {
    number: "04",
    icon: Globe,
    title: "India-Rooted Culture",
    description: "Handcrafted locally with pride, empowering homegrown master artisans while pushing global streetwear standards."
  }
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Last Man On Earth</title>
        <meta name="description" content="Last Man On Earth is a streetwear movement redefining fashion through heavyweight fabrics, bold graphics, and uncompromising individualism." />
      </Head>

      <main className="min-h-screen bg-white text-black font-sans selection:bg-red-600 selection:text-white">
        
        {/* ========================================================================= */}
        {/* 1. HERO MANIFESTO SECTION                                                 */}
        {/* ========================================================================= */}
        <section className="relative pt-24 sm:pt-32 pb-20 px-4 sm:px-14 bg-white border-b border-neutral-200 overflow-hidden">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Asymmetric Manifesto */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                  // THE LME MANIFESTO
                </span>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
                  Stand Alone. <br />
                  <span className="text-red-600">Define Your Era.</span>
                </h1>

                <p className="text-neutral-600 text-sm sm:text-base md:text-lg leading-relaxed font-medium max-w-xl">
                  Welcome to <strong className="text-black font-extrabold">Last Man On Earth</strong>. We don’t follow fast fashion cycles — we build armor for the bold, the quiet rebels, and those who define their own path.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/shop"
                    className="bg-red-600 hover:bg-black text-white font-black uppercase tracking-wider px-8 py-4 text-xs transition shadow-xl shadow-red-600/20 flex items-center gap-2 group"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </Link>

                  <Link
                    href="/designmytee"
                    className="bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 font-mono font-bold text-xs px-6 py-4 transition flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-red-600" />
                    <span>Custom Apparel Lab</span>
                  </Link>
                </div>

                {/* Quick Spec Metrics */}
                <div className="pt-6 border-t border-neutral-100 grid grid-cols-3 gap-4 text-xs font-mono text-neutral-500">
                  <div>
                    <span className="text-black font-extrabold block text-sm">240GSM+</span>
                    <span>Heavy Cotton</span>
                  </div>
                  <div>
                    <span className="text-black font-extrabold block text-sm">100% INDIA</span>
                    <span>Artisanal Crafted</span>
                  </div>
                  <div>
                    <span className="text-black font-extrabold block text-sm">ZERO</span>
                    <span>Fast Fashion</span>
                  </div>
                </div>
              </div>

              {/* Right Column: High-Impact Optimized Image Banner Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900 border border-black shadow-2xl transform -rotate-1 hover:rotate-0 transition duration-300">
                  <img
                    src="/images/home/hero-1.png"
                    alt="Last Man On Earth Studio"
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 font-mono">
                    <span className="bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 inline-block">
                      ORIGINAL STREETWEAR
                    </span>
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">Last Man On Earth</h3>
                    <p className="text-xs text-neutral-300">Bespoke Apparel & Culture Lab</p>
                  </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute -bottom-4 -right-4 bg-black text-white p-4 border border-neutral-800 shadow-2xl hidden sm:block max-w-[200px] font-mono text-xs">
                  <span className="text-red-500 font-extrabold block uppercase">// REBEL PROOF</span>
                  <p className="text-neutral-300 text-[11px] mt-0.5">Heavyweight fits engineered for maximum longevity.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR CORE PILLARS GRID                                                  */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-neutral-50 border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              
              {/* Left Column Header */}
              <div className="lg:col-span-4 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                  // OUR PILLARS
                </span>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                  Built With <span className="text-red-600">Purpose</span>
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                  We blend raw street culture, heavy fabrics, and uncompromising design to outfit modern visionaries.
                </p>
              </div>

              {/* Right Column 2x2 Feature Grid */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CORE_VALUES.map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={item.number}
                      className="group relative p-6 sm:p-8 bg-white text-black border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300 transition duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                            <IconComp className="w-5 h-5" />
                          </div>

                          <span className="font-mono text-xs font-black tracking-widest text-neutral-400">
                            [ {item.number} ]
                          </span>
                        </div>

                        <h3 className="text-xl font-black uppercase tracking-tight text-black group-hover:text-red-600 transition duration-200 mb-3">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. STORY & CRAFTSMANSHIP SPLIT SECTION                                     */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-white border-b border-neutral-200">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <span className="text-xs font-mono uppercase tracking-widest text-red-600 font-extrabold block">
                  // CRAFTED IN INDIA
                </span>
                <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black leading-none">
                  Uncompromising <br />
                  <span className="text-red-600">Artisanal Quality</span>
                </h2>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                  Every stitch, drop shoulder contour, and graphic screenprint is tested for longevity. We work directly with domestic textile mills to formulate custom GSM weaves that hold shape after hundreds of washes.
                </p>

                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>Double-stitched reinforced collar & shoulder seams</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>Eco-friendly water-based discharge & high-density puff inks</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <span>100% plastic-free recyclable shipping mailers</span>
                  </div>
                </div>
              </div>

              {/* Stats Highlight Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-neutral-950 text-white border border-black shadow-xl space-y-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-red-600">100%</span>
                  <span className="text-xs font-mono text-neutral-400 block uppercase">Combed Indian Cotton</span>
                </div>
                <div className="p-6 bg-neutral-50 text-black border border-neutral-200 shadow-sm space-y-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-black">240+</span>
                  <span className="text-xs font-mono text-neutral-500 block uppercase">GSM Garment Weight</span>
                </div>
                <div className="p-6 bg-neutral-50 text-black border border-neutral-200 shadow-sm space-y-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-black">50K+</span>
                  <span className="text-xs font-mono text-neutral-500 block uppercase">Rebels Outfitted</span>
                </div>
                <div className="p-6 bg-red-600 text-white border border-red-700 shadow-xl space-y-2">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">0%</span>
                  <span className="text-xs font-mono text-red-100 block uppercase">Plastic Waste Packaging</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. HIGH-IMPACT FINAL CTA ("STAND ALONE, STAND STRONG")                    */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-4 sm:px-14 bg-black text-white relative overflow-hidden">
          <div className="container mx-auto max-w-7xl relative z-10 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-black block">
              // JOIN THE MOVEMENT
            </span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-white leading-none">
              Stand Alone, <br />
              <span className="text-red-600">Stand Strong.</span>
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto font-mono leading-relaxed">
              Fashion is culture, expression, and community. Be part of the movement and wear armor designed for the bold.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase tracking-wider px-10 py-5 text-sm transition shadow-2xl shadow-red-600/30 flex items-center gap-2 group"
              >
                <span>Shop New Drops</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
