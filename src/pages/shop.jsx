'use client';

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/products/');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isMounted) return null;

  const categories = ["Oversized T-shirt", "T-shirt"];

  let filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (sortOrder === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-20 xl:px-28">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Home</span> / <span className="text-black ">Shop</span>
      </div>

      {/* Filters + Sort */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Left Filter Dropdown */}
        <div>
          {/* <select
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            value={selectedCategory || ""}
            className="border border-gray-300 px-2 py-2 rounded text-sm bg-white"
          >
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select> */}
        </div>

        {/* Right Sort Dropdown */}
        <div>
          <select
            onChange={(e) => setSortOrder(e.target.value)}
            value={sortOrder}
            className="border border-gray-300 px-2 py-3 md:py-2 rounded text-sm bg-white focus:outline-none focus:ring-0"
          >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
