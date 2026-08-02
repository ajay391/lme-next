# Alternate Project Specification Brief: Custom Design Tees & Signature Apparel Studio

> **Project Code Name:** `LME-CustomStudio` / `LME-AltDesign`  
> **Core Concept:** A high-end, cyber-industrial e-commerce platform and interactive design lab specializing in **Custom Designed Tees** alongside an **In-House Signature Graphic Apparel** collection.

---

## 1. Executive Summary & Brand Direction

### Vision
Transform the existing *Last Man on Earth (LME)* storefront into an elevated, dual-capability digital experience:
1. **Custom Tee Creator Lab**: Empower users, brands, creators, and teams to design, preview, quote, and print high-quality custom graphic tees with custom fit options, print finishes, and live mockups.
2. **In-House Signature Store ("Our Own Designs")**: A curated retail gallery featuring limited-edition street apparel, heavy-GSM oversized tees, and motorsport/cyberpunk graphics created by in-house artists.

### Target Aesthetic & Mood
- **Visual Style:** Industrial Modernism meets High-Fashion Streetwear (Neumorphic edges, deep dark backgrounds, subtle glassmorphism, bold technical grid lines, neon red accent hues `#FF2E4C`).
- **Typography:** Bold condensed display fonts (e.g. *Syne*, *Bebas Neue*, *Clash Display*) paired with clean monospace labels (*JetBrains Mono*) for measurements, specs, and price breakdowns.
- **Motion Philosophy:** Fluid, tactile, and cinematic. Utilizing GSAP scroll-triggered reveals, smooth Lenis scrolling, magnetic hover states, and dynamic 2D/3D canvas transformations.

---

