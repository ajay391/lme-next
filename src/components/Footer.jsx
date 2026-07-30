"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, Phone, ArrowUpRight } from "lucide-react";
import { initGSAP } from "../lib/gsap";

export default function Footer() {
  const footerRef = useRef(null);
  const socialIconsRef = useRef([]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP();

    if (footerRef.current && socialIconsRef.current.length > 0) {
      gsap.fromTo(
        socialIconsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white grain-overlay border-t border-neutral-900 pt-16">
      <div className="container mx-auto px-4 sm:px-14 pb-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Info Column */}
        <div className="md:col-span-5 space-y-6">
          <Link href="/" className="inline-block">
            <h3 className="text-3xl font-black tracking-tighter uppercase text-white">
              LAST MAN ON <span className="text-red-600">EARTH</span>
            </h3>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            Post-apocalyptic oversized streetwear. Designed for high velocity, built with heavyweight cotton, and forged for street rebellion.
          </p>

          {/* Social Icons Stagger Fade In */}
          <div className="flex items-center space-x-4 pt-2">
            {[
              { icon: Instagram, href: "https://www.instagram.com/lastmanonearth.in?igsh=eXBrcWN6YjBvZWpv", label: "Instagram" },
              { icon: Facebook, href: "#", label: "Facebook" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map((social, idx) => {
              const IconComp = social.icon;
              return (
                <a
                  key={social.label}
                  ref={(el) => (socialIconsRef.current[idx] = el)}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-red-600 hover:border-red-600 flex items-center justify-center transition duration-300 shadow-lg"
                >
                  <IconComp className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            // NAVIGATION
          </h4>
          <ul className="space-y-3 text-xs font-extrabold uppercase tracking-widest text-neutral-300">
            {["Shop", "About Us", "Support", "FAQs"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-red-500 transition flex items-center space-x-1 group">
                  <span>{item}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-red-500" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Policies Column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            // CUSTOMER SUPPORT & CONTACT
          </h4>
          <ul className="space-y-3 text-xs font-extrabold uppercase tracking-widest text-neutral-300">
            {["Shipping Info", "Returns & Exchanges", "Privacy Policy", "Terms of Service"].map((item) => (
              <li key={item}>
                <Link href={`/${item.toLowerCase().split(" ")[0]}`} className="hover:text-red-500 transition">
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-neutral-900 text-xs font-mono text-neutral-400 space-y-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>+91 XXXXX-XXXXX</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>lme.store.in@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-neutral-950 border-t border-neutral-900 py-6 text-center text-xs font-mono text-neutral-500 tracking-wider">
        <p>&copy; {new Date().getFullYear()} LAST MAN ON EARTH. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
}
