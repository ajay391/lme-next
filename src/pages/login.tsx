import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice'; // Import the login action from the authSlice

export default function LoginPage() {
  const [form, setForm] = useState({ phone: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post('/api/auth/login', form);
  //     const token = res.data.token;

  //     // Save the token in localStorage
  //     localStorage.setItem('token', token);

  //     // Dispatch the login action to update Redux state
  //     dispatch(login());

  //     // Redirect after login
  //     router.push('/'); // Adjust to wherever you want to redirect after successful login
  //   } catch (err: any) {
  //     setMessage(err.response?.data?.error || 'Login failed');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      const token = res.data.token;
  
      // Save the token in localStorage
      localStorage.setItem('token', token);
  
      // Dispatch the login action to update Redux state
      dispatch(login(token));
  
      // Fetch user info after login
      const userRes = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const user = userRes.data.user;
  
      // Redirect based on role
      if (user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };
  

  if (!mounted) return null; // Ensure that this component doesn't try to render on the server-side during SSR

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-lg">
      {/* Welcome Heading */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900">Welcome</h2>
        <p className="text-lg text-gray-500 mt-2">Please sign in to continue</p>
      </div>
  
      {/* Sign In Text */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-semibold text-gray-900">Sign In</h3>
      </div>
  
      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="rounded-md shadow-sm space-y-4">
          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="sr-only">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              value={form.phone}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
              placeholder="Phone"
            />
          </div>
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-lg"
              placeholder="Password"
            />
          </div>
        </div>
  
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
  
        {/* Register Link */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
              Register here
            </a>
          </p>
        </div>
  
        {/* Error Message */}
        {message && (
          <div className="text-sm text-red-500 mt-2 text-center">{message}</div>
        )}
      </form>
    </div>
  </div>
  

  );
}