## 2. Core Pillars & Value Proposition

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          LME DUAL-PILLAR PLATFORM                           │
├──────────────────────────────────────────┬──────────────────────────────────┤
│    PILLAR 1: CUSTOM DESIGN TEE STUDIO    │    PILLAR 2: OUR OWN DESIGNS     │
│  - Real-time 2D/3D Shirt Canvas Studio   │  - Exclusive In-House Drops      │
│  - Artwork Upload & Resolution Detector  │  - Heavyweight 240+ GSM Blanks   │
│  - Print Options (DTG, Puff, Embroidery) │  - Limited Edition Graphic Tees │
│  - Custom Quote & Revision Timeline      │  - Instant Add to Cart & Checkout│
└──────────────────────────────────────────┴──────────────────────────────────┘
```

---

## 3. Detailed Feature Specifications

### Pillar 1: Custom Design Tee Studio (Design Your Own)

#### A. Interactive Canvas Studio (`/custom-studio`)
- **Multi-View Canvas:** Interactive front, back, and sleeve preview modes.
- **Artwork Upload Engine:**
  - Drag-and-drop support for PNG, SVG, AI, and PSD files.
  - Automatic DPI quality checker (warns user if artwork is < 300 DPI for crisp printing).
  - Background removal helper tool & transparent PNG canvas preview.
- **Text & Graphic Lab:**
  - Custom font selector (streetwear, gothic, retro, minimal, Y2K styles).
  - Text curvature/arc sliders, outline stroke thickness, letter spacing, and distress textures.
  - Library of stock vector art, streetwear stamps, & badge templates.
- **Print Tech & Spec Selection:**
  - **Print Methods:** Direct-To-Garment (DTG), HD Puff Print, Screen Printing, Vintage Acid Wash, Metallic Foil, Custom Embroidery.
  - **Tee Blanks Selection:** Heavyweight 240 GSM Oversized Fit, 200 GSM Boxy Fit, Premium Slim Fit, Acid Wash Vintage Tee.
  - **Color Picker:** 12+ curated garment colors (Pitch Black, Washed Charcoal, Raw Bone, Crimson Red, Olive Drab, etc.).
- **Dynamic Pricing & Bulk Discount Calculator:**
  - Live cost calculation based on selected garment, print location count (Front + Back), print technique, and order quantity tiers (1-5, 6-25, 26-100, 100+).

#### B. Custom Design Request & Revision Workflow (`/custom-orders`)
- Integrates with the existing `designmytee` component architecture:
  - **Submission Form:** Submit artwork, specs, size distributions (S, M, L, XL, XXL count), and special instructions.
  - **Interactive Revision Timeline (`RevisionTimeline.jsx`):** Track design approval steps (Submitted → Designer Review → Proof Created → Client Approved → Production → Shipped).
  - **Direct Messaging Thread (`MessagingThread.jsx`):** Real-time chat between customer and designer for revision feedback and artwork adjustments.
  - **Notification System (`NotificationCenter.jsx`):** Instant notifications on proof updates, order status changes, and message replies.

---

### Pillar 2: "Our Own Designs" (In-House Signature Store)

#### A. Curated Drops Gallery (`/shop`)
- **Grid Layouts:** Bento-grid product showcasing with toggleable layout modes (2-column editorial, 4-column minimal, dense catalog).
- **Product Card Interactions (`ProductCard.jsx`):**
  - Instant image cross-fade to model lifestyle/back print on hover.
  - Quick-add modal with size selection and stock status.
  - Spec tags: "240 GSM Heavy Cotton", "HD Puff Print", "Limited Drop".
- **Category & Vibe Filters:**
  - Motorsport & F1 Series
  - Cyberpunk & Industrial
  - Minimalist Typographic
  - Acid Wash Vintage Vault

#### B. High-Impact Product Detail Page (`/shop/[slug]`)
- **Product Storytelling:** High-resolution multi-angle carousel with zoom functionality.
- **Fabric & GSM Technical Spec Sheet:** Transparent breakdown of cotton origin, GSM weight, collar rib thickness, and fit chart.
- **Size & Fit Recommender:** Interactive size modal (`SizeModal.jsx`) based on height/weight and fit preference (Boxy, Oversized, Standard).
- **Stock Urgency Bar:** Real-time stock counters ("Only 4 left in Size L") to drive conversion.

---

## 4. Alternate Homepage Design Layout (`/`)

The alternate homepage features a split-hero layout, seamless transitions, and interactive design teasers:

### Section Breakdown

1. **Header & Sticky Glass Navbar (`Navbar.jsx`)**
   - Brand logo with micro-rotate pulse on hover.
   - Dual Primary Nav CTA: `[ Custom Design Studio ]` and `[ Shop Drops ]`.
   - Mini cart slide-over with badge count.

2. **Split Hero Section**
   - **Left Half (Pillar 1):** *"CREATE YOUR CUSTOM GRAIL"* — Live interactive t-shirt preview where users can type test text or drop a sample logo right on the hero banner.
   - **Right Half (Pillar 2):** *"EXPLORE IN-HOUSE DROPS"* — High-energy video reel / kinetic carousel showing signature streetwear models.

3. **Live Customizer Teaser Bar**
   - Quick 3-step widget: Select Blank -> Upload Artwork -> Get Instant Quote.

4. **Featured Signature Collection ("Our Own Designs")**
   - Horizontal sliding marquee of latest in-house graphic tees with price, GSM tag, and quick-buy button.

5. **Craftsmanship & Print Quality Showcase (`WhyUs.jsx`)**
   - Interactive comparison slider showing standard screenprint vs. LME HD Puff Print & Heavyweight 240 GSM Fabric.

6. **Interactive Lookbook & Reel Grid (`ReelsShowcase.jsx`)**
   - Auto-scrolling video reels highlighting customer custom designs and model shoots.

7. **Design Process & Workflow Diagram (`WorkflowDiagramModal.jsx`)**
   - Step-by-step breakdown of how custom orders move from idea to delivered apparel.

8. **Newsletter & VIP Drop Access (`Newsletter.jsx`)**
   - Cyber-styled email signup field with glowing border states and instant discount codes for custom orders.

9. **Footer (`Footer.jsx`)**
   - Comprehensive site map, size guides, custom quote request link, contact info, and legal links.

---

## 5. System Architecture & Tech Stack

```
                               ┌─────────────────────────┐
                               │     Next.js Pages App   │
                               └────────────┬────────────┘
                                            │
           ┌────────────────────────────────┼────────────────────────────────┐
           │                                │                                │
