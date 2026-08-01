import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Plus, FolderTree, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch(() => {});
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat = {
      id: String(Date.now()),
      name: newCatName.trim(),
      slug: newCatName.trim().toLowerCase().replace(/\s+/g, "-"),
      count: 0,
    };

    setCategories([...categories, newCat]);
    setNewCatName("");
    toast.success("Category added successfully");
  };

  const handleDelete = (id) => {
    if (confirm("Delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted");
    }
  };

  return (
    <AdminLayout title="Product Categories">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Create Category Bar */}
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
          <h3 className="text-sm font-black uppercase text-neutral-900 mb-4 tracking-tight">
            Add New Product Category
          </h3>
          <form onSubmit={handleAddCategory} className="flex gap-3">
            <input
              type="text"
              required
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="e.g. Oversized Tees, Heavyweight Hoodies, Caps..."
              className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                <th className="py-3 px-6">Category Name</th>
                <th className="py-3 px-6">URL Slug</th>
                <th className="py-3 px-6">Items Count</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs font-mono">
              {categories.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50/80 transition">
                  <td className="py-4 px-6 font-bold text-neutral-900">{c.name}</td>
                  <td className="py-4 px-6 text-neutral-500">/{c.slug}</td>
                  <td className="py-4 px-6 font-bold text-red-600">{c.count} items</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 text-neutral-400 hover:text-red-600 transition"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
