import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Image from "next/image";
import { Upload, Copy, Check, Trash2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

const MEDIA_IMAGES = [
  { id: 1, name: "new-1.png", url: "/images/home/new-1.png", size: "420 KB" },
  { id: 2, name: "new-2.png", url: "/images/home/new-2.png", size: "510 KB" },
  { id: 3, name: "new-3.png", url: "/images/home/new-3.png", size: "380 KB" },
  { id: 4, name: "new-4.png", url: "/images/home/new-4.png", size: "620 KB" },
  { id: 5, name: "new-5.png", url: "/images/home/new-5.png", size: "490 KB" },
  { id: 6, name: "new-6.png", url: "/images/home/new-6.png", size: "530 KB" },
  { id: 7, name: "style-1.png", url: "/images/home/style-1.png", size: "710 KB" },
  { id: 8, name: "style-2.png", url: "/images/home/style-2.png", size: "680 KB" },
];

export default function AdminMediaPage() {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success("Image URL copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <AdminLayout title="Media Library">
      {/* Upload Header */}
      <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight">
            Store Product Assets
          </h3>
          <p className="text-xs font-mono text-neutral-500">
            Upload & manage product photos stored locally or in Supabase Bucket
          </p>
        </div>

        <button className="px-4 py-2.5 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Image File</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {MEDIA_IMAGES.map((media) => (
          <div
            key={media.id}
            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="relative aspect-[3/4] w-full bg-neutral-100">
              <Image
                src={media.url}
                alt={media.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="200px"
              />
            </div>
            <div className="p-3 font-mono text-xs">
              <span className="block font-bold text-neutral-900 truncate">{media.name}</span>
              <span className="text-[10px] text-neutral-400 block mb-2">{media.size}</span>
              <button
                onClick={() => handleCopy(media.url, media.id)}
                className="w-full py-1.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 text-[10px] font-bold uppercase rounded transition flex items-center justify-center space-x-1"
              >
                {copiedId === media.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
