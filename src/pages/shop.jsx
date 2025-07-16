// pages/shop.js
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";
import Head from "next/head";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";


const ShopPage = ({ initialProducts, initialCount, pageSize }) => {

  const [products, setProducts] = useState(initialProducts);
  const [count, setCount] = useState(initialCount);
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(count / pageSize);

  // Fetch data when page changes
  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/products/?page=${currentPage}`);
      setProducts(res.data.results);
      setCount(res.data.count);
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top
    } catch (err) {
      console.error("Error fetching page:", err);
    }
    setLoading(false);
  };

  fetchProducts();
}, [currentPage]);

  console.log(products)
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [tempCategory, setTempCategory] = useState("");
  const [tempSizes, setTempSizes] = useState([]);
  const [tempAvailability, setTempAvailability] = useState(false);
  const [tempSortOrder, setTempSortOrder] = useState("");

  const categories = ["Oversized T-shirt", "T-shirt"];
  const sizes = ["S", "M", "L", "XL"];

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedSizes.length > 0) {
      result = result.filter((p) => {
        const productSizes = p.available_sizes?.split(",").map((s) => s.trim());
        return productSizes?.some((size) => selectedSizes.includes(size));
      });
    }

    if (isAvailable) {
      result = result.filter((p) => p.available === true);
    }

    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
    setLoading(false);
  }, [products, selectedCategory, selectedSizes, isAvailable, sortOrder]);

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

  return (
    <>
      <Head>
        <title>Shop | LME</title>
        <meta
          name="description"
          content="Explore our latest collection of oversized T-shirts and more."
        />
      </Head>

      <div className="py-8 px-4 sm:px-6 lg:px-20 xl:px-28">
        <h1 className="text-2xl font-bold text-gray-800 mb-10 sm:mb-5 uppercase">Our Store</h1>
        <div className=" justify-between items-center hidden sm:block">
          <button
            onClick={() => {
              setTempCategory(selectedCategory);
              setTempSizes(selectedSizes);
              setTempAvailability(isAvailable);
              setTempSortOrder(sortOrder);
              setIsDrawerOpen(true);
            }}
            className="flex justify-center gap-3 items-center text-sm px-0 py-2 mb-5 bg-white text-black rounded hover:text-red-600 uppercase"
          >
            <HiAdjustmentsHorizontal size={20} /> Filters and Sort
          </button>
        </div>

        {/* Mobile Fixed Filter Button */}
        <div className="sm:hidden fixed bottom-5 right-5 z-50">
          <button
            onClick={() => {
              setTempCategory(selectedCategory);
              setTempSizes(selectedSizes);
              setTempAvailability(isAvailable);
              setTempSortOrder(sortOrder);
              setIsDrawerOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-sm shadow-lg hover:bg-red-600 transition uppercase"
          >
            <HiAdjustmentsHorizontal size={20} />
            <span className="text-sm font-medium">Filter & Sort</span>
          </button>
        </div>

        {/* Filter Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                className="w-80 bg-white h-full p-6 shadow-xl relative z-50 overflow-y-auto"
              >
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="absolute top-4 right-4 text-xl text-gray-600 hover:text-black"
                >
                  <IoClose />
                </button>

                <h2 className="text-xl font-semibold mb-4 uppercase">Filter And Sort</h2>

                {/* Category */}
                <div className="mb-4">
                  <label className="block text-base font-semibold text-gray-700 mb-2 uppercase poppins-font border-b">Category</label>
                  {categories.map((cat) => (
                    <label key={cat} className="block text-sm text-gray-800">
                      <input
                        type="checkbox"
                        checked={tempCategory === cat}
                        onChange={() =>
                          setTempCategory(tempCategory === cat ? "" : cat)
                        }
                        className="mr-2"
                      />
                      {cat}
                    </label>
                  ))}
                </div>

                {/* Size */}
                <div className="mb-4">
                  <label className="block text-base font-semibold text-gray-700 mb-2 uppercase poppins-font border-b">Size</label>
                  {sizes.map((size) => (
                    <label key={size} className="block text-sm text-gray-800">
                      <input
                        type="checkbox"
                        checked={tempSizes.includes(size)}
                        onChange={() => toggleSize(size)}
                        className="mr-2"
                      />
                      {size}
                    </label>
                  ))}
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <label className="block text-base font-semibold text-gray-700 mb-2 uppercase poppins-font border-b">Availability</label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={tempAvailability}
                      onChange={() => setTempAvailability((prev) => !prev)}
                      className="form-checkbox h-5 w-5 text-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-800">In Stock Only</span>
                  </label>
                </div>

                {/* Sort */}
                <div className="mb-6">
                  <label className="block text-base font-semibold text-gray-700 mb-1 uppercase poppins-font">Sort By</label>
                  <select
                    value={tempSortOrder}
                    onChange={(e) => setTempSortOrder(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  >
                    <option value="">Date: New to Old</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 text-sm px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 text-sm px-4 py-2 bg-black text-white rounded-sm hover:bg-red-600"
                  >
                    Apply
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-40"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-64 w-full mb-4 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600 py-10 ">
            <h2 className="text-2xl font-semibold mb-2 uppercase">No products found</h2>
            <p className="mb-4">We couldn't find any items that match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSelectedSizes([]);
                setIsAvailable(false);
                setSortOrder("");
              }}
              className="px-4 py-2 bg-black text-white rounded-sm hover:bg-red-600 transition"
            >
              View All Products
            </button>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2 flex-wrap text-sm">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-sm border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`px-4 py-2 rounded-sm border transition ${num === currentPage
                        ? "bg-black text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-sm border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>

        )}
      </div>
      
    </>
  );
};

export default ShopPage;

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get(`/products/?page=1`);
    return {
      props: {
        initialProducts: res.data.results,
        initialCount: res.data.count,
        pageSize: 12,
      },
    };
  } catch (error) {
    return {
      props: {
        initialProducts: [],
        initialCount: 0,
        pageSize: 12,
      },
    };
  }
}
