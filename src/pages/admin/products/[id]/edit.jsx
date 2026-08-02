import { useEffect, useState } from "react";
import AdminLayout from "../../../../components/admin/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Upload, Loader2, Trash2, Star } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    oldPrice: "",
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    stock_quantity: "25",
    image: "/images/home/new-1.png",
    images: [],
    description: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    if (id) {
      setFetching(true);
      fetch(`/api/admin/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const product = data.product;
          if (product) {
            const galleryImages = Array.isArray(product.images) && product.images.length > 0
              ? product.images
              : product.image ? [product.image] : ["/images/home/new-1.png"];

            setFormData({
              name: product.name || "",
              slug: product.slug || "",
              price: String(product.price || ""),
              oldPrice: String(product.oldPrice || product.old_price || ""),
              category: product.category || "T-Shirts",
              sizes: Array.isArray(product.sizes) ? product.sizes : ["S", "M", "L", "XL"],
              stock_quantity: String(product.stock_quantity ?? 10),
              image: product.image || galleryImages[0] || "/images/home/new-1.png",
              images: galleryImages,
              description: product.description || "",
              is_active: product.is_active ?? true,
              is_featured: product.is_featured ?? false,
            });
          }
          setFetching(false);
        })
        .catch(() => setFetching(false));
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

  const handleMultipleUploads = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    const uploadToast = toast.loading(`Uploading ${files.length} image(s) to Supabase Storage...`);

    const uploadedUrls = [];

    for (const file of files) {
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("bucket", "uploads");

        const res = await fetch("/api/storage/upload", {
          method: "POST",
          body: data,
        });

        const json = await res.json();
        if (res.ok && json.url) {
          uploadedUrls.push(json.url);
        } else {
          uploadedUrls.push(URL.createObjectURL(file));
        }
      } catch (err) {
        console.error("Upload failed for file:", file.name);
      }
    }

    if (uploadedUrls.length > 0) {
      setFormData((prev) => {
        const newImages = [...prev.images, ...uploadedUrls];
        const newPrimary = prev.image === "/images/home/new-1.png" || !prev.image ? newImages[0] : prev.image;
        return {
          ...prev,
          image: newPrimary,
          images: newImages,
        };
      });
      toast.success(`Uploaded ${uploadedUrls.length} image(s)!`, { id: uploadToast });
    } else {
      toast.error("Failed to upload images.", { id: uploadToast });
    }

    setUploading(false);
  };

  const removeGalleryImage = (indexToRemove) => {
    setFormData((prev) => {
      const updatedImages = prev.images.filter((_, idx) => idx !== indexToRemove);
      const updatedCover = prev.image === prev.images[indexToRemove]
        ? (updatedImages[0] || "/images/home/new-1.png")
        : prev.image;
      return {
        ...prev,
        image: updatedCover,
        images: updatedImages,
      };
    });
  };

  const setCoverImage = (imgUrl) => {
    setFormData((prev) => ({ ...prev, image: imgUrl }));
    toast.success("Cover image updated!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        images: formData.images.length > 0 ? formData.images : [formData.image],
      };

      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product Drop Updated in Supabase!");
        router.push("/admin/products");
      } else {
        toast.error(data.message || "Failed to update product");
      }
    } catch (err) {
      toast.error("An error occurred updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Edit Product Drop">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/products"
            className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-500 hover:text-black uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {fetching ? (
          <div className="py-20 text-center text-xs font-mono text-neutral-400">
            Loading product data from Supabase...
          </div>
        ) : (
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
                    placeholder="e.g. MOTORSPORT GRAPHIC TEE"
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
                    placeholder="motorsport-graphic-tee"
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
                    placeholder="1299"
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
                    placeholder="1699"
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
                    placeholder="25"
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

            {/* Product Gallery & Visibility Card */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-6">
              <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight">
                    Product Gallery Images (4–5 Photos)
                  </h3>
                  <p className="text-xs font-mono text-neutral-500 mt-1">
                    Upload multiple product angles. Click any photo star to set it as the primary cover image.
                  </p>
                </div>

                <label className="cursor-pointer px-4 py-2.5 bg-neutral-900 hover:bg-red-600 text-white font-mono text-xs font-bold uppercase rounded-lg transition flex items-center space-x-2 shrink-0">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>{uploading ? "Uploading..." : "Upload Multiple Images"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleUploads}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* Gallery Images Grid */}
              {formData.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                  {formData.images.map((imgUrl, idx) => {
                    const isCover = formData.image === imgUrl;
                    return (
                      <div
                        key={idx}
                        className={`relative group aspect-[3/4] rounded-xl overflow-hidden bg-neutral-100 border-2 transition ${
                          isCover ? "border-red-600 ring-2 ring-red-600/30" : "border-neutral-200"
                        }`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Gallery Image ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 20vw"
                        />

                        {/* Cover Badge */}
                        {isCover && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-red-600 text-white text-[9px] font-mono font-bold uppercase rounded shadow">
                            Cover
                          </div>
                        )}

                        {/* Action Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center space-x-2 p-2">
                          {!isCover && (
                            <button
                              type="button"
                              onClick={() => setCoverImage(imgUrl)}
                              className="p-2 bg-white/90 text-black hover:bg-yellow-400 hover:text-black rounded-lg transition"
                              title="Set as Cover Image"
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="p-2 bg-white/90 text-neutral-700 hover:bg-red-600 hover:text-white rounded-lg transition"
                            title="Remove Image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 border-2 border-dashed border-neutral-300 rounded-xl text-center">
                  <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-xs font-mono text-neutral-600 font-bold uppercase">
                    No gallery images uploaded yet
                  </p>
                  <p className="text-[11px] font-mono text-neutral-400 mt-1">
                    Click "Upload Multiple Images" above to add front, back, and detail product shots.
                  </p>
                </div>
              )}

              {/* Visibility Settings */}
              <div className="flex items-center space-x-8 pt-4 border-t border-neutral-200">
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
                disabled={loading || uploading}
                className="px-8 py-3 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{loading ? "Updating in Supabase..." : "Update Product Drop"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
