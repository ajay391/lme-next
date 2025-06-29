'use client';

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";

const ShopPage = () => {
  const [products, setProducts] = useState([
    {
    id: "grid-ghost-01",
    name: "Grid Ghost Tee",
    category: "F1 Streetwear",
    image: "/images/products/p1.png",
    isNew: true,
    oldPrice: 1899,
    price: 1499,
  },
  {
    id: "final-lap-02",
    name: "Final Lap Oversized",
    category: "Oversized T-shirt",
    image: "/images/products/p2.png",
    isNew: false,
    oldPrice: 1599,
    price: 1299,
  },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosInstance.get('/products/');
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  if (!isMounted) return null;

  // Extract unique category names from product.category?.name
  const categories = Array.from(
    new Set(
      products
        .map((p) => p.category?.name)
        .filter((name) => name) // remove undefined/null
    )
  );

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category?.name === selectedCategory)
    : products;

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-20 xl:px-28">
      <h1 className="text-3xl font-bold mb-4">Shop Now</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${!selectedCategory ? "bg-black text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${selectedCategory === category ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

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
