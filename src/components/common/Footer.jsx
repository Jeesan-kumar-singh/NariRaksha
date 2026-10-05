import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, ExternalLink, Heart, AlertCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-24 lg:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">NariRaksha</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Your safety. Your control. Help when you need it."
            </p>
            <p className="text-xs text-slate-500">
              An AI-assisted women's safety & emergency support web platform built for high accessibility.
            </p>
          </div>

          {/* Col 2: Emergency Helplines */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-red-400" />
              <span>National Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="tel:112" className="flex items-center justify-between text-slate-300 hover:text-red-400 transition-colors py-1 border-b border-slate-900">
                  <span>Emergency Services (Police/Medical)</span>
                  <strong className="text-red-400 font-bold">112</strong>
                </a>
              </li>
              <li>
                <a href="tel:181" className="flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors py-1 border-b border-slate-900">
                  <span>Women Helpline (National)</span>
                  <strong className="text-amber-400 font-bold">181</strong>
                </a>
              </li>
              <li>
                <a href="tel:1091" className="flex items-center justify-between text-slate-300 hover:text-blue-400 transition-colors py-1 border-b border-slate-900">
                  <span>Women In Distress Helpline</span>
                  <strong className="text-blue-400 font-bold">1091</strong>
                </a>
              </li>
              <li>
                <a href="tel:1098" className="flex items-center justify-between text-slate-300 hover:text-emerald-400 transition-colors py-1">
                  <span>Childline Support</span>
                  <strong className="text-emerald-400 font-bold">1098</strong>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3">
              Platform Features
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/emergency" className="hover:text-white transition-colors">Emergency SOS Dashboard</Link>
              </li>
              <li>
                <Link to="/nearby" className="hover:text-white transition-colors">Find Nearby Police & Hospitals</Link>
              </li>
              <li>
                <Link to="/safety-map" className="hover:text-white transition-colors">Interactive Safety Map</Link>
              </li>
              <li>
                <Link to="/ai-assistant" className="hover:text-white transition-colors">AI Safety Guidance & Classifier</Link>
              </li>
              <li>
                <Link to="/vault" className="hover:text-white transition-colors">Encrypted Evidence Vault</Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-white transition-colors">Structured Incident Reporting</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Transparency */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <span>Transparency & Privacy</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              NariRaksha is transparent. Browsers cannot automatically contact law enforcement without user interaction.
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy" className="text-blue-400 hover:underline">Privacy Policy & Permissions</Link>
              </li>
              <li>
                <Link to="/help" className="text-blue-400 hover:underline">Legal Rights & FAQs</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NariRaksha Platform. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with care for public safety</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>

      </div>
    </footer>
  );
};
