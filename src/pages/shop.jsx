import { useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Filter, RotateCcw, Loader2 } from "lucide-react";

export default function ShopPage() {
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const categories = ["T-Shirts", "Hoodies", "Jackets", "Accessories"];
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setCatalog(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Filter products cleanly using live catalog data from Supabase
  const filteredProducts = useMemo(() => {
    let list = [...catalog];

    // Top tab quick filter
    if (activeTab === "TEES") {
      list = list.filter((p) => p.category === "T-Shirts");
    } else if (activeTab === "HOODIES") {
      list = list.filter((p) => p.category === "Hoodies");
    } else if (activeTab === "NEW") {
      list = list.filter((p) => p.isNew || p.is_featured);
    }

    // Drawer Category Filter
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Sizes Filter
    if (selectedSizes.length > 0) {
      list = list.filter((p) => {
        const prodSizes = Array.isArray(p.sizes) ? p.sizes : [];
        return selectedSizes.some((size) => prodSizes.includes(size));
      });
    }

    // Availability Filter
    if (isAvailable) {
      list = list.filter((p) => (p.stock_quantity ?? p.stock ?? 10) > 0);
    }

    // Sorting
    if (sortOrder === "lowToHigh") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === "highToLow") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [catalog, activeTab, selectedCategory, selectedSizes, isAvailable, sortOrder]);

  const toggleTempSize = (size) => {
    if (tempSizes.includes(size)) {
      setTempSizes(tempSizes.filter((s) => s !== size));
    } else {
      setTempSizes([...tempSizes, size]);
    }
  };

  const openDrawer = () => {
    setTempCategory(selectedCategory);
    setTempSizes(selectedSizes);
    setTempAvailability(isAvailable);
    setTempSortOrder(sortOrder);
    setIsDrawerOpen(true);
  };

  const applyDrawerFilters = () => {
    setSelectedCategory(tempCategory);
    setSelectedSizes(tempSizes);
    setIsAvailable(tempAvailability);
    setSortOrder(tempSortOrder);
    setIsDrawerOpen(false);
  };

  const resetDrawerFilters = () => {
    setTempCategory("");
    setTempSizes([]);
    setTempAvailability(false);
    setTempSortOrder("");
  };

  const hasActiveFilters =
    selectedCategory !== "" || selectedSizes.length > 0 || isAvailable || sortOrder !== "";

  return (
    <>
      <Head>
        <title>All Drops & Collection | Last Man On Earth</title>
        <meta
          name="description"
          content="Explore the complete collection of heavyweight streetwear, limited drops, and premium apparel."
        />
      </Head>

      <main className="bg-white min-h-screen text-black font-sans selection:bg-red-600 selection:text-white">
        {/* Header Hero Banner */}
        <section className="bg-neutral-950 text-white pt-12 pb-14 px-4 sm:px-14 border-b border-neutral-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="container mx-auto max-w-7xl relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-6">
              <Link href="/" className="hover:text-red-500 transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-white font-bold">Catalog</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-red-600 text-xs font-mono font-bold uppercase tracking-widest block mb-2">
                  [ Live Supabase Catalog ]
                </span>
                <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
                  All Drops & Garments
                </h1>
              </div>
              <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-md">
                Heavyweight 450GSM textiles, kinetic graphics, and engineered oversized fits.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Filter Navigation Bar */}
        <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-neutral-200 py-4 px-4 sm:px-14 shadow-sm">
          <div className="container mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {[
                { id: "ALL", label: "All Garments" },
                { id: "TEES", label: "T-Shirts" },
                { id: "HOODIES", label: "Hoodies" },
                { id: "NEW", label: "Featured Drops" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition whitespace-nowrap border ${
                    activeTab === tab.id
                      ? "bg-black text-white border-black"
                      : "bg-neutral-100 text-neutral-600 border-transparent hover:bg-neutral-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={openDrawer}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition flex items-center space-x-2"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-red-600 ml-1 inline-block" />
                )}
              </button>

              <div className="hidden sm:flex items-center space-x-2 border border-neutral-300 px-3 py-2 rounded-sm bg-neutral-50">
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
            {loading ? (
              <div className="text-center py-24">
                <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
                <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                  Loading catalog drops from Supabase...
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-8">
                <Filter className="w-12 h-12 text-red-600 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-black uppercase text-black tracking-tight mb-2">
                  No Drops Found
                </h2>
                <p className="text-neutral-500 font-mono text-xs max-w-md mx-auto mb-6">
                  {catalog.length === 0
                    ? "No products in database yet. Add products from the Admin Panel!"
                    : "No products matched your selected filters. Try resetting your size or category selection."}
                </p>
                {hasActiveFilters && (
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
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Filter Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col justify-between"
            >
              <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-black uppercase tracking-tight text-black">
                    Filter Garments
                  </h3>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition"
                >
                  <IoClose className="w-6 h-6 text-black" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-8">
                {/* Category Filter */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 mb-3 tracking-wider">
                    Category
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTempCategory("")}
                      className={`p-3 text-xs font-mono font-bold uppercase rounded-lg border text-center transition ${
                        tempCategory === ""
                          ? "bg-black text-white border-black"
                          : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400"
                      }`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setTempCategory(cat)}
                        className={`p-3 text-xs font-mono font-bold uppercase rounded-lg border text-center transition ${
                          tempCategory === cat
                            ? "bg-black text-white border-black"
                            : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Filter */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 mb-3 tracking-wider">
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((sz) => {
                      const isSelected = tempSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          onClick={() => toggleTempSize(sz)}
                          className={`w-12 h-12 text-xs font-mono font-bold uppercase rounded-lg border flex items-center justify-center transition ${
                            isSelected
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="pt-2">
                  <label className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-200 cursor-pointer">
                    <span className="text-xs font-mono font-bold uppercase text-black">
                      In Stock Only
                    </span>
                    <input
                      type="checkbox"
                      checked={tempAvailability}
                      onChange={(e) => setTempAvailability(e.target.checked)}
                      className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                    />
                  </label>
                </div>

                {/* Sort Option */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 mb-3 tracking-wider">
                    Sort By
                  </h4>
                  <select
                    value={tempSortOrder}
                    onChange={(e) => setTempSortOrder(e.target.value)}
                    className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono uppercase text-black focus:outline-none focus:border-black"
                  >
                    <option value="">Default Order</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-neutral-200 bg-neutral-50 flex items-center space-x-4">
                <button
                  onClick={resetDrawerFilters}
                  className="w-1/3 py-3 text-center text-xs font-mono font-bold uppercase text-neutral-600 hover:text-black border border-neutral-300 rounded-lg transition"
                >
                  Reset
                </button>
                <button
                  onClick={applyDrawerFilters}
                  className="w-2/3 py-3 bg-red-600 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-widest rounded-lg transition shadow-lg shadow-red-600/20"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
