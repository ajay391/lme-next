import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Eye,
} from "lucide-react";
import Link from "next/link";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminDashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Overview Dashboard">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-1">
              30-Day Revenue
            </span>
            <h3 className="text-2xl font-black font-mono text-neutral-900">
              ₹{stats?.totalRevenue?.toLocaleString() || "208,900"}
            </h3>
            <span className="inline-flex items-center text-[11px] font-mono text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +18.4% vs last month
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-1">
              Total Orders
            </span>
            <h3 className="text-2xl font-black font-mono text-neutral-900">
              {stats?.totalOrders || 111}
            </h3>
            <span className="inline-flex items-center text-[11px] font-mono text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +12 new today
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-1">
              Active Catalog Drops
            </span>
            <h3 className="text-2xl font-black font-mono text-neutral-900">
              {stats?.activeProducts || 24}
            </h3>
            <span className="inline-flex items-center text-[11px] font-mono text-neutral-500 mt-1">
              4 Categories
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
            <Package className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider block mb-1">
              Registered Customers
            </span>
            <h3 className="text-2xl font-black font-mono text-neutral-900">
              {stats?.totalCustomers || 89}
            </h3>
            <span className="inline-flex items-center text-[11px] font-mono text-emerald-600 font-bold mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +8 this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {stats?.lowStockCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-900">
                Low Stock Alert
              </span>
              <p className="text-xs font-mono text-amber-700">
                3 products are running below 5 items in inventory.
              </p>
            </div>
          </div>
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs uppercase rounded-lg transition"
          >
            Review Inventory
          </Link>
        </div>
      )}

      {/* Analytics Chart & Quick Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Chart Column */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight">
                Revenue Trajectory (30 Days)
              </h3>
              <p className="text-xs font-mono text-neutral-500">
                Daily sales performance & trend
              </p>
            </div>
            <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-mono font-bold rounded-md">
              INR (₹)
            </span>
          </div>

          <div className="h-72 w-full">
            {stats?.revenueChart && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.revenueChart}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#dc2626"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Action Quick Bar */}
        <div className="lg:col-span-4 bg-neutral-900 text-white p-6 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-2">
              // QUICK ACTIONS
            </span>
            <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">
              Catalog Management
            </h3>
            <p className="text-xs font-mono text-neutral-400 mb-6 leading-relaxed">
              Add new drop releases, manage stock levels, or handle incoming customer orders.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition shadow-lg shadow-red-600/20"
            >
              <span>+ Add New Drop Release</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition"
            >
              <span>View All Orders ({stats?.totalOrders || 111})</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center justify-between w-full py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition"
            >
              <span>Edit Store Announcement Copy</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <div>
            <h3 className="text-base font-black uppercase text-neutral-900 tracking-tight">
              Recent Customer Orders
            </h3>
            <p className="text-xs font-mono text-neutral-500">
              Latest transactions placed on the storefront
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-mono font-bold text-red-600 hover:underline uppercase"
          >
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Total Amount</th>
                <th className="py-3 px-6">Payment</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs font-mono">
              {stats?.recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/80 transition">
                  <td className="py-4 px-6 font-bold text-neutral-900">{order.id}</td>
                  <td className="py-4 px-6">
                    <span className="block font-bold text-neutral-900">{order.customer}</span>
                    <span className="text-[10px] text-neutral-400">{order.email}</span>
                  </td>
                  <td className="py-4 px-6 text-neutral-500">{order.date}</td>
                  <td className="py-4 px-6 font-bold text-neutral-900">₹{order.total}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        order.payment === "Paid"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        order.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center space-x-1 p-2 text-neutral-500 hover:text-black transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </Link>
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
