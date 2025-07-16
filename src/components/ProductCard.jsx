import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="relative group rounded-sm overflow-hidden bg-white mb-2 sm:mb-8">
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
          <h3 className="mt-5 text-base sm:text-lg font-medium line-clamp-2">{product.name}</h3>
          {/* <p className="text-sm text-gray-400 mt-1 capitalize">{product.category}</p> */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-3">
            {product.old_price && (
              <span className="text-base sm:text-base text-gray-400 line-through">
                Rs.{product.old_price}
              </span>
            )}
            <span className="text-base sm:text-base font-medium text-red-500">Rs.{product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
