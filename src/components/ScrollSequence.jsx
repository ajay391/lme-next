"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { initGSAP, isReducedMotion } from "../lib/gsap";

// ─── Keyframe image sequence ──────────────────────────────────────────────────
// 8 existing product photos act as animation keyframes.
// Swap in real 60-120 WebP frames later by dropping them at
// /images/sequence/frame-001.webp … frame-120.webp and updating this array.
const FRAME_SOURCES = [
  "/images/home/new-1.png",
  "/images/home/new-3.png",
  "/images/home/new-5.png",
  "/images/home/hero-1.png",
  "/images/home/new-2.png",
  "/images/home/hero-2.png",
  "/images/home/style-1.png",
  "/images/home/style-2.png",
];

// ─── Feature callout story arc ────────────────────────────────────────────────
// start / end values are 0–1 scroll progress fractions.
const CALLOUTS = [
  {
    id: "cotton",
    label: "450 GSM COTTON",
    sub: "Heavyweight French Terry construction — built to outlast the storm.",
    side: "left",
    start: 0.04,
    end: 0.22,
  },
  {
    id: "prints",
    label: "HAND-FINISHED PRINTS",
    sub: "Each graphic screen-printed by hand in strictly limited runs.",
    side: "right",
    start: 0.30,
    end: 0.48,
  },
  {
    id: "cut",
    label: "OVERSIZED STREET CUT",
    sub: "Drop-shoulder silhouette engineered for the post-apocalyptic rebel.",
    side: "left",
    start: 0.56,
    end: 0.74,
  },
  {
    id: "drops",
    label: "LIMITED QUANTITY DROPS",
    sub: "Once the batch is archived it's gone forever. No restocks. Ever.",
    side: "right",
    start: 0.80,
    end: 0.96,
  },
];

