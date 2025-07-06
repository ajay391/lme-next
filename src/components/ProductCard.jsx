import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="relative group rounded-sm overflow-hidden bg-white ">
        {/* Product Image */}
        <div className="relative w-full h-[250px] sm:h-[320px] md:h-[360px] lg:h-[380px] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform hover:scale-[1.05]"
            placeholder="blur"
            blurDataURL="/images/placeholder.png" // optional blur fallback
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-sm uppercase tracking-wide shadow-md">
              New
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="p-0">
          <h3 className="mt-5 text-base font-medium line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{product.category}</p>
          <div className="flex items-center gap-2">
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{product.oldPrice}
              </span>
            )}
            <span className="text-lg font-medium text-red-500">₹{product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
