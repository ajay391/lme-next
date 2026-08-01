import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Settings, Save, Megaphone, Truck, Mail, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    shipping_flat_fee: "99",
    free_shipping_threshold: "1999",
    announcement_bar_text: "FREE EXPRESS SHIPPING NATIONWIDE ON ORDERS ABOVE ₹1,999",
    support_email: "support@lme.com",
    support_phone: "+91 9876543210",
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        toast.success("Store configuration saved live!");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (err) {
      toast.error("Error updating store settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Store Settings">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Announcement Copy Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
              <Megaphone className="w-4 h-4 text-red-600" />
              <span>Announcement Banner Copy</span>
            </h3>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                Top Announcement Bar Text (Displayed across top of website)
              </label>
              <input
                type="text"
                required
                value={settings.announcement_bar_text}
                onChange={(e) =>
                  setSettings({ ...settings, announcement_bar_text: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
              />
              <p className="text-[11px] font-mono text-neutral-400 mt-1">
                Updating this copy immediately updates the marquee message on the live site without code redeploys.
              </p>
            </div>
          </div>

          {/* Shipping Rates Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
              <Truck className="w-4 h-4 text-red-600" />
              <span>Shipping Rates & Thresholds</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Flat Delivery Charge (₹)
                </label>
                <input
                  type="number"
                  value={settings.shipping_flat_fee}
                  onChange={(e) =>
                    setSettings({ ...settings, shipping_flat_fee: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Free Shipping Minimum Order (₹)
                </label>
                <input
                  type="number"
                  value={settings.free_shipping_threshold}
                  onChange={(e) =>
                    setSettings({ ...settings, free_shipping_threshold: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* Contact Support Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-red-600" />
              <span>Store Support Contact Info</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Support Email
                </label>
                <input
                  type="email"
                  value={settings.support_email}
                  onChange={(e) =>
                    setSettings({ ...settings, support_email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                  Support Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={settings.support_phone}
                  onChange={(e) =>
                    setSettings({ ...settings, support_phone: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
                />
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-red-600 hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? "Saving Settings..." : "Save Store Configuration"}</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
