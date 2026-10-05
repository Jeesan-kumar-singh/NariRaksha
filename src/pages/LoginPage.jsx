import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, Mail, UserCheck, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFillDemoUser = () => {
    setEmail('priya@example.com');
    setPassword('Password123!');
    setRole('user');
    setError('');
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@nariraksha.gov.in');
    setPassword('AdminSecure99!');
    setRole('admin');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password, role);
      setLoading(false);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30">
            <Shield className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back to NariRaksha
          </h2>
          <p className="text-xs text-slate-500">
            Log in to manage trusted contacts, view location logs & evidence vault.
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === 'user'
                ? 'bg-white text-blue-600 shadow-sm font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            User Account
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-white text-indigo-600 shadow-sm font-extrabold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Admin Dashboard Demo
          </button>
        </div>

        {/* Quick Demo Pre-fill Shortcuts */}
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 text-xs space-y-2">
          <p className="font-bold text-blue-900 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <span>Quick Demo Autofill:</span>
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleFillDemoUser}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold text-[11px] hover:bg-blue-700 transition-colors shadow-sm"
            >
              Fill Demo User
            </button>
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-[11px] hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Fill Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <span>Logging in...</span>
            ) : (
              <>
                <span>Sign In to Platform</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-blue-600 font-bold hover:underline">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};
