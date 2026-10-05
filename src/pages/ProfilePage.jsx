import React, { useState } from 'react';
import { User, Shield, Lock, Bell, CheckCircle2, AlertTriangle, Trash2, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from '../contexts/LocationContext';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const { permissionState } = useLocation();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [emergencyPin, setEmergencyPin] = useState(user?.emergencyPin || '1234');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, phone, emergencyPin });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeleteData = () => {
    if (confirm('WARNING: This will clear all local storage, trusted contacts, vault references, and profile settings. Proceed?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Account Settings
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Profile & Safety Preferences
        </h1>
        <p className="text-xs text-slate-500">
          Manage your personal details, emergency PIN, and browser permissions.
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <span className="inline-block mt-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              {user?.role === 'admin' ? 'Administrator' : 'Verified User'}
            </span>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile settings updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Mobile Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Emergency Security PIN</label>
              <input
                type="password"
                value={emergencyPin}
                onChange={(e) => setEmergencyPin(e.target.value)}
                placeholder="4-digit PIN"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </form>
      </div>

      {/* Browser Permissions Status Checklist */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          <span>Browser Permissions Status</span>
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-900">Geolocation API Permission</span>
              <p className="text-slate-500 text-[11px]">Required for real-time map centering & emergency location share.</p>
            </div>
            <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
              permissionState === 'granted' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {permissionState === 'granted' ? 'Granted' : 'Prompt / Required'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span className="font-bold text-slate-900">Microphone MediaRecorder API</span>
              <p className="text-slate-500 text-[11px]">Required for recording ambient audio in the Evidence Vault.</p>
            </div>
            <span className="px-2.5 py-1 rounded-full font-bold text-[10px] bg-blue-100 text-blue-800">
              Web Audio Active
            </span>
          </div>
        </div>
      </div>

      {/* Delete Data Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-3xl p-6 text-red-950 space-y-3">
        <h3 className="font-bold text-base flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-600" />
          <span>Data Storage & Account Deletion</span>
        </h3>
        <p className="text-xs text-red-800 leading-relaxed">
          NariRaksha respects your privacy rights. Clicking below completely purges all local data, trusted contacts, vault index records, and user session storage from your browser.
        </p>

        <button
          onClick={handleDeleteData}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors"
        >
          Delete All My Data Now
        </button>
      </div>

    </div>
  );
};
