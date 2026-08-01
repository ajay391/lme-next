import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { Truck, RefreshCw, ShieldCheck, Minus, Plus, ChevronDown, ChevronUp, Share2 } from "lucide-react";
import AddToCartButton from "../../components/AddToCartButton";
import AddToWishlistButton from "../../components/AddToWishlistButton";
import ProductCard from "../../components/ProductCard";
import staticProducts from "../../data/products";

// Fallback catalog list if API server is offline
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",
    image: "/images/home/new-1.png",
    images: ["/images/home/new-1.png", "/images/home/new-4.png", "/images/home/style-1.png"],
    category: "T-Shirts",
    description: "Engineered 450GSM heavy cotton oversized streetwear t-shirt featuring raw-edge detailing, kinetic typography, and double-stitched reinforced collar.",
    sizes: ["S", "M", "L", "XL"],
    in_stock: true,
    isNew: true,
  },
  {
    id: 2,
    name: "LIMITLESS SPIRIT",
    slug: "urban-white-hoodie",
    price: "1999",
    oldPrice: "2499",
    image: "/images/home/new-2.png",
    images: ["/images/home/new-2.png", "/images/home/new-5.png", "/images/home/hero-1.png"],
    category: "Hoodies",
    description: "Heavyweight French Terry cotton hoodie with custom motorsport-inspired graphics, double-layered hood structure, and drop-shoulder silhouette.",
    sizes: ["M", "L", "XL"],
    in_stock: true,
    isNew: true,
  },
  {
    id: 3,
    name: "URBAN VIBES",
    slug: "nowhere-graphic-tee",
    price: "1199",
    oldPrice: "1499",
    image: "/images/home/new-3.png",
    images: ["/images/home/new-3.png", "/images/home/new-1.png", "/images/home/style-2.png"],
    category: "T-Shirts",
    description: "Hand-finished motorsport livery oversized graphic tee. Crafted from premium combed cotton for post-apocalyptic comfort.",
    sizes: ["S", "M", "L"],
    in_stock: true,
    isNew: true,
  },
  {
    id: 4,
    name: "STREET LEGEND",
    slug: "minimal-cream-hoodie",
    price: "2099",
    oldPrice: "2499",
    image: "/images/home/new-5.png",
    images: ["/images/home/new-5.png", "/images/home/new-2.png"],
    category: "Hoodies",
    description: "Minimalist cream heavyweight hoodie with subtle high-density print and ribbed cuffs.",
    sizes: ["S", "M", "L", "XL"],
    in_stock: true,
    isNew: false,
  },
];

