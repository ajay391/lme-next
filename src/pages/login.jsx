'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { next } = router.query;
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (typeof next === 'string') {
      setRedirectTo(next);
    }
  }, [next]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true); // 🟢 Start loading
  try {
    const res = await axiosInstance.post('/auth/login/', form);
    const { access, refresh } = res.data.tokens || {};

    if (access && refresh) {
      Cookies.set('access_token', access, { expires: 1 });
      Cookies.set('refresh_token', refresh, { expires: 7 });
      dispatch(login({ access, refresh }));
      toast.success('Login Success');
       router.push(redirectTo);  
    } else {
      toast.error('Tokens not received');
    }
  } catch (err) {
    toast.error(err.response?.data?.error || 'Login failed');
  } finally {
    setLoading(false); // 🔴 Stop loading
  }
};

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!mounted) return null;

  return (
    <div className="py-16 sm:py-20 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Side Visual */}
        <div className="hidden lg:block bg-black relative">
          <img
            src="/images/register.png"
            alt="Login Visual"
            className="w-full h-full max-h-[450px] object-cover"
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-xl font-normal p-6">
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} className="object-contain mb-5" />
            
           <h6 className="uppercase">Limits Don't Exist</h6> 
          </div> */}
        </div>

        {/* Right Side Login Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                {/* Phone Number <span className="text-red-500">*</span> */}
              </label>
              <input
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {/* Password <span className="text-red-500">*</span> */}
              </label>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-500 "
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

           <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-sm transition duration-200 ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-black'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
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
                    Si
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-red-500 hover:underline text-base font-normal">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
