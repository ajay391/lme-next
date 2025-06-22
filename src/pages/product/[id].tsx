import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import AddToWishlistButton from "@/components/AddToWishlistButton";
import axiosInstance from "@/utils/axiosInstance";

const ProductViewPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await axiosInstance.get(`/products/${id}/`);
        const data = response.data;

        const sizes = data.available_sizes
          ? data.available_sizes.split(",").filter(s => s.trim() !== "")
          : [];

        const colors = data.available_colors
          ? data.available_colors.split(",").filter(c => c.trim() !== "")
          : [];

        setProduct({ ...data, sizes, colors });
        setSelectedImage(data.image);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!id || !product) return <div>Loading...</div>;

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-3xl"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="text-xl text-gray-700 mb-4">₹{product.price}</p>
          {product.description && <p className="mb-4">{product.description}</p>}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
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

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Select Color:</h4>
              <div className="flex space-x-2">
                {product.colors.map((color: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      borderColor: "#ccc"
                    }}
                  />
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
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
