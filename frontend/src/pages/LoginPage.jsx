import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosConfig';
import toast from 'react-hot-toast';
import { LogIn, CheckSquare } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/auth/login', formData);
      login(data);
      toast.success(`Welcome back, ${data.username}!`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / title */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-lg shadow-violet-500/30">
            <CheckSquare className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="mt-1 text-slate-400">Sign in to your TaskFlow account</p>
        </div>

        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/70 p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full rounded-xl border border-slate-600 bg-slate-700/60 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-slate-600 bg-slate-700/60 px-4 py-3 text-slate-100 placeholder-slate-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-500/30 transition hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-500/50 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <><LogIn className="h-5 w-5" /> Sign In</>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-medium text-violet-400 transition hover:text-violet-300">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
