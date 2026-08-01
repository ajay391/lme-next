"use client";

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { initGSAP, isReducedMotion } from "../lib/gsap";
import allProducts from "../data/products";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Catalog cards array (mix of products, spec callouts, and quote cards)
const CARDS = [
  {
    id: "nightfall",
    productId: allProducts[1]?.id || 2,
    slug: allProducts[1]?.slug || "urban-white-hoodie",
    size: "large",
    type: "product",
    tag: "LIMITED",
    title: allProducts[1]?.name || "Nightfall Oversized Hoodie",
    sub: "450GSM heavyweight cotton • ₹" + (allProducts[1]?.price || "1999"),
    image: "/images/home/new-4.png",
    imagePosition: "object-center",
  },
  {
    id: "spec-cotton",
    size: "small",
    type: "spec",
    tag: "DETAIL",
    title: "450 GSM COTTON",
    sub: "French Terry construction, double-layered hood.",
    image: null,
  },
  {
    id: "monte-carlo",
    productId: allProducts[2]?.id || 3,
    slug: allProducts[2]?.slug || "nowhere-graphic-tee",
    size: "large",
    type: "product",
    tag: "NEW DROP",
    title: allProducts[2]?.name || "Monte Carlo Tee",
    sub: "Hand-finished motorsport print • ₹" + (allProducts[2]?.price || "1199"),
    image: "/images/home/new-1.png",
    imagePosition: "object-center",
  },
  {
    id: "quote-1",
    size: "small",
    type: "quote",
    tag: "REVIEW",
    title: "\u201CFit is unreal, print quality is next level.\u201D",
    sub: "— verified buyer",
    image: null,
  },
  {
    id: "lecc-lrc",
    productId: allProducts[0]?.id || 1,
    slug: allProducts[0]?.slug || "oversized-black-tee",
    size: "large",
    type: "product",
    tag: "BEST SELLER",
    title: allProducts[0]?.name || "LFCC / LRC Oversized Tee",
    sub: "Signature edition • ₹" + (allProducts[0]?.price || "999"),
    image: "/images/home/new-2.png",
    imagePosition: "object-center",
  },
  {
    id: "spec-cut",
    size: "small",
    type: "spec",
    tag: "FIT",
    title: "DROP-SHOULDER CUT",
    sub: "Engineered oversized silhouette.",
    image: null,
  },
  {
    id: "style-1",
    productId: allProducts[6]?.id || 7,
    slug: allProducts[6]?.slug || "nowhere-classic-tee",
    size: "large",
    type: "product",
    tag: "STYLE",
    title: "Blackout Grid Set",
    sub: "Head-to-toe survival fit • ₹1499",
    image: "/images/home/style-1.png",
    imagePosition: "object-center",
  },
];

