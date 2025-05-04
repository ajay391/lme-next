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
          Authorization: `Bearer ${token}`, // Add the token here
        },
      });
  
      // Use the user data (userRes.data.user) as needed
      console.log(userRes.data.user);
  
      // Redirect after login
      router.push('/'); // Adjust to wherever you want to redirect after successful login
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };
  

  if (!mounted) return null; // Ensure that this component doesn't try to render on the server-side during SSR

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded mt-4"
        >
          Login
        </button>
        <p className="text-sm text-red-500 mt-2">{message}</p>
      </form>
    </div>
  );
}
