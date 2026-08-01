import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this drop from catalog?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout title="Catalog Products">
      {/* Action Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product drops..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-2 px-3 bg-white border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
          >
            <option value="ALL">All Categories</option>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Hoodies">Hoodies</option>
            <option value="Jackets">Jackets</option>
          </select>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product Drop</span>
        </Link>
      </div>

      {/* Products Data Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock Inventory</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs font-mono">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400 font-mono">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-neutral-50/80 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0">
                          <Image
                            src={p.image || "/images/home/new-1.png"}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <span className="block font-black uppercase text-neutral-900">
                            {p.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {p.sizes?.join(", ")}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded text-[10px] font-bold">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-neutral-900">
                      ₹{p.price}
                      {p.oldPrice && (
                        <span className="block text-[10px] text-neutral-400 line-through">
                          ₹{p.oldPrice}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center font-bold ${
                          p.stock_quantity <= 5 ? "text-amber-600" : "text-neutral-900"
                        }`}
                      >
                        {p.stock_quantity <= 5 && (
                          <AlertCircle className="w-3.5 h-3.5 mr-1" />
                        )}
                        {p.stock_quantity} units
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          p.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {p.is_active ? (
                          <CheckCircle className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <XCircle className="w-3 h-3 text-neutral-400" />
                        )}
                        <span>{p.is_active ? "Active" : "Draft"}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="inline-flex items-center p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="inline-flex items-center p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
