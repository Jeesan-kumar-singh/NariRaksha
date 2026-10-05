import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Home, PhoneCall } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center space-y-6">

        <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto font-black text-2xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-slate-500">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to="/dashboard"
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
          <Link
            to="/emergency"
            className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency SOS Mode</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
