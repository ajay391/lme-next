'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
       phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axiosInstance.post('/auth/register/', values);
        toast.success('Registration successful!');
        router.push('/login');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
  });

  if (!mounted) return null;

  return (
    <div className="py-16 sm:py-20 flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side Image */}
        <div className="hidden lg:block bg-black relative">
          <img
            src="/images/register.png"
            alt="Register Visual"
            className="w-full h-full max-h-[512px] object-cover"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2 text-sm">Sign up to get started with exclusive streetwear drops</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                name="name"
                placeholder="Full Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.name}</div>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.email}</div>
              )}
            </div>

            <div>
              <input
                name="phone"
                placeholder="Phone Number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-sm text-red-500 mt-1">{formik.errors.phone}</div>
              )}
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
              />
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
                  Creating Account...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-red-500 hover:underline text-base font-normal">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
