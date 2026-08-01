import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import { Users, Search, ShoppingBag, Mail, Phone } from "lucide-react";

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const customers = [
    {
      id: "CUST-101",
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "9876543210",
      orders_count: 5,
      total_spent: 8995,
      joined: "2026-05-12",
    },
    {
      id: "CUST-102",
      name: "Rohan Verma",
      email: "rohan@gmail.com",
      phone: "9123456789",
      orders_count: 3,
      total_spent: 4597,
      joined: "2026-06-01",
    },
    {
      id: "CUST-103",
      name: "Priya Patel",
      email: "priya@gmail.com",
      phone: "9988776655",
      orders_count: 7,
      total_spent: 12493,
      joined: "2026-04-18",
    },
    {
      id: "CUST-104",
      name: "Vikram Singh",
      email: "vikram@gmail.com",
      phone: "9811223344",
      orders_count: 2,
      total_spent: 2398,
      joined: "2026-07-04",
    },
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <AdminLayout title="Registered Customers">
      {/* Search Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or phone..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-300 rounded-lg text-xs font-mono text-black focus:outline-none focus:border-red-600"
          />
        </div>

        <div className="text-xs font-mono text-neutral-500">
          Total Customers: <strong className="text-black font-bold">{customers.length}</strong>
        </div>
      </div>

      {/* Customers Directory Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-mono font-bold uppercase text-neutral-500 tracking-wider">
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Contact Info</th>
                <th className="py-3 px-6">Total Orders</th>
                <th className="py-3 px-6">Total Spent</th>
                <th className="py-3 px-6">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-xs font-mono">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="block font-bold text-neutral-900">{c.name}</span>
                        <span className="text-[10px] text-neutral-400">{c.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="block text-neutral-800">{c.email}</span>
                    <span className="text-[10px] text-neutral-500">{c.phone}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-neutral-900">
                    {c.orders_count} orders
                  </td>
                  <td className="py-4 px-6 font-bold text-red-600">
                    ₹{c.total_spent.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-neutral-500">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
