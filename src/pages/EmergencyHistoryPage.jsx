import React from 'react';
import { Clock, ShieldCheck, Trash2, AlertCircle, Calendar } from 'lucide-react';
import { useSOS } from '../contexts/SOSContext';

export const EmergencyHistoryPage = () => {
  const { sosHistory, deleteHistoryItem, clearAllHistory } = useSOS();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Session History
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Emergency SOS History
          </h1>
          <p className="text-xs text-slate-500">
            Audit log of past emergency sessions and resolution statuses.
          </p>
        </div>

        {sosHistory.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all emergency history logs?')) clearAllHistory();
            }}
            className="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History Log</span>
          </button>
        )}
      </div>

      {/* History List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        {sosHistory.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No previous emergency sessions recorded.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sosHistory.map((item) => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 p-3 rounded-2xl transition-colors">

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900">{item.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{item.location}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date} at {item.time}</span>
                    </span>
                    <span>•</span>
                    <span>Duration: {item.duration}</span>
                  </div>
                  {item.notes && (
                    <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-xl border border-slate-100 mt-1">
                      "{item.notes}"
                    </p>
                  )}
                </div>

                <button
                  onClick={() => deleteHistoryItem(item.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 self-end sm:self-center transition-colors"
                  title="Delete Session Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
