import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AddToCartButton from "../../components/AddToCartButton";
import AddToWishlistButton from "../../components/AddToWishlistButton";
import axiosInstance from "../../utils/axiosInstance";

const ProductViewPage = () => {
  const { id } = useRouter().query;

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sizeList, setSizeList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const response = await axiosInstance.get(`/products/${id}/`);
        const data = response.data;
        setProduct(data);
        setSelectedImage(data.image);

        setSizeList(
          typeof data.available_sizes === "string"
            ? data.available_sizes.split(",").filter((size) => size.trim())
            : Array.isArray(data.available_sizes)
            ? data.available_sizes
            : []
        );

        setColorList(
          typeof data.available_colors === "string"
            ? data.available_colors.split(",").filter((color) => color.trim())
            : Array.isArray(data.available_colors)
            ? data.available_colors
            : []
        );
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!id || !product) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="px-4 py-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div>
          <img
            src={selectedImage || product.image}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-3xl"
          />

          {/* Thumbnails */}
          <div className="flex mt-4 space-x-2">
            {[product.image, ...(product.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover cursor-pointer border rounded-xl ${
                  selectedImage === img ? "border-red-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-sm text-gray-500 mb-2">{product.category?.name}</p>
          <p className="text-xl text-gray-700 mb-4">₹{product.price}</p>
          {product.description && <p className="mb-4">{product.description}</p>}

          {/* Size Selector */}
          {sizeList.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Select Size:</h4>
              <div className="flex space-x-2">
                {sizeList.map((size, index) => (
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
          {colorList.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Available Colors:</h4>
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
                    className="w-6 h-6 rounded-full border cursor-pointer transition-all"
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
