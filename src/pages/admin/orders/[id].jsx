import { useState, useEffect } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowLeft, Package, Truck, User, MapPin, CheckCircle, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [order, setOrder] = useState({
    id: id || "ORD-9842",
    customer_name: "Aarav Sharma",
    customer_email: "aarav@gmail.com",
    customer_phone: "9876543210",
    date: "2026-08-01",
    total: 2998,
    status: "Processing",
    payment_status: "Paid",
    shipping_address: "Flat 402, Skyline Towers, Cyber City, Gurugram, Haryana - 122002",
    items: [
      { name: "EVERYDAY REBEL", size: "L", qty: 1, price: 999 },
      { name: "LIMITLESS SPIRIT", size: "XL", qty: 1, price: 1999 },
    ],
  });

  const handleStatusChange = (newStatus) => {
    setOrder({ ...order, status: newStatus });
    toast.success(`Fulfillment status updated to ${newStatus}`);
  };

  return (
    <AdminLayout title={`Order Details (${order.id})`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/orders"
            className="inline-flex items-center space-x-2 text-xs font-mono text-neutral-500 hover:text-black uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders List</span>
          </Link>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono font-bold uppercase text-neutral-500">
              UPDATE STATUS:
            </span>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="py-2 px-3 bg-red-600 text-white rounded-lg text-xs font-mono font-bold uppercase focus:outline-none cursor-pointer shadow-md"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Order Header Summary */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h2 className="text-2xl font-black uppercase text-neutral-900 font-mono">
                {order.id}
              </h2>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase rounded">
                {order.payment_status}
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-500">
              Placed on {order.date} • {order.items.length} items
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono uppercase text-neutral-500">Total Charged:</span>
            <span className="text-2xl font-black font-mono text-black">
              ₹{order.total}
            </span>
          </div>
        </div>

        {/* Layout Grid: Items vs Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left: Purchased Items List */}
          <div className="md:col-span-7 bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
              <Package className="w-4 h-4 text-red-600" />
              <span>Purchased Streetwear Drops</span>
            </h3>

            <div className="divide-y divide-neutral-200">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center font-mono text-xs">
                  <div>
                    <span className="block font-bold text-neutral-900 uppercase">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-neutral-500">
                      FIT/SIZE: {item.size} • QTY: {item.qty}
                    </span>
                  </div>
                  <span className="font-bold text-neutral-900">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-neutral-200 pt-4 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-neutral-600">
                <span>Items Subtotal</span>
                <span>₹{order.total}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Express Shipping</span>
                <span className="text-red-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-neutral-900 font-bold text-sm pt-2 border-t border-neutral-100">
                <span>Total Amount Paid</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>

          {/* Right: Customer & Shipping Details */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-3 font-mono text-xs">
              <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
                <User className="w-4 h-4 text-red-600" />
                <span>Customer Information</span>
              </h3>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase">NAME</span>
                <span className="font-bold text-neutral-900 text-sm">{order.customer_name}</span>
              </div>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase">EMAIL</span>
                <span className="text-neutral-700">{order.customer_email}</span>
              </div>

              <div>
                <span className="block text-neutral-400 text-[10px] uppercase">PHONE</span>
                <span className="text-neutral-700">{order.customer_phone}</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm space-y-3 font-mono text-xs">
              <h3 className="text-sm font-black uppercase text-neutral-900 tracking-tight border-b border-neutral-200 pb-3 flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Shipping Address</span>
              </h3>

              <p className="text-neutral-700 leading-relaxed">
                {order.shipping_address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
