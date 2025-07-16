import { useEffect, useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import AddToWishlistButton from "../../components/AddToWishlistButton";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import SkeletonImage from '../../components/skeletons/ImageSkeleton'

const ProductViewPage = ({ product, relatedProducts }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState("");
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize("");
    setQuantity(1);
    setSelectedColor("");
    setOpenSection("description");
  }, [product]);

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
          <span className="text-red-500">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <SkeletonImage
              src={selectedImage}
              alt={product.name}
              className="w-full h-[560px] object-cover rounded-sm"
              onError={(e) => (e.target.src = "/images/fallback.png")}
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[product.image, ...(product.images || [])].slice(0, 4).map((img, i) => (
                <div key={i} className="w-full">
                  <SkeletonImage
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-full h-[80px] sm:h-[120px] md:h-[120px] lg:h-[120px] object-cover cursor-pointer rounded-sm border transition duration-200 ${selectedImage === img ? "border-red-500" : "border-gray-300"
                      }`}
                    onError={(e) => (e.target.src = "/images/fallback.png")}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h2 className="text-2xl font-semibold mb-5">{product.name}</h2>
            {/* <p className="text-sm text-gray-500 font-normal mb-5">{product.description}</p> */}
            <p className="text-sm  text-gray-500 mb-2">
              {product.category?.name || product.category}
            </p>
            <div className="flex items-center gap-3 mb-4">
              {product.old_price && (
                <span className="text-xl text-gray-500 line-through">Rs.{product.old_price}</span>
              )}
              <span className="text-xl text-red-500 font-normal">Rs.{product.price}</span>
            </div>

            {/* Size Selector */}
            {sizeList.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1"> Size:</p>
                <div className="flex space-x-2">
                  {sizeList.map((size, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`w-[40px] border px-3 py-1 rounded-sm ${selectedSize === size ? "bg-black text-white" : "hover:border-black"
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
                className="border px-3 py-1 rounded-sm w-16"
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
              <div className="border-b border-gray-200 rounded-sm">
                <button
                  className="w-full text-left px-0 py-3 font-medium text-gray-800 flex justify-between items-center"
                  onClick={() =>
                    setOpenSection(openSection === "description" ? null : "description")
                  }
                >
                  <span className="uppercase">Description</span>
                  <span>{openSection === "description" ? "−" : "+"}</span>
                </button>
                {openSection === "description" && (
                  <div className="px-0 pb-4 text-sm text-gray-500">
                    <p>
                      {product.description || "No description available."}
                    </p>
                  </div>
                )}
              </div>

              {/* Additional Information */}
              <div className="border-b border-gray-200 rounded-sm">
                <button
                  className="w-full text-left px-0 py-3 font-medium text-gray-800 flex justify-between items-center"
                  onClick={() =>
                    setOpenSection(openSection === "additional" ? null : "additional")
                  }
                >
                  <span className="uppercase">Additional Information</span>
                  <span>{openSection === "additional" ? "−" : "+"}</span>
                </button>
                {openSection === "additional" && (
                  <div className="px-0 pb-4 text-sm text-gray-600">
                    <p>
                      {product.additional_info || "No information available."}
                    </p>
                  </div>
                )}
              </div>

              {/* Return Policy */}
              <div className="border-b border-gray-200 rounded-sm">
                <button
                  className="w-full text-left px-0 py-3 font-medium text-gray-800 flex justify-between items-center"
                  onClick={() => setOpenSection(openSection === "return" ? null : "return")}
                >
                  <span className="uppercase">Return Policy</span>
                  <span>{openSection === "return" ? "−" : "+"}</span>
                </button>
                {openSection === "return" && (
                  <div className="px-0 pb-4 text-sm text-gray-600">
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
        <div className="mt-8 sm:mt-12 px-4 sm:px-4 mb-16 max-w-6xl mx-auto">
          <h3 className="text-xl font-medium mb-10 uppercase">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
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
                    <h3 className="mt-5 text-base font-medium line-clamp-1 ">{product.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 capitalize">{product.category}</p>
                    <div className="flex items-center gap-3 mt-1">
                      {product.old_price && (
                        <h4 className="text-gray-400 line-through text-base sm:text-lg">₹{product.old_price}</h4>
                      )}
                      <h4 className="text-red-500 text-base sm:text-lg font-medium">₹{product.price}</h4>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      <div className="w-full bg-black py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-white text-sm sm:text-base font-medium uppercase">
          Free shipping on all orders | New arrivals now live! | Premium quality oversized T-shirts & more
        </div>
      </div>

    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}/`);
    const product = res.data;
    // console.log(product,"--pro")

    // Fetch all products and filter related
    const relatedRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
    const allProducts = relatedRes.data.results || [];
    // console.log(allProducts)

    const related = allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
//       console.log("Product Category:", product.category);
// console.log("Filtered Related Products:", related);

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
