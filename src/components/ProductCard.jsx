import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="relative p-0 transition-all">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[450px] object-cover rounded-3xl"
        />
        <div className="p-0">
          {/* "New" tag only if isNew is true */}
          {product.isNew && (
            <span className="absolute top-3 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full">
              New
            </span>
          )}
          <h3 className="mt-5 text-3xl font-bold">{product.name}</h3>
          <p className="text-base text-gray-500 mt-1">{product.category}</p>
          <div className="flex items-center gap-3 mt-1">
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-lg">₹{product.oldPrice}</p>
            )}
            <p className="text-black text-lg font-semibold">₹{product.price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