┌──────────┴──────────┐          ┌──────────┴──────────┐          ┌──────────┴──────────┐
│ UI & Design System  │          │ State & Canvas      │          │ Backend & APIs      │
├─────────────────────┤          ├─────────────────────┤          ├─────────────────────┤
│ - React 19          │          │ - Redux Toolkit     │          │ - MongoDB / Mongoose│
│ - Tailwind CSS      │          │ - Fabric.js / Canvas│          │ - Supabase Storage  │
│ - GSAP + ScrollTrig │          │ - Framer Motion     │          │ - Cloudinary CDN    │
│ - Lenis Smooth Scroll│         │ - Formik & Yup      │          │ - Razorpay Payment  │
└─────────────────────┘          └─────────────────────┘          └─────────────────────┘
```

### Directory Structure Mapping (Alternate Workspace)

```
src/
├── components/
│   ├── designmytee/           # Custom design request & revision components
│   │   ├── CanvasStudio.jsx    # [NEW] Interactive shirt design canvas studio
│   │   ├── ArtworkUploader.jsx # [NEW] DPI checker & transparency background removal
│   │   ├── MessagingThread.jsx
│   │   ├── NotificationCenter.jsx
│   │   ├── OrderConversionModal.jsx
│   │   ├── RevisionTimeline.jsx
│   │   └── UserDesignRequestsTab.jsx
│   ├── home/                  # Alternate Home components
│   │   ├── SplitHero.jsx      # [NEW] Dual-choice hero section
│   │   ├── CustomizerTeaser.jsx #[NEW] Quick preview widget
│   │   ├── SignatureGallery.jsx #[NEW] Our Own Designs carousel
│   │   └── QualitySlider.jsx  # [NEW] Fabric & print quality comparative slider
│   ├── shop/                  # Signature e-commerce components
│   │   ├── ProductCard.jsx
│   │   ├── ProductShowcase.jsx
│   │   └── SizeModal.jsx
│   └── shared/                # Layout & UI
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       └── SmoothScroll.jsx
├── pages/
│   ├── index.jsx              # Alternate Homepage
│   ├── custom-studio.jsx      # [NEW] Fullscreen Custom Tee Studio
│   ├── shop/
│   │   ├── index.jsx          # Our Own Designs Catalog
│   │   └── [slug].jsx         # Product Details Page
│   ├── custom-orders/         # User dashboard for custom requests & revisions
│   ├── admin/                 # Admin management (Products, Orders, Quotes)
│   └── api/                   # Backend endpoints
└── store/                     # Redux slices (cart, customDesign, user, admin)
```

---

## 6. Implementation Roadmap

### Phase 1: Brand & Layout Foundation
- Setup color system, typography scale, and responsive layout utilities in Tailwind & global CSS.
- Build alternate header (`Navbar.jsx`) and footer (`Footer.jsx`) with dual-navigation triggers.

### Phase 2: Custom Tee Design Studio (`/custom-studio`)
- Integrate HTML5 Canvas / Fabric.js for 2D T-shirt design manipulation (drag, drop, scale, rotate, text input).
- Build the print technology selection UI (DTG vs Puff vs Embroidery) with live pricing calculator.
- Wire up artwork file upload with Cloudinary and DPI quality validator.

### Phase 3: "Our Own Designs" Store (`/shop`)
- Refine product catalog layout with interactive hover states and filtering tags.
- Build detail pages with GSM fabric technical specs and size recommender modal.

### Phase 4: Order & Revision Engine Integration
- Connect custom studio output directly to `UserDesignRequestsTab.jsx` and `RevisionTimeline.jsx`.
- Implement admin proof upload and customer approval buttons inside `MessagingThread.jsx`.

### Phase 5: Motion, Polish & SEO
- Add GSAP ScrollTrigger transitions for section reveals and kinetic typography.
- Implement structured metadata, OpenGraph tags, dynamic sitemap, and performance optimizations.

---

*This specification serves as the blueprint for creating the alternate Next.js design for custom design tees and signature streetwear drops.*
