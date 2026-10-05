import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  PhoneCall,
  MapPin,
  Users,
  AlertTriangle,
  Lock,
  Bot,
  Map as MapIcon,
  User,
  LogOut,
  Menu,
  X,
  FileText,
  Activity,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSOS } from '../../contexts/SOSContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { startSOSCountdown, isSOSActive } = useSOS();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'SOS Mode', path: '/emergency', icon: PhoneCall, highlight: true },
    { name: 'Location', path: '/location', icon: MapPin },
    { name: 'Nearby Help', path: '/nearby', icon: Shield },
    { name: 'Contacts', path: '/contacts', icon: Users },
    { name: 'Report Incident', path: '/report', icon: AlertTriangle },
    { name: 'Vault', path: '/vault', icon: Lock },
    { name: 'AI Safety', path: '/ai-assistant', icon: Bot },
    { name: 'Safety Map', path: '/safety-map', icon: MapIcon },
    { name: 'Helplines', path: '/help', icon: FileText }
  ];

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  NariRaksha
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Web PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Your safety. Your control.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.slice(0, 7).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : item.highlight
                      ? 'text-red-400 hover:bg-red-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${item.highlight ? 'text-red-400' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Quick SOS Button & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick SOS Trigger Button */}
            <button
              onClick={startSOSCountdown}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs shadow-lg transition-all transform active:scale-95 ${
                isSOSActive
                  ? 'bg-red-600 text-white animate-sos-pulse ring-2 ring-red-400'
                  : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-red-600/30'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              <span>SOS</span>
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-800 transition-colors border border-slate-700"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-blue-500"
                  />
                  <span className="text-xs font-semibold text-slate-200 hidden md:block max-w-[90px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white">{user?.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                        {user?.role === 'admin' ? 'Administrator' : 'Verified User'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>Profile & Settings</span>
                    </Link>

                    <Link
                      to="/vault"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Lock className="w-4 h-4 text-slate-400" />
                      <span>Evidence Vault</span>
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-indigo-400 hover:bg-slate-800 transition-colors"
                      >
                        <Activity className="w-4 h-4 text-indigo-400" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <div className="border-t border-slate-800 my-1" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold'
                    : item.highlight
                    ? 'text-red-400 hover:bg-red-500/10'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.highlight ? 'text-red-400' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
