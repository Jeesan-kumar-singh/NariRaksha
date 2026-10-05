import React from 'react';
import { PhoneCall, Shield, AlertTriangle, Share2, Volume2, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { useSOS } from '../contexts/SOSContext';
import { useLocation } from '../contexts/LocationContext';
import { useContacts } from '../contexts/ContactsContext';

export const EmergencyPage = () => {
  const { startSOSCountdown, isSOSActive } = useSOS();
  const { location } = useLocation();
  const { primaryContact, contacts } = useContacts();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-red-600/50 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4 animate-bounce" />
          <span>Emergency Assistance System</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          NariRaksha SOS Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          Activating Emergency Mode turns on full high-visibility mode, prepares your live GPS position, enables loud audio sirens, and provides instant tap-to-call links for 112 and 181.
        </p>

        <div className="pt-2">
          <button
            onClick={startSOSCountdown}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base tracking-wider uppercase shadow-xl shadow-red-600/40 border border-red-400 transition-all transform active:scale-95 flex items-center justify-center gap-3 animate-sos-pulse"
          >
            <PhoneCall className="w-6 h-6 animate-pulse" />
            <span>ACTIVATE EMERGENCY SOS NOW</span>
          </button>
        </div>
      </div>

      {/* Helplines Direct Dial Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-red-600" />
          <span>Direct Emergency Helplines (Tap to Call)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* 112 */}
          <a
            href="tel:112"
            className="bg-white rounded-2xl p-5 border-2 border-red-500/30 shadow-md hover:border-red-500 transition-colors space-y-2 block"
          >
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
              National Emergency
            </span>
            <h3 className="text-2xl font-black text-slate-900">112</h3>
            <p className="text-xs text-slate-500">Police, Fire & Medical Emergency Response</p>
          </a>

          {/* 181 */}
          <a
            href="tel:181"
            className="bg-white rounded-2xl p-5 border-2 border-amber-500/30 shadow-md hover:border-amber-500 transition-colors space-y-2 block"
          >
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
              Women Helpline
            </span>
            <h3 className="text-2xl font-black text-slate-900">181</h3>
            <p className="text-xs text-slate-500">24/7 National Women Helpline & Rescue</p>
          </a>

          {/* 1091 */}
          <a
            href="tel:1091"
            className="bg-white rounded-2xl p-5 border-2 border-blue-500/30 shadow-md hover:border-blue-500 transition-colors space-y-2 block"
          >
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Women In Distress
            </span>
            <h3 className="text-2xl font-black text-slate-900">1091</h3>
            <p className="text-xs text-slate-500">State Women Protection & Police Cell</p>
          </a>

          {/* 1098 */}
          <a
            href="tel:1098"
            className="bg-white rounded-2xl p-5 border-2 border-emerald-500/30 shadow-md hover:border-emerald-500 transition-colors space-y-2 block"
          >
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Child Protection
            </span>
            <h3 className="text-2xl font-black text-slate-900">1098</h3>
            <p className="text-xs text-slate-500">National Child & Youth Helpline</p>
          </a>

        </div>
      </div>

      {/* Primary Trusted Contacts Summary */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <span>Configured Trusted Contacts</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${contact.isPrimary ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-700'}`}>
                  {contact.priority} ({contact.relationship})
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">{contact.name}</h4>
                <p className="text-xs text-slate-500">{contact.phone}</p>
              </div>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Web Transparency Notice */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Browser Emergency Limitation Notice</span>
        </h4>
        <p className="leading-relaxed">
          NariRaksha operates purely within modern web standards. Web browsers require user interaction to make telephone calls. The SOS button prepares share links and launches phone dialers (`tel:` links) transparently.
        </p>
      </div>

    </div>
  );
};
