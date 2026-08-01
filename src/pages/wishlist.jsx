import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";
import SizeModal from "../components/SizeModal";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(null);
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    setSelectedItem(item);
    setIsSizeModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Saved Wishlist Drops | Last Man On Earth</title>
        <meta
          name="description"
          content="Review and manage your saved favorite streetwear drops."
        />
      </Head>

      <main className="bg-white text-black min-h-screen selection:bg-red-600 selection:text-white py-10 sm:py-16 px-4 sm:px-14">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-6 mb-10 gap-4">
            <div>
              <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
                // SAVED DROPS
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
                Your Wishlist
              </h1>
            </div>
            {wishlistItems.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-mono font-bold uppercase rounded-sm border border-neutral-200">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "Drop Saved" : "Drops Saved"}
                </span>
                <button
                  onClick={() => dispatch(clearWishlist())}
                  className="text-xs font-mono text-neutral-500 hover:text-red-600 uppercase tracking-wider underline transition"
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>

          {/* Empty Wishlist State */}
          {wishlistItems.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black uppercase text-black tracking-tight mb-2">
                Your Wishlist Is Empty
              </h2>
              <p className="text-neutral-500 font-mono text-xs max-w-md mx-auto mb-8 leading-relaxed">
                Looks like you haven't saved any streetwear drops to your wishlist yet. Explore the drop catalog and save your favorites for later.
              </p>
              <Link href="/shop">
                <button className="inline-flex items-center space-x-3 px-8 py-4 bg-red-600 hover:bg-black text-white font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-red-600/20">
                  <span>EXPLORE DROP CATALOG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ) : (
            /* Active Wishlist Grid */
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {wishlistItems.map((item) => {
                  const product = item.product_detail || item;
                  const imageSrc = product.image || "/images/home/new-1.png";

                  return (
                    <div
                      key={item.id}
                      className="group relative bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                          <Link href={`/product/${product.id}`}>
                            <Image
                              src={imageSrc}
                              alt={product.name || "Product Image"}
                              fill
                              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                              className="object-cover transition-all duration-500 group-hover:scale-105"
                            />
                          </Link>

                          {/* Quick Remove Button */}
                          <button
                            onClick={() => dispatch(removeFromWishlist({ id: item.id }))}
                            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-red-600 text-neutral-700 hover:text-white shadow-md transition-all duration-200 z-20"
                            title="Remove from Wishlist"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          {/* Category Tag */}
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-mono font-black uppercase px-2.5 py-1 tracking-widest z-10 shadow-md">
                            SAVED
                          </span>
                        </div>

                        {/* Product Info */}
                        <div className="p-4 sm:p-5">
                          <div className="text-[10px] font-mono uppercase text-red-600 font-bold mb-1 tracking-wider">
                            {product.category?.name || product.category || "STREETWEAR"}
                          </div>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-sm sm:text-base font-black uppercase text-neutral-900 tracking-tight truncate group-hover:text-red-600 transition duration-200">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-3 mt-2 font-mono">
                            <span className="text-base sm:text-lg font-black text-black">
                              ₹{product.price}
                            </span>
                            {product.old_price && (
                              <span className="text-xs text-neutral-400 line-through">
                                ₹{product.old_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Add to Cart Action Button */}
                      <div className="p-4 pt-0">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full py-3 bg-black hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 rounded-sm shadow-md"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>MOVE TO BAG</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Size Selector Modal */}
              <SizeModal
                isOpen={isSizeModalOpen}
                sizes={String(selectedItem?.product_detail?.available_sizes || "S, M, L, XL")
                  .split(",")
                  .map((s) => s.trim())}
                onClose={() => {
                  setSelectedItem(null);
                  setIsSizeModalOpen(false);
                }}
                onSelect={(size) => {
                  if (selectedItem?.product_detail) {
                    dispatch(
                      addToCart({
                        id: selectedItem.product_detail.id,
                        name: selectedItem.product_detail.name,
                        price: selectedItem.product_detail.price,
                        image: selectedItem.product_detail.image,
                        quantity: 1,
                        size,
                        color: selectedItem.color || "",
                      })
                    );
                    toast.success("Moved drop to bag!");
                  }
                  setIsSizeModalOpen(false);
                  setSelectedItem(null);
                }}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