// ─── Canvas helper — object-fit: cover in CSS-pixel space ────────────────────
function drawImageCover(ctx, img, cw, ch) {
  if (!img || !img.complete || img.naturalWidth === 0) return;
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
  const dx = (cw - img.naturalWidth * scale) / 2;
  const dy = (ch - img.naturalHeight * scale) / 2;
  ctx.drawImage(
    img,
    dx,
    dy,
    img.naturalWidth * scale,
    img.naturalHeight * scale
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScrollSequence() {
  const sectionRef      = useRef(null);
  const canvasRef       = useRef(null);
  const calloutRefs     = useRef([]);
  const imagesRef       = useRef([]);
  const stRef           = useRef(null);       // ScrollTrigger instance
  const progressRef     = useRef(0);          // current scroll progress cache
  const frameCounterRef = useRef(null);       // DOM node for frame badge

  const [loadPct, setLoadPct]     = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion on client only (avoids SSR mismatch)
  useEffect(() => {
    setReducedMotion(isReducedMotion());
  }, []);

  // ── 1. Preload all frames ─────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images = new Array(FRAME_SOURCES.length);

    FRAME_SOURCES.forEach((src, i) => {
      const img = new window.Image();
      const onDone = () => {
        images[i] = img;
        loaded++;
        setLoadPct(Math.round((loaded / FRAME_SOURCES.length) * 100));
        if (loaded === FRAME_SOURCES.length) {
          imagesRef.current = images;
          setAllLoaded(true);
        }
      };
      img.onload  = onDone;
      img.onerror = onDone; // count failed loads so we don't hang
      img.src = src;
    });
  }, []);

  // ── 2. Canvas frame renderer ──────────────────────────────────────
  // Crossfades between keyframe[idx] → keyframe[idx+1] using alpha.
  const renderFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    const images = imagesRef.current;
    if (!ctx || !images?.length) return;

    const n      = images.length;
    const scaled = Math.min(Math.max(progress, 0), 0.9999) * (n - 1);
    const idx    = Math.floor(scaled);
    const alpha  = scaled - idx; // crossfade weight 0–1

    // CSS pixel dimensions (correct after setTransform in handleResize)
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    ctx.clearRect(0, 0, cw, ch);

    // Base keyframe
    ctx.globalAlpha = 1;
    drawImageCover(ctx, images[idx], cw, ch);

    // Next keyframe crossfade
    if (alpha > 0 && images[idx + 1]) {
      ctx.globalAlpha = alpha;
      drawImageCover(ctx, images[idx + 1], cw, ch);
    }

    ctx.globalAlpha = 1;
  }, []);

  // ── 3. Responsive canvas sizing ───────────────────────────────────
  // Multiply canvas bitmap by devicePixelRatio for crisp rendering on
  // HiDPI screens; then scale the ctx transform so drawing stays in
  // CSS-pixel coordinates.
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = Math.round(rect.width  * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // reset + scale in one call (non-cumulative)
    renderFrame(progressRef.current);
  }, [renderFrame]);

  // ── 4. GSAP ScrollTrigger — pin + scrub ──────────────────────────
  useEffect(() => {
    if (!allLoaded || reducedMotion) return;

    const { gsap, ScrollTrigger } = initGSAP();

    // Size canvas then draw frame 0 before ScrollTrigger is created so
    // there's never a blank canvas flash.
    handleResize();
    renderFrame(0);
    window.addEventListener("resize", handleResize);

    // Callout fade-in/out helper — fires every scroll tick via onUpdate
    const updateCallouts = (progress) => {
      CALLOUTS.forEach((callout, i) => {
        const el = calloutRefs.current[i];
        if (!el) return;
        const inRange = progress >= callout.start && progress <= callout.end;
        const offsetY = inRange ? 0 : progress < callout.start ? 20 : -20;
        gsap.to(el, {
          opacity: inRange ? 1 : 0,
          y:       offsetY,
          duration: 0.5,
          ease:    "power2.out",
          overwrite: "auto",
        });
      });
    };

    const progressFill =
      sectionRef.current?.querySelector(".seq-progress-fill");

    // Main pin + scrub trigger
    stRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   "top top",
      end:     "+=400%",   // pins for 4× viewport heights of scroll travel
      pin:     true,
      anticipatePin: 1,
      scrub:   1.2,        // small lag makes the sequence feel weighty
      onUpdate: (self) => {
        progressRef.current = self.progress;
        renderFrame(self.progress);
        updateCallouts(self.progress);
        // Update frame counter badge directly in the DOM (no React re-render)
        if (frameCounterRef.current) {
          const frameNum = Math.min(
            Math.floor(self.progress * (FRAME_SOURCES.length - 1)) + 1,
            FRAME_SOURCES.length
          );
          frameCounterRef.current.textContent = String(frameNum).padStart(2, "0");
        }
        if (progressFill) {
          gsap.set(progressFill, { scaleX: self.progress });
        }
      },
    });

    ScrollTrigger.refresh();

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      window.removeEventListener("resize", handleResize);
    };
  }, [allLoaded, reducedMotion, renderFrame, handleResize]);

  // Render static first frame for reduced-motion after load
  useEffect(() => {
    if (allLoaded && reducedMotion) {
      handleResize();
      renderFrame(0);
    }
  }, [allLoaded, reducedMotion, renderFrame, handleResize]);

  // ── Render ─────────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden"
      aria-label="Product feature sequence — scroll to explore"
    >
      {/* ── Loading indicator ─────────────────────────────────────── */}
      {!allLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 gap-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
            Loading sequence
          </span>
          <div className="w-48 h-[2px] bg-neutral-800 overflow-hidden relative">
            <div
              className="absolute inset-y-0 left-0 bg-red-600 transition-all duration-300 ease-out"
              style={{ width: `${loadPct}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-neutral-700 tracking-widest tabular-nums">
            {loadPct}%
          </span>
        </div>
      )}

      {/* ── Canvas — the primary visual ───────────────────────────── */}
      {!reducedMotion && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block transition-opacity duration-700 ${
            allLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Reduced-motion fallback: static 2×2 product grid */}
      {reducedMotion && allLoaded && (
        <div className="absolute inset-0 grid grid-cols-2 gap-px z-0 pointer-events-none">
          {FRAME_SOURCES.slice(0, 4).map((src, i) => (
            <div key={i} className="relative overflow-hidden bg-neutral-900">
              <Image
                src={src}
                alt={`Product view ${i + 1}`}
                fill
                className="object-cover opacity-60"
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Cinematic gradients — keep text legible over images ────── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/55 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none z-10" />

      {/* ── Section header (top-left, always visible) ─────────────── */}
      <div
        className={`absolute top-8 sm:top-12 left-6 sm:left-14 z-20 transition-opacity duration-700 ${
          allLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-2">
          // PRODUCT STORY
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-none">
          Engineered For
          <br />
          <span className="text-red-600">Street Rebellion</span>
        </h2>
        <p className="text-neutral-400 text-[11px] sm:text-sm mt-3 max-w-[220px] font-medium leading-relaxed">
          Scroll to discover every detail.
        </p>
      </div>

      {/* ── Frame counter badge (bottom-left) ─────────────────────── */}
      {!reducedMotion && allLoaded && (
        <div className="absolute bottom-10 left-6 sm:left-14 z-20 font-mono text-[10px] tracking-widest text-neutral-500 select-none pointer-events-none">
          <span ref={frameCounterRef} className="text-white font-bold">01</span>
          {" "}/{" "}{String(FRAME_SOURCES.length).padStart(2, "0")}
        </div>
      )}

      {/* ── Scroll progress bar (bottom edge) ────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-neutral-800/70 z-30">
        <div
          className="seq-progress-fill h-full bg-red-600 origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Scroll hint arrow (fades naturally once user scrolls) ─── */}
      {allLoaded && !reducedMotion && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
          <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-600">
            Scroll to explore
          </span>
          <div className="w-px h-6 bg-gradient-to-b from-neutral-600 to-transparent" />
        </div>
      )}

      {/* ── Feature callout overlays ─────────────────────────────── */}
      {CALLOUTS.map((callout, i) => (
        <div
          key={callout.id}
          ref={(el) => (calloutRefs.current[i] = el)}
          className={`absolute z-20 pointer-events-none select-none will-change-transform max-w-[190px] sm:max-w-[260px] ${
            reducedMotion ? "opacity-100" : "opacity-0"
          } ${
            callout.side === "left"
              ? "left-6 sm:left-14"
              : "right-6 sm:right-14"
          }`}
          style={{ top: "50%", transform: "translateY(-50%)" }}
          aria-hidden="true"
        >
          {/* Accent connector line */}
          <div
            className={`flex items-center gap-3 mb-3 ${
              callout.side === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="w-6 h-[2px] bg-red-600 flex-shrink-0" />
            <span className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-extrabold leading-none">
              FEATURE
            </span>
          </div>

          <h3
            className={`text-base sm:text-xl font-black uppercase tracking-tighter text-white mb-2 leading-tight ${
              callout.side === "right" ? "text-right" : "text-left"
            }`}
          >
            {callout.label}
          </h3>

          <p
            className={`text-[10px] sm:text-xs text-neutral-300 font-medium leading-relaxed ${
              callout.side === "right" ? "text-right" : "text-left"
            }`}
          >
            {callout.sub}
          </p>
        </div>
      ))}
    </section>
  );
}
