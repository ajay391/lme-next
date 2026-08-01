"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  Bell,
  Search,
} from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const NAVIGATION_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: FolderTree },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  { name: "Store Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children, title = "Admin Portal" }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("admin_access_token");
    Cookies.remove("access_token");
    toast.success("Logged out successfully");
    router.push("/admin/login");
  };

  return (
    <>
      <Head>
        <title>{`${title} | LME Admin Panel`}</title>
      </Head>

      <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col md:flex-row">
        {/* Mobile Header Bar */}
        <div className="md:hidden bg-neutral-900 text-white p-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center space-x-2">
            <span className="bg-red-600 text-white font-mono font-black text-xs uppercase px-2 py-0.5 rounded-sm">
              LME
            </span>
            <span className="font-bold uppercase tracking-wider text-sm">
              Admin Portal
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sidebar Navigation */}
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } md:block w-full md:w-64 bg-neutral-900 text-white flex-shrink-0 flex flex-col justify-between z-40 sticky top-0 h-auto md:h-screen`}
        >
          <div>
            {/* Brand Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="bg-red-600 text-white font-mono font-black text-[10px] uppercase px-2 py-0.5 rounded-sm">
                    // CONTROL PANEL
                  </span>
                </div>
                <h1 className="text-lg font-black uppercase tracking-tight text-white">
                  Last Man On Earth
                </h1>
                <p className="text-[11px] font-mono text-neutral-400">
                  Storefront Management
                </p>
              </div>
            </div>

            {/* Nav Links */}
            <nav className="p-4 space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const isActive =
                  router.pathname === item.href ||
                  (item.href !== "/admin" && router.pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs font-mono font-bold uppercase transition duration-150 ${
                      isActive
                        ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-neutral-800 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg text-xs font-mono transition"
            >
              <span className="flex items-center space-x-2">
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View Storefront</span>
              </span>
              <span className="text-[10px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-400">
                Live
              </span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-2.5 text-neutral-400 hover:text-red-500 hover:bg-neutral-800 rounded-lg text-xs font-mono transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Top Bar */}
          <header className="bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-black uppercase text-neutral-900 tracking-tight">
                {title}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden sm:flex items-center bg-neutral-100 border border-neutral-300 rounded-lg px-3 py-1.5 text-xs">
                <Search className="w-3.5 h-3.5 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search admin..."
                  className="bg-transparent focus:outline-none text-neutral-800 w-36 font-mono text-xs"
                />
              </div>

              {/* Admin Profile Chip */}
              <div className="flex items-center space-x-3 border-l border-neutral-200 pl-4">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-bold border border-neutral-700">
                  AD
                </div>
                <div className="hidden sm:block text-left">
                  <span className="block text-xs font-mono font-bold text-neutral-900 leading-none">
                    Administrator
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    admin@lme.com
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body Container */}
          <main className="p-4 sm:p-8 flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
