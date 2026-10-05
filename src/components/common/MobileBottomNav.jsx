import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, MapPin, PhoneCall, Users, Bot } from 'lucide-react';
import { useSOS } from '../../contexts/SOSContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { startSOSCountdown, isSOSActive } = useSOS();

  const navItems = [
    { label: 'Home', path: '/dashboard', icon: Activity },
    { label: 'Location', path: '/location', icon: MapPin },
    // Center element will be SOS
    { label: 'Contacts', path: '/contacts', icon: Users },
    { label: 'AI Help', path: '/ai-assistant', icon: Bot }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl px-2 py-1.5">
      <div className="flex items-center justify-around max-w-md mx-auto relative">

        {/* Left Item 1: Home */}
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            location.pathname === '/dashboard' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Home</span>
        </Link>

        {/* Left Item 2: Location */}
        <Link
          to="/location"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            location.pathname === '/location' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Location</span>
        </Link>

        {/* Center Prominent SOS Button */}
        <div className="relative -top-5">
          <button
            onClick={startSOSCountdown}
            className={`w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-xl font-black text-white transform active:scale-95 transition-all ${
              isSOSActive
                ? 'bg-red-600 animate-sos-pulse ring-4 ring-red-400'
                : 'bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-red-600/40 ring-4 ring-slate-900'
            }`}
            aria-label="Activate Emergency SOS"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-wider">SOS</span>
          </button>
        </div>

        {/* Right Item 1: Contacts */}
        <Link
          to="/contacts"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            location.pathname === '/contacts' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Contacts</span>
        </Link>

        {/* Right Item 2: AI Safety */}
        <Link
          to="/ai-assistant"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-colors ${
            location.pathname === '/ai-assistant' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bot className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">AI Safety</span>
        </Link>

      </div>
    </div>
  );
};
