import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { useDemo } from '../../contexts/DemoContext';

export const DisclaimerBanner = () => {
  const { isDemoMode, toggleDemoMode } = useDemo();

  return (
    <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-300">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Disclaimer:</strong> NariRaksha is a web-based safety platform. It does not replace 112 emergency service dispatchers.
          </span>
        </div>

        {isDemoMode && (
          <div className="flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DEMO MODE — Sample Data</span>
            <button
              onClick={toggleDemoMode}
              className="ml-1 underline hover:text-white transition-colors"
            >
              Toggle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
