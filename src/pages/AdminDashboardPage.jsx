import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Activity, Users, PhoneCall, AlertTriangle, Lock, ShieldCheck, CheckCircle2, XCircle, Search, Filter } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useIncidents } from '../contexts/IncidentsContext';
import { useSOS } from '../contexts/SOSContext';

export const AdminDashboardPage = () => {
  const { user } = useAuth();
  const { incidents, updateIncidentStatus, deleteIncident } = useIncidents();
  const { sosHistory } = useSOS();

  const [statusFilter, setStatusFilter] = useState('All');

  if (user?.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Admin Authorization Required</h2>
        <p className="text-xs text-slate-500">
          This dashboard is restricted to authorized platform administrators. Please log in with admin credentials.
        </p>
      </div>
    );
  }

  const filteredIncidents = statusFilter === 'All'
    ? incidents
    : incidents.filter(i => i.status === statusFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Platform Operations & Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            NariRaksha Admin Control Center
          </h1>
          <p className="text-xs text-slate-400">
            Real-time analytics, report moderation, and emergency metric monitoring.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-extrabold">
          Admin Session Active
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Users</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">1,482</h3>
          <span className="text-[11px] text-emerald-600 font-bold">+12% this week</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">SOS Alerts Triggered</span>
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <PhoneCall className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{sosHistory.length + 14}</h3>
          <span className="text-[11px] text-slate-400">All sessions resolved safe</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Incident Reports</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">{incidents.length}</h3>
          <span className="text-[11px] text-amber-600 font-bold">Requires moderation</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Vault Evidence Files</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-900">124</h3>
          <span className="text-[11px] text-slate-400">Encrypted client-side</span>
        </div>

      </div>

      {/* Analytics Visual Charts (SVG Bar & Wave Graphic) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Chart 1: Incident Categories */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Report Categories Distribution</h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Unsafe Area / Lighting</span>
                <span>45%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Stalking & Tailing</span>
                <span>30%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Public Transport Concern</span>
                <span>15%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span>Workplace Concerns</span>
                <span>10%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart 2: Hourly Activity Graph */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-slate-900">Hourly SOS Alert Triggers</h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
            {[15, 25, 10, 45, 80, 95, 60, 40, 30, 20, 15, 10].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div
                  className="w-full bg-indigo-500 group-hover:bg-indigo-600 rounded-t-lg transition-all"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-slate-400 font-semibold">{i * 2}h</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Incident Reports Moderation Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Incident Reports Moderation</h3>
            <p className="text-xs text-slate-500">Review community reports submitted by users.</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-slate-500">Status Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Report ID</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Reporter</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-3 font-bold text-slate-900">{inc.id}</td>
                  <td className="py-3.5 px-3">{inc.type}</td>
                  <td className="py-3.5 px-3 max-w-[180px] truncate">{inc.location}</td>
                  <td className="py-3.5 px-3">{inc.reportedBy}</td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inc.status === 'Verified'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inc.status === 'Resolved'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'Verified')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100"
                        title="Mark Verified"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => updateIncidentStatus(inc.id, 'Resolved')}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
                        title="Mark Resolved"
                      >
                        Resolve
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
