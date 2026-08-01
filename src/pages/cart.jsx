import { useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  addQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag as EmptyBagIcon,
} from "lucide-react";

export default function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const router = useRouter();

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const handleProceedToCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      router.push("/login?next=/checkout");
    }
  };

  return (
    <>
      <Head>
        <title>Shopping Bag | Last Man On Earth</title>
        <meta
          name="description"
          content="Review your selected streetwear drops and proceed to checkout."
        />
      </Head>

      <main className="bg-white text-black min-h-screen selection:bg-red-600 selection:text-white py-10 sm:py-16 px-4 sm:px-14">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-6 mb-10 gap-4">
            <div>
              <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
                // YOUR SELECTION
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tighter text-black">
                Shopping Bag
              </h1>
            </div>
            {cartItems.length > 0 && (
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-neutral-100 text-neutral-800 text-xs font-mono font-bold uppercase rounded-sm border border-neutral-200">
                  {cartItems.length} {cartItems.length === 1 ? "Drop" : "Drops"} in Bag
                </span>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-mono text-neutral-500 hover:text-red-600 uppercase tracking-wider underline transition"
                >
                  Clear Bag
                </button>
              </div>
            )}
          </div>

          {/* Empty Cart State */}
          {cartItems.length === 0 ? (
            <div className="text-center py-20 bg-neutral-50 border border-neutral-200 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <EmptyBagIcon className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black uppercase text-black tracking-tight mb-2">
                Your Bag Is Empty
              </h2>
              <p className="text-neutral-500 font-mono text-xs max-w-md mx-auto mb-8 leading-relaxed">
                Looks like you haven't added any streetwear drops to your bag yet. Explore the drop archive and claim yours before it's gone.
              </p>
              <Link href="/shop">
                <button className="inline-flex items-center space-x-3 px-8 py-4 bg-red-600 hover:bg-black text-white font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg shadow-red-600/20">
                  <span>EXPLORE DROP CATALOG</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ) : (
            /* Active Cart Layout Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Items List */}
              <div className="lg:col-span-7 space-y-6">
                {/* Table Header (Desktop) */}
                <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                  <div className="col-span-6">Product Drop</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-neutral-200">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center group"
                    >
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex items-center space-x-4">
                        <Link
                          href={`/product/${item.id}`}
                          className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0"
                        >
                          <Image
                            src={item.image || "/images/home/new-1.png"}
                            alt={item.name || "Product"}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="96px"
                          />
                        </Link>
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-sm sm:text-base font-black uppercase text-black group-hover:text-red-600 transition duration-200 tracking-tight">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center space-x-2 mt-1 font-mono text-xs text-neutral-500">
                            <span>FIT/SIZE: <strong className="text-black font-extrabold">{item.size}</strong></span>
                            {item.color && (
                              <>
                                <span>•</span>
                                <span>COLOR: {item.color}</span>
                              </>
                            )}
                          </div>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  id: item.id,
                                  size: item.size,
                                  color: item.color,
                                })
                              )
                            }
                            className="mt-2 inline-flex items-center space-x-1 text-[11px] font-mono text-neutral-400 hover:text-red-600 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="hidden sm:block sm:col-span-2 text-center font-mono text-sm font-bold text-neutral-700">
                        ₹{item.price}
                      </div>

                      {/* Quantity Controls */}
                      <div className="sm:col-span-2 flex justify-between sm:justify-center items-center">
                        <div className="inline-flex items-center border border-neutral-300 rounded-sm bg-neutral-50">
                          <button
                            onClick={() =>
                              dispatch(
                                decreaseQuantity({
                                  id: item.id,
                                  size: item.size,
                                  color: item.color,
                                })
                              )
                            }
                            className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-200 transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold text-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              dispatch(
                                addQuantity({
                                  id: item.id,
                                  size: item.size,
                                  color: item.color,
                                })
                              )
                            }
                            className="p-1.5 text-neutral-600 hover:text-black hover:bg-neutral-200 transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Row Total */}
                      <div className="sm:col-span-2 text-right font-mono text-base font-black text-black">
                        ₹{(Number(item.price) * item.quantity).toFixed(0)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Back to Shop Link */}
                <div className="pt-4 border-t border-neutral-200">
                  <Link
                    href="/shop"
                    className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-600 hover:text-red-600 transition"
                  >
                    <span>← Continue Shopping Drop Catalog</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-5 sticky top-28">
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
                    // ORDER SUMMARY
                  </span>
                  <h2 className="text-2xl font-black uppercase tracking-tight text-black mb-6">
                    Bag Total
                  </h2>

                  <div className="space-y-4 font-mono text-xs border-b border-neutral-200 pb-6 mb-6">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal ({cartItems.length} drops)</span>
                      <span className="font-bold text-black">₹{totalPrice.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 items-center">
                      <span>Express Nationwide Shipping</span>
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold uppercase rounded-sm">
                        FREE
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Estimated Taxes</span>
                      <span className="text-neutral-400">Included</span>
                    </div>
                  </div>

                  {/* Total Amount */}
                  <div className="flex justify-between items-baseline mb-8 font-mono">
                    <span className="text-sm font-bold uppercase text-black">Total Amount</span>
                    <span className="text-3xl font-black text-black">₹{totalPrice.toFixed(0)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 bg-red-600 hover:bg-black text-white font-mono font-black text-xs sm:text-sm uppercase tracking-widest flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20 transition-all duration-300 rounded-sm mb-6"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  {/* Security & Guarantee Badges */}
                  <div className="space-y-2.5 pt-4 border-t border-neutral-200 text-[11px] font-mono text-neutral-500">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>Encrypted SSL Secure Checkout</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>Free Express Shipping Across India</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>7-Day Easy Returns & Exchange Policy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
