import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="relative p-0 transition-all">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[250px] sm:h-[340px] md:h-[360px] lg:h-[380px] xl:h-[380px] object-cover "
        />
        <div className="p-0">
          {/* "New" tag only if isNew is true */}
          {product.isNew && (
            <span className="absolute top-3 left-4 bg-red-500 text-white text-sm px-3 py-0 rounded-sm">
              New
            </span>
          )}
          <h3 className="mt-5 text-md font-medium line-clamp-2 ">{product.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{product.category}</p>
          <div className="flex items-center gap-3 mt-1">
            {product.oldPrice && (
              <h4 className="text-gray-400 line-through text-base">₹{product.oldPrice}</h4>
            )}
            <h4 className="text-red-500 text-base font-medium">₹{product.price}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
