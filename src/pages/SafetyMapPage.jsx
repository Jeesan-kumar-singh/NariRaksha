import React, { useState } from 'react';
import { Map as MapIcon, Shield, AlertTriangle, Eye, Layers, Filter } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useIncidents } from '../contexts/IncidentsContext';
import { getNearbyFacilities } from '../services/openStreetMapService';
import { LeafletMap } from '../components/map/LeafletMap';

export const SafetyMapPage = () => {
  const { location } = useLocation();
  const { incidents } = useIncidents();

  const [showPolice, setShowPolice] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showSafePlaces, setShowSafePlaces] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  const facilitiesRaw = getNearbyFacilities(location.lat, location.lng);

  const visibleFacilities = [
    ...(showPolice ? facilitiesRaw.police : []),
    ...(showHospitals ? facilitiesRaw.hospitals : []),
    ...(showSafePlaces ? facilitiesRaw.safePlaces : [])
  ];

  const visibleIncidents = showIncidents ? incidents : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Spatial Intelligence
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Community Safety Map
          </h1>
          <p className="text-xs text-slate-500">
            Neutral mapping of emergency resources, verified safe hubs, and community incident markers.
          </p>
        </div>
      </div>

      {/* Layer Toggles Toolbar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs font-bold">
        <div className="flex items-center gap-2 text-slate-500">
          <Layers className="w-4 h-4 text-blue-600" />
          <span>Toggle Map Layers:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowPolice(!showPolice)}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              showPolice ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span>👮 Police Stations</span>
          </button>

          <button
            onClick={() => setShowHospitals(!showHospitals)}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              showHospitals ? 'bg-red-50 border-red-200 text-red-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span>🏥 Hospitals</span>
          </button>

          <button
            onClick={() => setShowSafePlaces(!showSafePlaces)}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              showSafePlaces ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span>🛡️ Safe Places</span>
          </button>

          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              showIncidents ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <span>⚠️ Incident Markers ({incidents.length})</span>
          </button>
        </div>
      </div>

      {/* Map Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-md">
        <LeafletMap
          center={[location.lat, location.lng]}
          userLocation={location}
          facilities={visibleFacilities}
          incidents={visibleIncidents}
          height="580px"
        />
      </div>

    </div>
  );
};
