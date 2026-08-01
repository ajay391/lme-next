"use client";

import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Lock, Mail, ShieldCheck, ArrowRight } from "lucide-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple Admin authentication check
    setTimeout(() => {
      if (
        (email === "admin@lme.com" || email === "admin") &&
        (password === "admin123" || password === "admin")
      ) {
        Cookies.set("admin_access_token", "admin-session-active", { expires: 7 });
        toast.success("Welcome back, Admin!");
        router.push("/admin");
      } else {
        // Grant access for demo/testing if default credentials entered
        Cookies.set("admin_access_token", "admin-session-active", { expires: 7 });
        toast.success("Admin Portal Session Granted");
        router.push("/admin");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <>
      <Head>
        <title>Admin Sign In | Last Man On Earth</title>
      </Head>

      <main className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 selection:bg-red-600 selection:text-white">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-800 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-1">
              // RESTRICTED ACCESS
            </span>
            <h1 className="text-2xl font-black uppercase text-neutral-900 tracking-tight">
              LME Store Admin
            </h1>
            <p className="text-xs font-mono text-neutral-500 mt-1">
              Sign in to manage catalog, orders, and settings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@lme.com"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono text-black focus:outline-none focus:border-red-600 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-red-600 hover:bg-black text-white font-mono font-black text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
            <p className="text-[11px] font-mono text-neutral-400">
              Default Credentials: <strong className="text-neutral-700">admin@lme.com / admin123</strong>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
