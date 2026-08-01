import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

let isRegistered = false;

export const initGSAP = () => {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger };
};

export const isReducedMotion = () => {
  if (typeof window === "undefined") return false;
  try {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    return !!(mediaQuery && mediaQuery.matches);
  } catch {
    return false;
  }
};

/**
 * Helper to wrap words of an element in span containers for staggered GSAP text reveals.
 * Returns an array of created word DOM elements.
 */
export const splitTextIntoWords = (element) => {
  if (!element || typeof window === "undefined") return [];
  
  const text = element.innerText || element.textContent || "";
  const words = text.split(/\s+/).filter(Boolean);
  
  element.innerHTML = "";
  const wordSpans = [];

  words.forEach((word) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "bottom";
    wrapper.className = "word-wrapper mr-[0.25em] last:mr-0";

    const inner = document.createElement("span");
    inner.style.display = "inline-block";
    inner.className = "word-inner";
    inner.textContent = word;

    wrapper.appendChild(inner);
    element.appendChild(wrapper);
    wordSpans.push(inner);
  });

  return wordSpans;
};

/**
 * Setup magnetic hover effect on a button container.
 */
export const setupMagneticEffect = (element, strength = 0.3) => {
  if (!element || typeof window === "undefined" || isReducedMotion()) return () => {};

  const xTo = gsap.quickTo(element, "x", { duration: 0.4, ease: "power3.out" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.4, ease: "power3.out" });

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    xTo(deltaX);
    yTo(deltaY);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export { gsap, ScrollTrigger };
