"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Phone, User, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axiosInstance.post("/auth/register/", values);
        toast.success("Registration successful!");
        router.push("/login");
      } catch (err) {
        toast.error(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Create Account | Last Man On Earth</title>
        <meta name="description" content="Register an account for exclusive drop access." />
      </Head>
      <main className="py-12 sm:py-20 flex items-center justify-center bg-neutral-50 px-4 sm:px-6 min-h-[85vh] selection:bg-red-600 selection:text-white">
        <div className="max-w-md md:max-w-4xl w-full bg-white shadow-2xl rounded-2xl border border-neutral-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Side Visual Banner */}
          <div className="hidden md:block md:col-span-5 bg-black relative min-h-[500px]">
            <img
              src="/images/register.png"
              alt="Streetwear Register Visual"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-1">
                // JOIN THE ARCHIVE
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-2">
                Last Man On Earth
              </h3>
              <p className="text-neutral-400 text-xs font-mono leading-relaxed">
                Get early drop access, order tracking, and exclusive member perks.
              </p>
            </div>
          </div>

          {/* Right Side Register Form */}
          <div className="md:col-span-7 p-6 sm:p-12 flex flex-col justify-center bg-white">
            <div className="mb-6">
              <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
                // CREATE ACCOUNT
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black leading-none mb-2">
                Join LME
              </h2>
              <p className="text-neutral-500 font-mono text-xs">
                Sign up to unlock drop notifications and member checkout.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-1.5 tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="name"
                    placeholder="Enter full name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="text-xs font-mono text-red-600 mt-1 font-bold">{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-1.5 tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <div className="text-xs font-mono text-red-600 mt-1 font-bold">{formik.errors.email}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-1.5 tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="phone"
                    placeholder="10-digit phone number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-xs font-mono text-red-600 mt-1 font-bold">{formik.errors.phone}</div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-1.5 tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full pl-11 pr-11 py-3 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <div className="text-xs font-mono text-red-600 mt-1 font-bold">{formik.errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-white font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-neutral-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-black shadow-red-600/20"
                } flex items-center justify-center space-x-2 mt-2`}
              >
                {loading ? (
                  <span>CREATING ACCOUNT...</span>
                ) : (
                  <>
                    <span>REGISTER ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-200 text-center">
              <p className="text-xs font-mono text-neutral-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-red-600 font-extrabold uppercase hover:underline ml-1"
                >
                  Sign In &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
