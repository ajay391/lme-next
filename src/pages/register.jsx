'use client';

import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [message, setMessage] = useState('');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post('/auth/register/', form);
      toast.success('Registration successful!');
      router.push('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

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
          {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-3xl font-bold p-6">
            Join the Movement
          </div> */}
        </div>

        {/* Right Side Form */}
        <div className="p-8 sm:p-10">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600 mt-2 text-sm">Sign up to get started with exclusive streetwear drops</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              required
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              required
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-red-500 focus:outline-none text-gray-800"
            />

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

            {message && <div className="text-sm text-center text-red-500">{message}</div>}
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
