import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('wedha@mulaiparri.com');
    setPassword('Password123!');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-emerald-900 text-lime-400 flex items-center justify-center mx-auto shadow-lg">
          <Leaf className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-emerald-950 font-heading">Welcome Back</h1>
        <p className="text-xs text-stone-500">Sign in to track live harvest status & order history</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xl space-y-6">
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
          <div>
            <label className="block text-stone-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-700 outline-none font-normal"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-mulaiparri py-3.5 text-xs font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-stone-100 text-center space-y-3">
          <button
            onClick={handleFillDemoAdmin}
            className="w-full py-2 px-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-900/10 flex items-center justify-center gap-1.5 hover:bg-emerald-100/70"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime-600" /> Auto-Fill Demo Account (Wedha Prabha)
          </button>

          <p className="text-xs text-stone-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-800 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}
