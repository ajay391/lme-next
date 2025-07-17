'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { next } = router.query;
  const [redirectTo, setRedirectTo] = useState('/');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof next === 'string') {
      setRedirectTo(next);
    }
  }, [next]);

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
        .required('Phone number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post('/auth/login/', values);
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
        setLoading(false);
      }
    },
  });

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
        </div>

        {/* Right Side Login Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600 mt-2 text-sm">Sign in to your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <input
                name="phone"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.phone}</div>
              )}
            </div>

            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[55%] -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.password}</div>
              )}
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
