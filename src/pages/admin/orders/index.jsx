import { useEffect, useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Link from "next/link";
import { Eye, Search, Filter, ArrowUpRight } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []))
      .catch(() => {});
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order ${orderId} updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "ALL" ||
      o.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout title="Orders & Fulfillment">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search order ID or customer..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-white border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div className="text-xs font-mono text-neutral-500">
          Showing <strong className="text-black font-bold">{filteredOrders.length}</strong> orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                <th className="py-3 px-6">Order Reference</th>
                <th className="py-3 px-6">Customer Details</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Total Amount</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Fulfillment Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs font-mono">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono">
                    No orders found matching filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-neutral-50/80 transition">
                    <td className="py-4 px-6 font-bold text-neutral-900">{o.id}</td>
                    <td className="py-4 px-6">
                      <span className="block font-bold text-neutral-900">{o.customer_name}</span>
                      <span className="text-[10px] text-neutral-400">{o.customer_email}</span>
                    </td>
                    <td className="py-4 px-6 text-neutral-500">{o.date}</td>
                    <td className="py-4 px-6 font-bold text-neutral-900">₹{o.total}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          o.payment_status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {o.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusUpdate(o.id, e.target.value)}
                        className="py-1 px-2.5 bg-neutral-100 border border-neutral-300 rounded text-xs font-mono font-bold uppercase focus:outline-none focus:border-red-600 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/admin/orders/${o.id}`}
                        className="inline-flex items-center space-x-1 p-2 text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-lg transition"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </Link>
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
