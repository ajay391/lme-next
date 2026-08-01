"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import axiosInstance from "../utils/axiosInstance";
import Link from "next/link";
import { Eye, EyeOff, Lock, Phone, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useFormik } from "formik";
import * as Yup from "yup";
import Head from "next/head";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { next } = router.query;
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof next === "string") {
      setRedirectTo(next);
    }
  }, [next]);

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .required("Phone number is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth/login/", values);
        const { access, refresh } = res.data.tokens || {};

        if (access && refresh) {
          Cookies.set("access_token", access, { expires: 1 });
          Cookies.set("refresh_token", refresh, { expires: 7 });
          dispatch(login({ access, refresh }));
          toast.success("Login Success");
          router.push(redirectTo);
        } else {
          toast.error("Tokens not received");
        }
      } catch (err) {
        toast.error(err.response?.data?.error || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!mounted) return null;

  return (
    <>
      <Head>
        <title>Account Sign In | Last Man On Earth</title>
        <meta
          name="description"
          content="Sign in to your Last Man On Earth account to access drop archives, track orders, and unlock exclusive rewards."
        />
      </Head>
      <main className="py-12 sm:py-20 flex items-center justify-center bg-neutral-50 px-4 sm:px-6 min-h-[85vh] selection:bg-red-600 selection:text-white">
        <div className="max-w-md md:max-w-4xl w-full bg-white shadow-2xl rounded-2xl border border-neutral-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Side Visual Banner */}
          <div className="hidden md:block md:col-span-5 bg-black relative min-h-[500px]">
            <img
              src="/images/register.png"
              alt="Streetwear Login Visual"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block mb-1">
                // ARCHIVE ACCESS
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-2">
                Last Man On Earth
              </h3>
              <p className="text-neutral-400 text-xs font-mono leading-relaxed">
                450GSM heavyweight cotton & motorsport livery built for the storm.
              </p>
            </div>
          </div>

          {/* Right Side Login Form */}
          <div className="md:col-span-7 p-6 sm:p-12 flex flex-col justify-center bg-white">
            <div className="mb-8">
              <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest block mb-2">
                // ACCOUNT ACCESS
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-black leading-none mb-2">
                Welcome Back
              </h2>
              <p className="text-neutral-500 font-mono text-xs">
                Sign in to manage orders, wishlist drops, and account settings.
              </p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2 tracking-wider">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="phone"
                    type="text"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter 10-digit phone number"
                    className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
                  />
                </div>
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-xs font-mono text-red-600 mt-1.5 font-bold">
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-700 mb-2 tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3.5 bg-neutral-50 border border-neutral-300 rounded-sm text-sm font-mono text-black placeholder-neutral-400 focus:bg-white focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition duration-200"
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
                  <div className="text-xs font-mono text-red-600 mt-1.5 font-bold">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 text-white font-mono font-black text-xs uppercase tracking-widest rounded-sm transition-all duration-300 shadow-lg ${
                  loading
                    ? "bg-neutral-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-black shadow-red-600/20"
                } flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    SIGNING IN...
                  </span>
                ) : (
                  <>
                    <span>SIGN IN TO ACCOUNT</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
              <p className="text-xs font-mono text-neutral-500">
                Don't have an account yet?{" "}
                <Link
                  href="/register"
                  className="text-red-600 font-extrabold uppercase hover:underline ml-1"
                >
                  Create Account &rarr;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
