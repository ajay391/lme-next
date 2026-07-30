"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Clock, Flame, Bell, CheckCircle2 } from "lucide-react";
import { initGSAP, setupMagneticEffect } from "../lib/gsap";

const upcomingDrops = [
  {
    id: "drop-02",
    title: "SPEED DEMON // OVERSIZED HOODIE",
    date: "AUG 05, 2026",
    time: "20:00 IST",
    status: "NEXT DROP",
    allocation: 88,
    image: "/images/home/new-3.png",
    category: "Heavyweight French Terry (450 GSM)",
    description: "Distressed motorsport livery graphic print with reflective back logo.",
  },
  {
    id: "drop-03",
    title: "CIRCUIT RUNNER // RACING JACKET",
    date: "AUG 12, 2026",
    time: "20:00 IST",
    status: "CONFIRMED",
    allocation: 64,
    image: "/images/home/new-5.png",
    category: "Structured Canvas & Nylon",
    description: "Double-zipper tactical track jacket with custom hardware detailing.",
  },
  {
    id: "drop-04",
    title: "GHOST MOTO // ARCHIVE RESTOCK",
    date: "AUG 19, 2026",
    time: "20:00 IST",
    status: "LIMITED RESTOCK",
    allocation: 95,
    image: "/images/home/new-1.png",
    category: "Raw-Edge Oversized Tee",
    description: "Final archive restock of the iconic Ghost Moto graphic tee.",
  },
];

export default function DropCalendar() {
  const [selectedDrop, setSelectedDrop] = useState(upcomingDrops[0]);
  const [notified, setNotified] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 14, minutes: 22, seconds: 45 });
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const { gsap } = initGSAP();

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".drop-card"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (progressBarRef.current) {
      gsap.fromTo(
        progressBarRef.current,
        { width: "0%" },
        {
          width: `${selectedDrop.allocation}%`,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: progressBarRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (buttonRef.current) {
      const cleanup = setupMagneticEffect(buttonRef.current, 0.4);
      return cleanup;
    }
  }, [selectedDrop]);

  const handleNotifyMe = () => {
    setNotified(true);
    toast.success(`Reminder set for ${selectedDrop.title}! We'll alert you 15m before launch.`);
    setTimeout(() => setNotified(false), 4000);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 px-3 sm:px-14 bg-white text-black border-b border-neutral-200 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-16 gap-4 sm:gap-6 border-b border-neutral-200 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest glow-chip-red mb-3">
              <Flame className="w-3.5 h-3.5" />
              <span>THE DROP CALENDAR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-black leading-tight">
              Upcoming Releases & Restocks
            </h2>
          </div>

          <div className="text-neutral-600 text-xs font-mono uppercase tracking-widest flex items-center space-x-2">
            <Clock className="w-4 h-4 text-red-600 animate-pulse shrink-0" />
            <span>Next Launch: <strong className="text-black font-extrabold">Aug 05 @ 8:00 PM IST</strong></span>
          </div>
        </div>

        {/* Featured Live Countdown Banner */}
        <div className="bg-neutral-50 border border-neutral-200 p-4 sm:p-8 md:p-12 mb-12 sm:mb-16 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            {/* Left: Product Info & Allocation */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap gap-y-1">
                <span className="px-2.5 py-1 bg-black text-white font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest">
                  DROP 02 FEATURE
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  // LIMITED QUANTITY BATCH
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-tight">
                {selectedDrop.title}
              </h3>

              <p className="text-neutral-700 text-xs sm:text-base leading-relaxed font-medium">
                {selectedDrop.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-xs font-mono text-neutral-600 gap-1">
                  <span className="text-black font-extrabold uppercase tracking-wider text-[11px] sm:text-xs">PRE-LAUNCH RESERVATION STATUS</span>
                  <span className="text-red-600 font-extrabold text-[11px] sm:text-xs">{selectedDrop.allocation}% CLAIMED</span>
                </div>
                <div className="w-full h-3 bg-neutral-200 border border-neutral-300 overflow-hidden relative">
                  <div
                    ref={progressBarRef}
                    className="h-full bg-gradient-to-r from-red-700 to-red-500 relative transition-all duration-500"
                    style={{ width: `${selectedDrop.allocation}%` }}
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-widest pt-1 gap-1">
                  <span className="whitespace-nowrap">Batch Created: 500 Pcs</span>
                  <span className="text-neutral-700 font-bold whitespace-nowrap">Only {Math.round(500 * (1 - selectedDrop.allocation / 100))} Pcs Remaining</span>
                </div>
              </div>
            </div>

            {/* Right: Live Ticking Digits Box */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center bg-white border border-neutral-200 p-4 sm:p-6 md:p-8 shadow-sm w-full">
              <span className="text-[10px] sm:text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-3 sm:mb-4 font-bold">
                COUNTDOWN TO LAUNCH
              </span>

              {/* Mobile-optimized Digits Grid */}
              <div className="grid grid-cols-4 gap-1.5 sm:gap-3 text-center w-full mb-6 sm:mb-8">
                {[
                  { label: "DAYS", value: timeLeft.days },
                  { label: "HRS", value: timeLeft.hours },
                  { label: "MINS", value: timeLeft.minutes },
                  { label: "SECS", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="bg-neutral-100 border border-neutral-200 p-2 sm:p-3 shadow-inner flex flex-col justify-center items-center">
                    <span className="text-xl sm:text-3xl md:text-4xl font-black font-mono text-black leading-none py-1">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] sm:text-[10px] font-mono text-red-600 font-extrabold tracking-wider sm:tracking-widest mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Set Reminder Button */}
              <button
                ref={buttonRef}
                onClick={handleNotifyMe}
                disabled={notified}
                className="w-full py-3.5 sm:py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest flex items-center justify-center space-x-2 sm:space-x-3 transition duration-300 shadow-xl"
              >
                {notified ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                    <span>REMINDER SET!</span>
                  </>
                ) : (
                  <>
                    <Bell className="w-4 h-4 shrink-0" />
                    <span>SET LAUNCH REMINDER</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Drop Calendar Schedule List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {upcomingDrops.map((drop) => {
            const isSelected = selectedDrop.id === drop.id;
            return (
              <div
                key={drop.id}
                onClick={() => setSelectedDrop(drop)}
                className={`drop-card cursor-pointer p-4 sm:p-6 bg-white border transition-all duration-300 ${
                  isSelected
                    ? "border-red-600 shadow-xl shadow-red-600/10 scale-[1.01]"
                    : "border-neutral-200 hover:border-neutral-400 opacity-90 hover:opacity-100 shadow-sm"
                }`}
              >
                <div className="relative aspect-[4/3] w-full mb-4 bg-neutral-100 overflow-hidden border border-neutral-200">
                  <Image
                    src={drop.image}
                    alt={drop.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-black text-white text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 tracking-widest">
                    {drop.status}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500 flex justify-between items-center">
                    <span>{drop.date}</span>
                    <span className="text-red-600 font-bold">{drop.time}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold uppercase text-black truncate">
                    {drop.title}
                  </h4>
                  <p className="text-neutral-600 text-xs line-clamp-2">
                    {drop.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