const ProductViewPage = ({ product, relatedProducts }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image || "/images/home/new-1.png");
  const [openAccordion, setOpenAccordion] = useState("description");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image || "/images/home/new-1.png");
      setSelectedSize("");
      setQuantity(1);
      setOpenAccordion("description");
    }
  }, [product]);

  if (!product) return null;

  const galleryImages = [
    product.image,
    ...(product.images || []),
    product.hoverImage,
  ].filter(Boolean);

  const sizeList =
    typeof product.available_sizes === "string"
      ? product.available_sizes.split(",").map((s) => s.trim())
      : Array.isArray(product.sizes)
      ? product.sizes
      : Array.isArray(product.available_sizes)
      ? product.available_sizes
      : ["S", "M", "L", "XL"];

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <>
      <Head>
        <title>{`${product.name} | Last Man On Earth`}</title>
        <meta
          name="description"
          content={product.description || `${product.name} - Premium Post-Apocalyptic Streetwear.`}
        />
      </Head>

      <main className="bg-white text-black min-h-screen selection:bg-red-600 selection:text-white py-8 sm:py-12 px-4 sm:px-14">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-8 flex items-center space-x-2">
            <Link href="/" className="hover:text-red-600 transition">
              Home
            </Link>
            <IoIosArrowForward className="text-neutral-400" />
            <Link href="/shop" className="hover:text-red-600 transition">
              Shop Catalog
            </Link>
            <IoIosArrowForward className="text-neutral-400" />
            <span className="text-black font-bold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>

          {/* Product Detail Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column: Compact Image Gallery */}
            <div className="lg:col-span-5 space-y-4">
              {/* Primary Image Display */}
              <div className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full max-w-md mx-auto rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md group">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-mono font-black uppercase px-2.5 py-1 tracking-widest z-10 shadow-md">
                    NEW DROP
                  </span>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex items-center justify-center space-x-3 overflow-x-auto py-1">
                  {galleryImages.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-16 sm:w-20 h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${
                        selectedImage === img
                          ? "border-red-600 ring-2 ring-red-600/20 shadow-sm scale-105"
                          : "border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Buy Box Info */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category Badge & Code */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-red-600 tracking-widest">
                  // {product.category?.name || product.category || "STREETWEAR ARCHIVE"}
                </span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase">
                  SKU: LME-{product.id || "001"}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-4">
                {product.name}
              </h1>

              {/* Price & Savings */}
              <div className="flex items-baseline space-x-4 mb-6 font-mono border-b border-neutral-200 pb-6">
                <span className="text-2xl sm:text-3xl font-black text-black">
                  ₹{product.price}
                </span>
                {(product.oldPrice || product.old_price) && (
                  <span className="text-base text-neutral-400 line-through">
                    ₹{product.oldPrice || product.old_price}
                  </span>
                )}
                {(product.oldPrice || product.old_price) && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider rounded-sm">
                    SAVE {Math.round((1 - Number(product.price) / Number(product.oldPrice || product.old_price)) * 100)}%
                  </span>
                )}
              </div>

              {/* Size Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    SELECT FIT / SIZE: <span className="text-red-600">{selectedSize || "Select"}</span>
                  </label>
                  <span className="text-[11px] font-mono text-neutral-500 underline cursor-pointer hover:text-black">
                    Oversized Fit Guide
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {sizeList.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-mono font-bold uppercase rounded-sm transition-all duration-200 border ${
                        selectedSize === size
                          ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                          : "bg-white text-neutral-800 border-neutral-300 hover:border-black hover:bg-neutral-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mb-8">
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-3 tracking-wider">
                  QUANTITY:
                </label>
                <div className="inline-flex items-center border border-neutral-300 rounded-sm bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-200 transition"
                    aria-label="Decrease Quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 text-sm font-mono font-bold text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-neutral-600 hover:text-black hover:bg-neutral-200 transition"
                    aria-label="Increase Quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist Actions */}
              <div className="flex items-center space-x-3 mb-8">
                <AddToCartButton
                  product={product}
                  selectedSize={selectedSize}
                  quantity={quantity}
                />
                <AddToWishlistButton product={product} />
              </div>

              {/* Value Proposition Highlights */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-center mb-8">
                <div>
                  <Truck className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="block text-[10px] font-mono font-bold uppercase text-neutral-800">
                    Free Shipping
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">Nationwide</span>
                </div>
                <div>
                  <RefreshCw className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="block text-[10px] font-mono font-bold uppercase text-neutral-800">
                    7-Day Returns
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">Easy Exchange</span>
                </div>
                <div>
                  <ShieldCheck className="w-5 h-5 text-red-600 mx-auto mb-1" />
                  <span className="block text-[10px] font-mono font-bold uppercase text-neutral-800">
                    450GSM Cotton
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500">French Terry</span>
                </div>
              </div>

              {/* Accordions: Description, Specs, Shipping */}
              <div className="border-t border-neutral-200 divide-y divide-neutral-200">
                {/* Description */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("description")}
                    className="w-full flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>PRODUCT DETAILS & DESCRIPTION</span>
                    {openAccordion === "description" ? (
                      <ChevronUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  {openAccordion === "description" && (
                    <div className="mt-3 text-xs font-mono text-neutral-600 leading-relaxed space-y-2">
                      <p>
                        {product.description ||
                          "Crafted from premium 450GSM double-layered heavyweight French Terry cotton. Features an engineered drop-shoulder silhouette, kinetic typography graphics, and reinforced double-stitched seams."}
                      </p>
                    </div>
                  )}
                </div>

                {/* Fabric & Specs */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("specs")}
                    className="w-full flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>FABRIC, FIT & CARE SPECS</span>
                    {openAccordion === "specs" ? (
                      <ChevronUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  {openAccordion === "specs" && (
                    <div className="mt-3 text-xs font-mono text-neutral-600 leading-relaxed space-y-1.5">
                      <p>• 100% Heavyweight French Terry Cotton (450 GSM)</p>
                      <p>• Fit: Engineered Oversized Drop-Shoulder</p>
                      <p>• Print: High-Density Screen Print / Hand Finished</p>
                      <p>• Care: Machine wash cold inside out, tumble dry low</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="py-4">
                  <button
                    onClick={() => toggleAccordion("shipping")}
                    className="w-full flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-black text-left"
                  >
                    <span>SHIPPING & RETURNS POLICY</span>
                    {openAccordion === "shipping" ? (
                      <ChevronUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-neutral-400" />
                    )}
                  </button>
                  {openAccordion === "shipping" && (
                    <div className="mt-3 text-xs font-mono text-neutral-600 leading-relaxed space-y-1.5">
                      <p>• Dispatched within 24-48 hours via Express Delivery.</p>
                      <p>• Free shipping across India on all orders.</p>
                      <p>• Hassle-free 7-day returns & exchanges for unworn items.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Drops Section */}
          {relatedProducts?.length > 0 && (
            <section className="mt-20 pt-12 border-t border-neutral-200">
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-widest">
                  RECOMMENDED
                </span>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  // COMPLETE THE FIT
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-black mb-8">
                Related Drops In Archive
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((relProduct) => (
                  <ProductCard key={relProduct.id} product={relProduct} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductViewPage;

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    let product = null;

    // Try fetching from API server first
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
      product = res.data;
    } catch (apiError) {
      // Fallback to static products array if API server is offline
      product =
        FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id) || p.slug === id) ||
        FALLBACK_PRODUCTS[0];
    }

    if (!product) {
      product = FALLBACK_PRODUCTS[0];
    }

    // Related products fallback
    let related = FALLBACK_PRODUCTS.filter((p) => String(p.id) !== String(product.id)).slice(0, 4);

    try {
      const relatedRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
      const allApiProducts = relatedRes.data.results || [];
      if (allApiProducts.length > 0) {
        related = allApiProducts
          .filter((p) => p.category === product.category && String(p.id) !== String(product.id))
          .slice(0, 4);
      }
    } catch (e) {
      // Ignore API related error, use static related products
    }

    return {
      props: {
        product,
        relatedProducts: related,
      },
    };
  } catch (err) {
    return {
      props: {
        product: FALLBACK_PRODUCTS[0],
        relatedProducts: FALLBACK_PRODUCTS.slice(1, 5),
      },
    };
  }
}
