// pages/shop.js
import { useState, useMemo, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";
import Head from "next/head";
import { HiAdjustmentsHorizontal  } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";

const ShopPage = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [tempCategory, setTempCategory] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("");

  const categories = ["Oversized T-shirt", "T-shirt"];

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  setLoading(true);

  let result = [...products];

  if (selectedCategory) {
    result = result.filter((p) => p.category === selectedCategory);
  }

  if (sortOrder === "lowToHigh") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    result.sort((a, b) => b.price - a.price);
  }

  setFilteredProducts(result);
  setLoading(false);
}, [products, selectedCategory, sortOrder]);

  const handleCategoryChange = (value) => {
  // If value is same as before, still update to force filter
  setSelectedCategory("");
  setTimeout(() => {
    setSelectedCategory(value);
  }, 0);
};

  return (
    <>
      <Head>
        <title>Shop | Your Store</title>
        <meta
          name="description"
          content="Explore our latest collection of oversized T-shirts and more."
        />
      </Head>

      <div className="py-8 px-4 sm:px-6 lg:px-20 xl:px-28">
        {/* Breadcrumb */}
        {/* <div className="mb-6 text-sm text-gray-500 flex justify-start items-center">
          <span className="hover:underline cursor-pointer">Home</span> <IoIosArrowForward/>{" "}
          <span className="text-black">Shop</span>
        </div> */}

        <h1 className="text-2xl font-bold text-gray-800 mb-10 sm:mb-6">Our Store</h1>

        {/* Desktop Filter & Sort */}
        <div className="hidden sm:flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Category:</label>
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
              className="px-3 py-2 rounded text-sm bg-white "
            >
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort By:</label>
            <select
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
              className="px-3 py-2 rounded text-sm bg-white"
            >
              <option value="">Date: New to Old</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Button */}
       <div className="sm:hidden">
        <button
          onClick={() => {
            setTempCategory(selectedCategory);
            setTempSortOrder(sortOrder);
            setIsFilterOpen(true);
          }}
          className="fixed bottom-5 right-5 z-50 p-2 bg-red-500 rounded-sm shadow-lg text-white hover:text-red-500 transition"
          aria-label="Open Filters"
        >
          <HiAdjustmentsHorizontal className="w-6 h-6" />
        </button>
      </div>

        {/* Filter Drawer for Mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40">
            <div className="w-full bg-white rounded-t-xl max-w-md mx-auto p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-medium text-gray-800">Filter & Sort</h4>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-800 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              {/* Category */}
              <div className="mb-4">
                <label className="block text-base font-medium  text-gray-700 mb-1">Category:</label>
                <select
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-3 py-3 rounded text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-base font-medium text-gray-700 mb-1">Sort By:</label>
                <select
                  value={tempSortOrder}
                  onChange={(e) => setTempSortOrder(e.target.value)}
                  className="w-full bg-white border border-gray-300 px-3 py-3 rounded text-sm"
                >
                  <option value="">Date: New to Old</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>

              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setTempCategory("");
                    setTempSortOrder("");
                  }}
                  className="text-sm px-4 py-2 bg-red-500 border border-gray-300 rounded text-white hover:bg-gray-100"
                >
                  Reset
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory(tempCategory);
                    setSortOrder(tempSortOrder);
                    setIsFilterOpen(false);
                  }}
                  className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-red-600"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product List */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse border border-gray-200 rounded-lg p-4">
                <div className="bg-gray-200 h-48 w-full mb-4 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            <h2 className="text-xl font-semibold mb-2">No products found</h2>
            <p className="mb-4">We couldn't find any items that match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSortOrder("");
              }}
              className="px-4 py-2 bg-black text-white rounded hover:bg-red-600 transition"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ShopPage;

export async function getServerSideProps() {
  try {
    const res = await axiosInstance.get("/products/");
    return {
      props: {
        products: res.data,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}