// ---- Showcase Card Component ----
function ShowcaseCard({ card, setRef, onCardHover }) {
  const isLarge = card.size === "large";
  const isProduct = card.type === "product";

  const cardContent = (
    <div
      ref={setRef}
      onMouseEnter={() => onCardHover && onCardHover(isProduct ? "view" : "drag")}
      onMouseLeave={() => onCardHover && onCardHover("drag")}
      className={
        "group showcase-card flex-shrink-0 relative rounded-2xl overflow-hidden bg-neutral-900 border-t border-white/10 hover:border-red-600/80 shadow-2xl shadow-black/90 hover:shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-1.5 will-change-transform " +
        (isLarge
          ? "w-[320px] md:w-[380px] h-[440px] md:h-[520px]"
          : "w-[240px] md:w-[280px] h-[360px] md:h-[420px] self-end mb-6")
      }
    >
      {card.image ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className={
                "card-image object-cover transition-transform duration-500 ease-out group-hover:scale-105 " +
                (card.imagePosition || "object-center")
              }
              sizes="(max-width: 768px) 280px, 380px"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300" />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-8 bg-neutral-950 border border-neutral-800">
          <div className="w-10 h-[2px] bg-red-600 transition-colors duration-300" />
        </div>
      )}

      {/* Badge Tag */}
      <span
        className={
          "absolute top-5 left-5 text-[10px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-md transition-colors duration-300 " +
          (card.type === "quote"
            ? "bg-white text-black"
            : card.type === "spec"
            ? "bg-neutral-800 text-neutral-300 border border-neutral-700"
            : "bg-red-600 text-white font-black")
        }
      >
        {card.tag}
      </span>

      {/* Card Content Footer */}
      <div className="absolute bottom-6 left-6 right-6">
        <h3
          className={
            "font-black uppercase leading-tight mb-2 transition-colors duration-300 " +
            (isLarge ? "text-lg md:text-xl" : "text-sm md:text-base") +
            (card.type === "quote"
              ? " normal-case font-bold text-sm italic text-neutral-200"
              : " tracking-tighter text-white group-hover:text-red-500")
          }
        >
          {card.title}
        </h3>
        <p className="text-[11px] font-mono text-neutral-400 font-medium">
          {card.sub}
        </p>

        {isProduct && (
          <div className="mt-3 flex items-center text-[10px] font-mono font-bold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>EXPLORE PRODUCT</span>
            <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (isProduct && card.slug) {
    return (
      <Link href={`/product/${card.slug}`} className="flex-shrink-0 block focus:outline-none">
        {cardContent}
      </Link>
    );
  }

  return <div className="flex-shrink-0">{cardContent}</div>;
}

export default function HorizontalShowcase() {
  const containerRef = useRef(null);
  const pinSectionRef = useRef(null);
  const trackRef = useRef(null);
  const bgTextRef = useRef(null);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);
  const cardRefs = useRef([]);

  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState("drag"); // "drag" | "view"

  const setCardRef = useCallback((i) => (el) => {
    cardRefs.current[i] = el;
  }, []);

  const handleCardHover = useCallback((mode) => {
    setCursorMode(mode);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const { gsap, ScrollTrigger } = initGSAP();
    const container = containerRef.current;
    const pinSection = pinSectionRef.current;
    const track = trackRef.current;
    if (!container || !pinSection || !track) return;

    let idleTimer;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        try {
          const cards = cardRefs.current.filter(Boolean);
          const cursorSetX = gsap.quickTo(cursorRef.current, "x", {
            duration: 0.35,
            ease: "power3.out",
          });
          const cursorSetY = gsap.quickTo(cursorRef.current, "y", {
            duration: 0.35,
            ease: "power3.out",
          });
          const skewSetters = cards.map((el) =>
            gsap.quickTo(el, "skewX", { duration: 0.5, ease: "power3.out" })
          );

          const getScrollLength = () => {
            if (!track) return 1800;
            const measured = track.scrollWidth - window.innerWidth + 240;
            return Math.max(measured, 1400);
          };

          // Track Horizontal Scroll Animation with GSAP pin
          const tween = gsap.to(track, {
            x: () => -getScrollLength(),
            ease: "none",
            scrollTrigger: {
              trigger: pinSection,
              start: "top top",
              end: () => `+=${getScrollLength()}`,
              scrub: 1.2,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Update progress bar
                if (progressRef.current) {
                  gsap.set(progressRef.current, { scaleX: self.progress });
                }

                // Parallax movement for background wordmark
                if (bgTextRef.current) {
                  gsap.set(bgTextRef.current, {
                    x: -self.progress * (getScrollLength() * 0.35),
                  });
                }

                // Velocity skew effect on cards
                const velocity = self.getVelocity();
                const skew = gsap.utils.clamp(-6, 6, velocity / -300);
                skewSetters.forEach((set) => set(skew));

                clearTimeout(idleTimer);
                idleTimer = setTimeout(() => {
                  skewSetters.forEach((set) => set(0));
                }, 120);
              },
            },
          });

          // Mouse move tracking for custom cursor
          const onMouseMove = (e) => {
            cursorSetX(e.clientX);
            cursorSetY(e.clientY);
          };

          // Keyboard Arrow Key Navigation Support
          const onKeyDown = (e) => {
            const rect = pinSection.getBoundingClientRect();
            const inView = rect.top <= 200 && rect.bottom >= window.innerHeight - 200;
            if (!inView) return;

            if (e.key === "ArrowRight") {
              window.scrollBy({ top: window.innerHeight * 0.4, behavior: "smooth" });
            } else if (e.key === "ArrowLeft") {
              window.scrollBy({ top: -window.innerHeight * 0.4, behavior: "smooth" });
            }
          };

          pinSection.addEventListener("mousemove", onMouseMove);
          window.addEventListener("keydown", onKeyDown);

          // Force multiple refreshes after images/layout load
          const t1 = setTimeout(() => ScrollTrigger.refresh(), 100);
          const t2 = setTimeout(() => ScrollTrigger.refresh(), 400);

          return () => {
            pinSection.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("keydown", onKeyDown);
            clearTimeout(idleTimer);
            clearTimeout(t1);
            clearTimeout(t2);
          };
        } catch (err) {
          console.error("GSAP ScrollSequence Error:", err);
        }
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-black text-white border-b border-neutral-900"
    >
      {/* Mobile / Small Screen Swipeable Layout */}
      <div className="block min-[900px]:hidden py-16 px-6" aria-label="Featured drops">
        <div className="mb-8">
          <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
            // FEATURED ARCHIVE
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            Hall Of Fame
          </h2>
        </div>
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scrollbar-hide">
          {CARDS.map((card) => {
            const isProd = card.type === "product";
            const CardInner = (
              <div className="snap-start flex-shrink-0 w-[260px] h-[340px] rounded-2xl bg-neutral-900 border border-neutral-800 relative overflow-hidden shadow-xl">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={
                      "object-cover " + (card.imagePosition || "object-center")
                    }
                    sizes="260px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <span
                  className={
                    "absolute top-4 left-4 text-[10px] font-mono font-extrabold uppercase tracking-widest px-2 py-1 rounded-sm " +
                    (card.type === "quote"
                      ? "bg-white text-black"
                      : card.type === "spec"
                      ? "bg-neutral-800 text-neutral-300"
                      : "bg-red-600 text-white font-extrabold")
                  }
                >
                  {card.tag}
                </span>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-sm font-black uppercase leading-tight mb-1 text-white">
                    {card.title}
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-400">{card.sub}</p>
                </div>
              </div>
            );

            if (isProd && card.slug) {
              return (
                <Link key={card.id} href={`/product/${card.slug}`} className="flex-shrink-0 block">
                  {CardInner}
                </Link>
              );
            }

            return <div key={card.id} className="flex-shrink-0">{CardInner}</div>;
          })}
        </div>
      </div>

      {/* Desktop Horizontal Pinned Showcase Layout */}
      <div
        ref={pinSectionRef}
        className="hidden min-[900px]:block relative w-full h-screen overflow-hidden bg-black"
        aria-label="Featured drops — scroll or use arrow keys to explore"
      >
        {/* Subtle Background Parallax Typography */}
        <div
          ref={bgTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-5 will-change-transform"
        >
          <span className="text-[20vw] font-black uppercase tracking-tighter text-white whitespace-nowrap">
            LME // ARCHIVE 01
          </span>
        </div>

        {/* Fixed Viewport Track Container */}
        <div className="relative h-screen w-full flex items-center overflow-hidden cursor-none">
          {/* Info panel */}
          <div className="absolute z-20 top-1/2 -translate-y-1/2 left-6 md:left-14 max-w-[260px] pointer-events-none">
            <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
              // FEATURED ARCHIVE
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3 text-white">
              Hall Of
              <br />
              Fame
            </h2>
            <p className="text-neutral-400 text-xs font-mono leading-relaxed">
              Scroll or use &rarr; arrow keys to explore all 7 drops in the archive.
            </p>
          </div>

          {/* Horizontal Card track */}
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-[300px] md:pl-[440px] pr-24 will-change-transform"
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
          >
            {CARDS.map((card, i) => (
              <ShowcaseCard
                key={card.id}
                card={card}
                setRef={setCardRef(i)}
                onCardHover={handleCardHover}
              />
            ))}
          </div>
        </div>

        {/* Progress bar in Red theme */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-900 z-30">
          <div
            ref={progressRef}
            className="h-full bg-red-600 origin-left transition-transform duration-75"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        {/* Custom Dynamic Cursor (Red/White theme) */}
        <div
          ref={cursorRef}
          className={
            "hidden md:flex fixed top-0 left-0 z-50 pointer-events-none items-center -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 " +
            (cursorVisible ? "opacity-100" : "opacity-0")
          }
        >
          {cursorMode === "view" ? (
            <div className="bg-red-600 text-white rounded-full h-16 w-16 flex items-center justify-center font-mono font-black text-[11px] uppercase tracking-wider shadow-lg shadow-red-600/30 transform scale-105 transition-transform duration-200">
              View ↗
            </div>
          ) : (
            <div className="bg-white text-black rounded-full h-16 w-16 flex items-center justify-center gap-1 text-[10px] font-mono font-black uppercase tracking-wide shadow-xl transition-transform duration-200">
              <span>&larr;</span>
              <span>Drag</span>
              <span>&rarr;</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
