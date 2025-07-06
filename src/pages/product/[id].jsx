import { useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import AddToWishlistButton from "../../components/AddToWishlistButton";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";

const ProductViewPage = ({ product, relatedProducts }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState("");
  const [openSection, setOpenSection] = useState(null);

  const sizeList =
    typeof product.available_sizes === "string"
      ? product.available_sizes.split(",").map((s) => s.trim())
      : Array.isArray(product.available_sizes)
      ? product.available_sizes
      : [];

  const colorList =
    typeof product.available_colors === "string"
      ? product.available_colors.split(",").map((c) => c.trim())
      : Array.isArray(product.available_colors)
      ? product.available_colors
      : [];

  return (
    <>
      <div className="px-4 py-10 max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-10 flex items-center">
          <a href="/" className="hover:underline">
            Home
          </a>
          &nbsp;<IoIosArrowForward />&nbsp;
          <a href="/shop" className="hover:underline">
            Shop
          </a>
          &nbsp;<IoIosArrowForward />&nbsp;
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[560px] object-cover rounded-sm"
              onError={(e) => (e.target.src = "/images/fallback.png")}
            />
            <div className="flex mt-4 space-x-2">
              {[product.image, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer border rounded-md ${
                    selectedImage === img ? "border-red-500" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-5">{product.name}</h2>
            <p className="text-sm text-gray-500 font-normal mb-5">{product.description}</p>
            <p className="text-sm  text-gray-500 mb-2">
              {product.category?.name || product.category}
            </p>
            <h4 className="text-xl text-red-500 mb-4">₹{product.price}</h4>

            {/* Size Selector */}
            {sizeList.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Select Size:</p>
                <div className="flex space-x-2">
                  {sizeList.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-3 py-1 rounded-sm ${
                        selectedSize === size ? "bg-black text-white" : "hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {/* {colorList.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Available Colors:</p>
                <div className="flex space-x-2">
                  {colorList.map((color, index) => (
                    <div
                      key={index}
                      title={color}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: color,
                        borderColor: selectedColor === color ? "black" : "#ccc",
                        borderWidth: selectedColor === color ? 3 : 2,
                      }}
                      className="w-6 h-6 rounded-sm border cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )} */}

            {/* Quantity Selector */}
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Quantity:</p>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="border px-3 py-1 rounded w-20"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <AddToCartButton
                product={product}
                selectedSize={selectedSize}
                quantity={quantity}
                selectedColor={selectedColor}
              />
              <AddToWishlistButton
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
              />
            </div>

            {/* Accordion: Description & Return Policy */}
            <div className="mt-6 space-y-4">
              {/* Product Description */}
              <div className="border border-gray-200 rounded-sm">
                <button
                  className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center"
                  onClick={() =>
                    setOpenSection(openSection === "description" ? null : "description")
                  }
                >
                  <span>Additional Information</span>
                  <span>{openSection === "description" ? "−" : "+"}</span>
                </button>
                {openSection === "description" && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {product.description || "No description available."}
                  </div>
                )}
              </div>

              {/* Return Policy */}
              <div className="border border-gray-200 rounded-sm">
                <button
                  className="w-full text-left px-4 py-3 font-medium text-gray-800 flex justify-between items-center"
                  onClick={() => setOpenSection(openSection === "return" ? null : "return")}
                >
                  <span>Return Policy</span>
                  <span>{openSection === "return" ? "−" : "+"}</span>
                </button>
                {openSection === "return" && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    <p>
                      We offer a 7-day return or exchange policy on unworn items with tags.
                      Refunds are processed within 3–5 business days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts?.length > 0 && (
        <div className="mt-16 mb-10 max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold mb-6">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="relative p-0 transition-all cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[260px] sm:h-[280px] md:h-[280px] lg:h-[320px] xl:h-[340px] object-cover"
                  />
                  <div className="p-0">
                    {product.isNew && (
                      <span className="absolute top-3 left-4 bg-red-500 text-white text-sm px-3 py-0 rounded-sm">
                        New
                      </span>
                    )}
                    <h3 className="mt-5 text-base font-medium line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {product.oldPrice && (
                        <h4 className="text-gray-400 line-through text-base">₹{product.oldPrice}</h4>
                      )}
                      <h4 className="text-red-500 text-base font-medium">₹{product.price}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
    const product = res.data;

    // Fetch all products and filter related
    const relatedRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
    const allProducts = relatedRes.data;

    const related = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    return {
      props: {
        product,
        relatedProducts: related,
      },
    };
  } catch (err) {
    console.error("Failed to fetch product:", err.message);
    return {
      notFound: true,
    };
  }
}

export default ProductViewPage;
