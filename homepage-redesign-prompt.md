# Homepage Redesign Brief — "Last Man on Earth" Streetwear

Use this as a build prompt for a designer, dev, or an AI coding tool (e.g. Claude Code, v0, Cursor).

---

## 1. Brand & Creative Direction

**Brand:** Last Man on Earth — post-apocalyptic streetwear, oversized fits, F1/moto-inspired graphics.
**Current mood:** dark, bold, slightly flat. Keep the black/red/white palette but push it toward a more *cinematic, kinetic, editorial* feel — like a mix of a Supreme drop page and a motorsport livery site.

**Keep:**
- Black + signature red (#E63946-ish) + white palette
- Oversized, condensed, all-caps display type
- F1/moto graphic tee imagery

**Upgrade:**
- Add motion as a core brand element (this brand is about speed/rebellion — motion should *feel* like that)
- Add depth via parallax, layering, and grain/texture overlays
- Tighten the grid — current sections feel like stacked blocks; give them more editorial variation (asymmetric splits, bleed images, overlapping type)

---

## 2. Tech Stack Assumption

- Next.js / React front end
- GSAP + ScrollTrigger for scroll-based animation
- Lenis (or GSAP ScrollSmoother) for smooth scrolling
- Locomotive-style easing on all reveals (avoid linear/ease-out defaults — use `power3.out`, `expo.out`)
- Split-type / GSAP SplitText for headline character/word animation
- Swiper or Embla for carousels (hero, new drops, instagram feed), synced to GSAP timelines

---

## 3. Section-by-Section Redesign + Animation Spec

### A. Navbar
- Sticky, transparent over hero, solid black on scroll (animate background + add subtle shadow via ScrollTrigger `onUpdate`)
- Logo does a small scale/rotate pulse on load
- Nav links get an underline-wipe hover (GSAP `xPercent` on a pseudo-line, not CSS transition)
- Cart icon: bounce/scale on item-add (spring easing `back.out(2)`)

### B. Hero
- Replace static carousel with a **full-bleed video/parallax hero**: background layer moves slower than the model/product cutout layer (classic parallax via `ScrollTrigger scrub`)
- Headline ("MINIMAL MEETS BOLD") animates in with SplitText — words slide up + fade, staggered 0.05s apart, on page load
- CTA button ("Shop Now"): magnetic hover effect (button follows cursor slightly within its bounding box using `gsap.quickTo`)
- Carousel dots: replace with an animated progress bar that fills with GSAP timeline synced to autoplay duration
- Add subtle grain/noise overlay (CSS/WebGL) + a slow Ken Burns zoom on the background image

### C. "New Drops"
- Section label chip ("New") pulses with a soft glowing box-shadow loop
- Product cards: staggered fade+slide-up entrance on scroll (`ScrollTrigger` + `stagger: 0.1`)
- On hover: card image crossfades to a second angle/lifestyle shot, price underlines, "quick add" button slides up from bottom
- "View All" arrow nudges right on hover (looping `xPercent` micro-animation)

### D. "Redefine Survival Style" (image + copy split)
- Pin this section briefly on scroll; as user scrolls, the three product images slide in from different directions (left, center-up, right) and settle — creates a "coming together" moment
- Headline color animates from white → red on scroll entry (GSAP `to` on `color`)
- Circular arrow CTA rotates continuously (slow `repeat: -1`) and speeds up on hover

### E. "Stand Alone. Stand Strong." (red block + editorial photo)
- Large red panel slides in from the left as it enters viewport (`ScrollTrigger`, `x: -100 → 0`)
- Photo panel has a subtle scale-in (1.1 → 1) parallax as you scroll past
- Body copy fades in with a slight blur-to-sharp effect (`filter: blur(8px) → blur(0)`) for a "coming into focus" feel

### F. "Wear the Movement, Break the Mold" (text-only block)
- Turn this into a **pinned horizontal-feel moment**: each line of the headline animates in on its own scroll trigger step (like a manifesto reveal), even though the page keeps scrolling vertically
- "Shop Collection" button has the same magnetic hover as hero CTA for consistency

### G. "Nightfall Oversized Hoodie" (dark feature block)
- Product image does a slow continuous float (subtle `y` yoyo loop, 3s duration) to feel "alive"
- Thumbnail strip: clicking a thumbnail crossfades the main image with GSAP `timeline` (fade out old, fade in new, scale 0.95 → 1)
- Section background: very subtle animated gradient or slow-moving grain texture

### H. "Straight From the Feed" (Instagram reels)
- Convert to an infinite marquee-style horizontal scroll (GSAP `xPercent` looping via `gsap.utils.wrap` or a horizontal ScrollTrigger scrub tied to vertical scroll)
- Hover on any reel thumbnail: scales up slightly + shows a play icon that fades in
- Arrows: same micro-nudge hover as "View All"

### I. "Why LME?" (feature grid)
- Icons draw themselves in with an SVG stroke animation (`strokeDashoffset` tween) as each card enters
- Cards stagger in with a slight rotation settle (`rotate: 3 → 0`, `opacity: 0 → 1`)

### J. Newsletter Band
- Input field border animates color on focus (red glow)
- Subscribe button: on click, morphs into a checkmark/loading state briefly (GSAP timeline swapping icon + background color)
- Background: subtle diagonal stripe pattern that slowly drifts (looping `backgroundPosition` animation)

### K. Footer
- Social icons: stagger-fade in on scroll entry
- Standard, minimal motion here — footer shouldn't compete for attention

---

## 4. Global Motion Rules (so it feels designed, not random)

1. **One entrance style per content type** — all product cards use the same fade+stagger, all headlines use SplitText reveals, all CTAs use magnetic hover. Consistency > novelty.
2. **Scroll-triggered, not autoplay-everywhere** — most animations should fire once as sections enter (`toggleActions: "play none none reverse"`), not loop constantly (loops reserved for: hero progress bar, floating hoodie image, icon glow, background drift).
3. **Timing:** entrances 0.6–0.9s, hovers 0.2–0.4s, easing `power3.out` / `expo.out` for entrances, `power2.inOut` for hovers.
4. **Respect `prefers-reduced-motion`** — disable parallax/loops and fall back to simple fades for accessibility.
5. **Performance:** animate `transform`/`opacity` only where possible; use `will-change` sparingly; lazy-init GSAP ScrollTriggers with `ScrollTrigger.refresh()` after images/fonts load.

---

## 5. Deliverable Ask

Redesign the homepage using the section structure above, implemented in [React / Next.js], with GSAP + ScrollTrigger driving all motion, Lenis for smooth scroll, and SplitText for headline reveals. Keep the black/red/white streetwear identity, but make every scroll and hover feel intentional and premium — like a motorsport-meets-streetwear drop page.
