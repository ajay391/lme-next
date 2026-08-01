import { useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Filter, RotateCcw } from "lucide-react";

// Expanded static catalog with real image assets for preview
const STATIC_CATALOG = [
  {
    id: 1,
    name: "EVERYDAY REBEL",
    slug: "oversized-black-tee",
    price: "999",
    oldPrice: "1299",
    image: "/images/home/new-1.png",
    hoverImage: "/images/home/new-4.png",
    category: "T-Shirts",
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
    hoverImage: "/images/home/new-5.png",
    category: "Hoodies",
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
    hoverImage: "/images/home/new-1.png",
    category: "T-Shirts",
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
    hoverImage: "/images/home/new-2.png",
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    in_stock: true,
    isNew: false,
  },
  {
    id: 5,
    name: "BLACKOUT GRID",
    slug: "drop-shoulder-tee",
    price: "1299",
    oldPrice: "1599",
    image: "/images/home/style-1.png",
    hoverImage: "/images/home/style-2.png",
    category: "T-Shirts",
    sizes: ["M", "L", "XL"],
    in_stock: true,
    isNew: false,
  },
  {
    id: 6,
    name: "UNSEEN REALM",
    slug: "oversized-washed-tee",
    price: "1399",
    oldPrice: "1699",
    image: "/images/home/new-4.png",
    hoverImage: "/images/home/new-6.png",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    in_stock: true,
    isNew: false,
  },
  {
    id: 7,
    name: "MINIMAL POWER",
    slug: "cropped-hoodie",
    price: "1899",
    oldPrice: "2299",
    image: "/images/home/new-6.png",
    hoverImage: "/images/home/new-3.png",
    category: "Hoodies",
    sizes: ["S", "M", "L"],
    in_stock: true,
    isNew: false,
  },
  {
    id: 8,
    name: "PRIME STREETWEAR",
    slug: "nowhere-classic-tee",
    price: "1099",
    oldPrice: "1399",
    image: "/images/home/hero-1.png",
    hoverImage: "/images/home/style-1.png",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    in_stock: true,
    isNew: false,
  },
];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Temporary drawer state
  const [tempCategory, setTempCategory] = useState("");
  const [tempSizes, setTempSizes] = useState([]);
  const [tempAvailability, setTempAvailability] = useState(false);
  const [tempSortOrder, setTempSortOrder] = useState("");

  const categories = ["T-Shirts", "Hoodies"];
  const sizes = ["S", "M", "L", "XL"];

  // Filter products cleanly using static data
  const filteredProducts = useMemo(() => {
    let list = [...STATIC_CATALOG];

    // Top tab quick filter
    if (activeTab === "TEES") {
      list = list.filter((p) => p.category === "T-Shirts");
    } else if (activeTab === "HOODIES") {
      list = list.filter((p) => p.category === "Hoodies");
    } else if (activeTab === "NEW") {
      list = list.filter((p) => p.isNew);
    }

    // Drawer Category Filter
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Drawer Size Filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        selectedSizes.some((size) => p.sizes?.includes(size))
      );
    }

    // Availability Filter
    if (isAvailable) {
      list = list.filter((p) => p.in_stock === true);
    }

    // Sort Order
    if (sortOrder === "lowToHigh") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "highToLow") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [activeTab, selectedCategory, selectedSizes, isAvailable, sortOrder]);

  const handleApplyFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedSizes(tempSizes);
    setIsAvailable(tempAvailability);
    setSortOrder(tempSortOrder);
    setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setTempCategory("");
    setTempSizes([]);
    setTempAvailability(false);
    setTempSortOrder("");
  };

  const toggleSize = (size) => {
    setTempSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedSizes.length +
    (isAvailable ? 1 : 0) +
    (sortOrder ? 1 : 0);

  return (
    <>
      <Head>
        <title>Shop Drop Catalog | Last Man On Earth</title>
        <meta
          name="description"
          content="Explore our latest collection of oversized streetwear tees, heavyweight hoodies, and limited drops."
        />
      </Head>

      <main className="bg-white text-black min-h-screen selection:bg-red-600 selection:text-white">
        {/* Shop Hero Header Section */}
        <section className="relative py-16 sm:py-24 px-4 sm:px-14 border-b border-neutral-200 overflow-hidden bg-neutral-50">
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-widest">
                    DROP ARCHIVE 2026
                  </span>
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    // POST-APOCALYPTIC STREETWEAR
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none mb-4">
                  The Full Catalog
                </h1>
                <p className="text-neutral-600 text-sm sm:text-base font-mono leading-relaxed max-w-xl">
                  Heavyweight 450GSM cotton, engineered drop-shoulder cuts, and kinetic graphics built to outlast the storm.
                </p>
              </div>

              {/* Status Stats Pill */}
              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-8 text-xs font-mono text-neutral-500">
                <div>
                  <span className="block text-2xl font-black text-black">{filteredProducts.length}</span>
                  <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Active Drops</span>
                </div>
                <div className="w-[1px] h-8 bg-neutral-200" />
                <div>
                  <span className="block text-2xl font-black text-red-600">450</span>
                  <span className="text-[10px] uppercase text-neutral-500 tracking-wider">GSM Cotton</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Controls & Filter Bar */}
        <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-4 px-4 sm:px-14">
          <div className="container mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-4">
            {/* Quick Filter Category Tabs */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide py-1">
              {[
                { id: "ALL", label: "ALL DROPS" },
                { id: "TEES", label: "OVERSIZED TEES" },
                { id: "HOODIES", label: "HEAVYWEIGHT HOODIES" },
                { id: "NEW", label: "NEW RELEASES" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 rounded-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "bg-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter & Sort Actions */}
            <div className="flex items-center space-x-3 ml-auto">
              <button
                onClick={() => {
                  setTempCategory(selectedCategory);
                  setTempSizes(selectedSizes);
                  setTempAvailability(isAvailable);
                  setTempSortOrder(sortOrder);
                  setIsDrawerOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-black hover:text-white text-black text-xs font-mono font-bold uppercase tracking-wider border border-neutral-300 transition duration-200 rounded-sm shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4 text-red-600" />
                <span>Filter & Sort</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-600 text-white text-[10px] rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Inline Sort Dropdown */}
              <div className="hidden md:flex items-center space-x-2 bg-white border border-neutral-300 px-3 py-1.5 rounded-sm shadow-sm">
                <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-transparent text-black text-xs font-mono uppercase focus:outline-none cursor-pointer"
                >
                  <option value="">Sort: Default</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-12 px-4 sm:px-14 bg-white">
          <div className="container mx-auto max-w-7xl">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
                <Filter className="w-12 h-12 text-red-600 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-black uppercase text-black tracking-tight mb-2">
                  No Drops Found
                </h2>
                <p className="text-neutral-500 font-mono text-xs max-w-md mx-auto mb-6">
                  No products matched your selected filters. Try resetting your size or category selection.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("ALL");
                    setSelectedCategory("");
                    setSelectedSizes([]);
                    setIsAvailable(false);
                    setSortOrder("");
                  }}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition duration-200 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* White Filter & Sort Slide-Over Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              {/* Drawer Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                className="w-full sm:w-96 bg-white text-black h-full p-6 border-l border-neutral-200 shadow-2xl relative z-50 overflow-y-auto flex flex-col"
              >
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-neutral-200 mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-red-600 uppercase tracking-widest block">
                      // PREFERENCES
                    </span>
                    <h2 className="text-xl font-black uppercase tracking-tight text-black">
                      Filter & Sort
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-neutral-500 hover:text-black hover:bg-neutral-100 rounded-full transition duration-200"
                    aria-label="Close Drawer"
                  >
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* Category Section */}
                <div className="mb-6">
                  <label className="block text-xs font-mono uppercase text-neutral-500 font-bold mb-3 tracking-widest">
                    CATEGORY
                  </label>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label
                        key={cat}
                        className="flex items-center space-x-3 p-2.5 rounded bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-sm font-mono text-neutral-800 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={tempCategory === cat}
                          onChange={() =>
                            setTempCategory(tempCategory === cat ? "" : cat)
                          }
                          className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size Section */}
                <div className="mb-6">
                  <label className="block text-xs font-mono uppercase text-neutral-400 font-bold mb-3 tracking-widest">
                    AVAILABLE SIZE
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => {
                      const isChecked = tempSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => toggleSize(size)}
                          className={`py-2 rounded text-xs font-mono font-bold uppercase transition border ${
                            isChecked
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-neutral-100 text-neutral-700 border-neutral-200 hover:border-black"
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Availability Section */}
                <div className="mb-6">
                  <label className="block text-xs font-mono uppercase text-neutral-500 font-bold mb-3 tracking-widest">
                    AVAILABILITY
                  </label>
                  <label className="flex items-center space-x-3 p-2.5 rounded bg-neutral-50 border border-neutral-200 text-sm font-mono text-neutral-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tempAvailability}
                      onChange={() => setTempAvailability((prev) => !prev)}
                      className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                    />
                    <span>In Stock Drops Only</span>
                  </label>
                </div>

                {/* Sort Section */}
                <div className="mb-6">
                  <label className="block text-xs font-mono uppercase text-neutral-500 font-bold mb-3 tracking-widest">
                    SORT ORDER
                  </label>
                  <select
                    value={tempSortOrder}
                    onChange={(e) => setTempSortOrder(e.target.value)}
                    className="w-full bg-white border border-neutral-300 text-black font-mono text-xs rounded p-3 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="">Date: Newest First</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-3 pt-6 border-t border-neutral-200">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 py-3 border border-neutral-300 hover:border-neutral-800 text-neutral-700 font-mono font-bold text-xs uppercase rounded transition"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase rounded transition shadow-lg shadow-red-600/20"
                  >
                    Apply Filters
                  </button>
                </div>
              </motion.div>

              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
