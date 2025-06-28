import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import axiosInstance from '../utils/axiosInstance';
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/login/', form);
      const { access, refresh } = res.data.tokens || {};

      if (access && refresh) {
        dispatch(login({ access, refresh }));
        toast.success("Login Success");
        router.push('/');
      } else {
        toast.error("Tokens not received");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <div className="text-start mb-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Welcome Back!</h2>
          <p className="text-gray-500 text-base">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label htmlFor="phone" className="block text-lg font-semibold text-gray-700 mt-10">
              Phone <span className='text-red-500 '>*</span>
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter Phone number"
              className="w-full px-4 py-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="relative w-full">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-700 mt-5">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 mt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-[3.5rem] text-gray-500 focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-base text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:text-indigo-500">Register here</Link>
        </p>
      </div>
    </div>
  );
}
