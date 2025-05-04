import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import allProducts from "@/data/products";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton"; // Import AddToCartButton

const ProductViewPage = () => {
  const { slug } = useRouter().query;
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const found = allProducts.find(
        p => p.slug.toLowerCase() === slug.toString().toLowerCase()
      );
      if (found) {
        setProduct(found);
        setSelectedImage(found.image); // ✅ set initial image
      }
    }
  }, [slug]);

  // const handleWhatsAppOrder = () => {
  //   const phoneNumber = "917736840046"; // your WhatsApp number
  
  //   const message = `Hello! I'm interested in ordering:\n\n🛍️ Product: ${product.name}\n📏 Size: ${selectedSize || "Not selected"}\n🔢 Quantity: ${quantity}\n🖼️ Image: ${selectedImage}\n\nPlease let me know how to proceed.`;
  
  //   const encodedMessage = encodeURIComponent(message);
  //   const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  //   window.open(url, "_blank"); // Opens in a new tab
  // };
  
  

  if (!slug || !product) return <div>Loading...</div>;

  return (
    <>
      
      <div className="px-4 py-10 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-3xl"
            />

            {/* Thumbnails */}
            <div className="flex mt-4 space-x-2 ">
              {product.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setSelectedImage(img)} // ✅ change main image
                  className={`w-20 h-20 object-cover cursor-pointer border rounded-xl ${
                    selectedImage === img ? "border-red-500" : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
            <p className="text-xl text-gray-700 mb-4">₹{product.price}</p>
            {product.description && <p className="mb-4">{product.description}</p>}

            {/* Size Selector */}
            {product.sizes && (
              <div className="mb-4">
                <h4 className="font-semibold mb-1">Select Size:</h4>
                <div className="flex space-x-2">
                  {product.sizes.map((size: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-3 py-1 rounded ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Quantity:</label>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border px-3 py-1 rounded w-20"
              />
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3 mt-4">
              <AddToCartButton product={product} selectedSize={selectedSize} quantity={quantity} />
              <AddToWishlistButton product={product} selectedSize={selectedSize} />
            </div>
            {/* <button
              onClick={handleWhatsAppOrder}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Order on WhatsApp
            </button> */}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ProductViewPage;
