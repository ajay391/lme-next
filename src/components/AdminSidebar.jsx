'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Package, ShoppingBag } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { label: 'Products', href: '/admin/products', icon: <Package className="w-5 h-5" /> },
    { label: 'Orders', href: '/admin/orders', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm p-4 sticky top-0">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon }) => (
          <Link
            key={label}
            href={href}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
              pathname === href
                ? 'bg-red-100 text-red-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
