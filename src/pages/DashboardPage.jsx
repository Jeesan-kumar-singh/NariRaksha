import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PhoneCall,
  MapPin,
  Users,
  Shield,
  Bot,
  AlertTriangle,
  Lock,
  ArrowRight,
  Clock,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';
import { useContacts } from '../contexts/ContactsContext';
import { useSOS } from '../contexts/SOSContext';
import { useIncidents } from '../contexts/IncidentsContext';
import { LeafletMap } from '../components/map/LeafletMap';

export const DashboardPage = () => {
  const { user } = useAuth();
  const { location, isLocating, refreshLocation } = useLocation();
  const { contacts, primaryContact } = useContacts();
  const { startSOSCountdown, sosHistory } = useSOS();
  const { incidents } = useIncidents();

  const [aiInput, setAiInput] = useState('');
  const navigate = useNavigate();

  const handleAskAI = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    navigate('/ai-assistant', { state: { initialPrompt: aiInput } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* Greeting & Header Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            NariRaksha Safety Command
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good evening, {user?.name || 'Priya'}
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            "You're in control. Help is always accessible."
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold animate-safe-pulse">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>SAFE STATUS ACTIVE</span>
          </div>
        </div>
      </div>

      {/* MAIN EMERGENCY SOS CARD */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 border-2 border-red-600/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Ambient Red Glow */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 max-w-xl text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-extrabold">
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>IMMEDIATE EMERGENCY SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            🔴 Emergency SOS
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Need immediate help? Triggering SOS prepares live GPS coordinates, dials national helplines (112, 181), and sounds warning audio siren.
          </p>
        </div>

        <div className="z-10 shrink-0">
          <button
            onClick={startSOSCountdown}
            className="px-8 py-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg tracking-wider uppercase shadow-2xl shadow-red-600/40 border-2 border-red-400 transition-all transform hover:scale-105 active:scale-95 animate-sos-pulse flex items-center gap-3"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>[ ACTIVATE SOS ]</span>
          </button>
        </div>

      </div>

      {/* Grid of Key Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Card 1: Location Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Current GPS Location</span>
            </div>
            <button
              onClick={refreshLocation}
              disabled={isLocating}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs transition-colors"
              title="Refresh GPS position"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-emerald-700">Location Available</span>
            </div>
            <p className="text-sm font-bold text-slate-900 line-clamp-2">
              {location.address}
            </p>
            <p className="text-[11px] text-slate-500">
              Accuracy: ±{location.accuracy} meters • Refreshed {location.timestamp || 'Just now'}
            </p>
          </div>

          <Link
            to="/location"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline pt-2"
          >
            <span>View Full Location Card</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 2: Trusted Contacts */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Trusted Contacts</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
              {contacts.length} Contacts
            </span>
          </div>

          <div className="space-y-2">
            {primaryContact ? (
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">Primary Contact</span>
                  <p className="text-xs font-bold text-slate-900">{primaryContact.name}</p>
                  <p className="text-[11px] text-slate-500">{primaryContact.phone}</p>
                </div>
                <a
                  href={`tel:${primaryContact.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
                >
                  Call
                </a>
              </div>
            ) : (
              <p className="text-xs text-slate-500">No primary contact selected.</p>
            )}
          </div>

          <Link
            to="/contacts"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline pt-1"
          >
            <span>Manage Contacts List</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card 3: Nearby Facilities */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Nearby Emergency Help</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <Link to="/nearby" className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 space-y-1 transition-colors">
              <span className="text-lg block">👮</span>
              <span className="font-bold text-[11px]">Police</span>
            </Link>
            <Link to="/nearby" className="p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-900 space-y-1 transition-colors">
              <span className="text-lg block">🏥</span>
              <span className="font-bold text-[11px]">Hospitals</span>
            </Link>
            <Link to="/nearby" className="p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 space-y-1 transition-colors">
              <span className="text-lg block">🛡️</span>
              <span className="font-bold text-[11px]">Safe Places</span>
            </Link>
          </div>

          <Link
            to="/nearby"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
          >
            <span>Open Facilities Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* AI Safety Assistant Quick Question Widget */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold">AI Safety Assistant</h3>
            <p className="text-xs text-slate-400">Ask safety questions, de-escalation tips, or analyze your situation risk level.</p>
          </div>
        </div>

        <form onSubmit={handleAskAI} className="relative">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder='e.g. "I think someone is following me. What should I do?"'
            className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-3.5 pl-4 pr-28 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
          <span className="font-semibold text-slate-400">Suggested:</span>
          <button
            onClick={() => navigate('/ai-assistant', { state: { initialPrompt: 'I feel unsafe walking home late.' } })}
            className="hover:underline text-indigo-300"
          >
            "Unsafe walking home"
          </button>
          <span>•</span>
          <button
            onClick={() => navigate('/ai-assistant', { state: { initialPrompt: 'How to handle harassment in public transport?' } })}
            className="hover:underline text-indigo-300"
          >
            "Public transport safety"
          </button>
        </div>
      </div>

      {/* Mini Interactive Map Overview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Live Safety Map</h3>
            <p className="text-xs text-slate-500">Overview of nearby police stations and community incident markers.</p>
          </div>
          <Link to="/safety-map" className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800">
            Full Screen Map
          </Link>
        </div>

        <LeafletMap center={[location.lat, location.lng]} userLocation={location} height="300px" />
      </div>

      {/* Recent Safety Activity Log */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-500" />
          <span>Recent Safety Activity Log</span>
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {sosHistory.slice(0, 3).map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">{item.id}</span>
                <p className="text-slate-500 text-[11px]">{item.location}</p>
                <span className="text-[10px] text-slate-400">{item.date} • {item.time}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
