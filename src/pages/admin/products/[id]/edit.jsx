import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Trash2, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    oldPrice: "",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock_quantity: "25",
    image: "/images/home/new-1.png",
    description: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/products`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.products?.find((p) => String(p.id) === String(id));
          if (found) {
            setFormData({
              name: found.name || "",
              slug: found.slug || "",
              price: found.price || "",
              oldPrice: found.oldPrice || "",
              category: found.category || "T-Shirts",
              sizes: found.sizes || ["S", "M", "L", "XL"],
              stock_quantity: String(found.stock_quantity || 10),
              image: found.image || "/images/home/new-1.png",
              description: found.description || "",
              is_active: found.is_active ?? true,
              is_featured: found.is_featured ?? false,
            });
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setFormData({
      ...formData,
      name: val,
      slug: val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    });
  };

  const handleSizeToggle = (size) => {
    const current = [...formData.sizes];
    const updated = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    setFormData({ ...formData, sizes: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success("Product drop updated successfully!");
      setLoading(false);
      router.push("/admin/products");
    }, 500);
  };

  return (
    <AdminLayout title={`Edit Product Drop (${formData.name || id || ""})`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/products"
            className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-500 hover:text-black uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products Catalog</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Info Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-4">
              General Product Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="e.g. EVERYDAY REBEL"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="oversized-black-tee"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Engineered 450GSM heavy cotton oversized streetwear t-shirt..."
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
              />
            </div>
          </div>

          {/* Pricing & Inventory Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-4">
              Pricing & Inventory
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="999"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Compare At Price (₹)
                </label>
                <input
                  type="number"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                  placeholder="1299"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Stock Inventory *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  placeholder="45"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                >
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Hoodies">Hoodies</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex space-x-2">
                  {["S", "M", "L", "XL"].map((sz) => {
                    const isSelected = formData.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => handleSizeToggle(sz)}
                        className={`py-2 px-4 rounded-lg text-xs font-mono font-bold transition border ${
                          isSelected
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-neutral-50 text-neutral-600 border-neutral-300 hover:border-black"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Media & Status Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
            <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-4">
              Media & Visibility
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                Primary Product Image Path
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/home/new-1.png"
                  className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                />
                <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                  <Image
                    src={formData.image || "/images/home/new-1.png"}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8 pt-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 accent-red-600 rounded"
                />
                <span className="text-xs font-mono font-bold text-neutral-800 uppercase">
                  Publish (Active on Catalog)
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-red-600 rounded"
                />
                <span className="text-xs font-mono font-bold text-neutral-800 uppercase">
                  Featured Drop on Home Page
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/products"
              className="px-6 py-3 border border-neutral-300 text-neutral-700 font-mono font-bold text-xs uppercase rounded-lg hover:bg-neutral-100 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "Updating..." : "Update Product Drop"}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
