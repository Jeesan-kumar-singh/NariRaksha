import React, { useState } from 'react';
import { PhoneCall, Navigation, MapPin, Shield, CheckCircle2, Search, Filter } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { getNearbyFacilities } from '../services/openStreetMapService';
import { LeafletMap } from '../components/map/LeafletMap';

export const NearbyHelpPage = () => {
  const { location } = useLocation();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'police', 'hospital', 'safe_place'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFacility, setSelectedFacility] = useState(null);

  const facilities = getNearbyFacilities(location.lat, location.lng);

  const filteredFacilities = (activeCategory === 'all'
    ? facilities.all
    : facilities.all.filter(f => f.category === activeCategory)
  ).filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.address.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
          Emergency Infrastructure
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Nearby Emergency Help & Safe Places
        </h1>
        <p className="text-xs text-slate-500">
          Verified 24/7 police stations, medical trauma centers, and Sakhi safe shelters near your current GPS position.
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto text-xs font-bold">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2.5 rounded-2xl transition-all ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Resources ({facilities.all.length})
          </button>
          <button
            onClick={() => setActiveCategory('police')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'police'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>👮 Police Stations</span>
          </button>
          <button
            onClick={() => setActiveCategory('hospital')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'hospital'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🏥 Hospitals</span>
          </button>
          <button
            onClick={() => setActiveCategory('safe_place')}
            className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-1.5 ${
              activeCategory === 'safe_place'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🛡️ Safe Places</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility name..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Main Layout Grid: List + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* List of Facilities (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredFacilities.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl text-center text-slate-500 text-xs border border-slate-200">
              No facilities found matching your search.
            </div>
          ) : (
            filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                        fac.category === 'police'
                          ? 'bg-blue-100 text-blue-800'
                          : fac.category === 'hospital'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {fac.category.replace('_', ' ')}
                      </span>
                      {fac.verified && (
                        <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Resource</span>
                        </span>
                      )}
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">{fac.name}</h3>
                    <p className="text-xs text-slate-600">{fac.address}</p>
                  </div>

                  <span className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl shrink-0">
                    {fac.distanceKm} km away
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span>Hours: <strong>{fac.openHours}</strong></span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${fac.phone}`}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call {fac.phone}</span>
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${fac.lat},${fac.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Interactive Map (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="sticky top-20 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Facilities Map View</h3>
            <LeafletMap
              center={[location.lat, location.lng]}
              userLocation={location}
              facilities={filteredFacilities}
              height="500px"
            />
          </div>
        </div>

      </div>

    </div>
  );
};
