import React, { useState } from 'react';
import {
  MapPin,
  RefreshCw,
  Share2,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Navigation
} from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { LeafletMap } from '../components/map/LeafletMap';

export const LocationPage = () => {
  const { location, isLocating, permissionState, refreshLocation } = useLocation();
  const [copied, setCopied] = useState(false);

  const shareText = `NariRaksha Emergency Location Alert: My current location is ${location.address}. Coordinates: https://maps.google.com/?q=${location.lat},${location.lng}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Emergency GPS Location',
          text: shareText,
          url: `https://maps.google.com/?q=${location.lat},${location.lng}`
        });
      } catch (err) {
        console.warn('Share error:', err);
      }
    } else {
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Real-Time Geolocation
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Location & GPS Status
          </h1>
          <p className="text-xs text-slate-500">
            High-precision browser GPS coordinates and reverse geocoded address.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={refreshLocation}
            disabled={isLocating}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'Refresh Location'}</span>
          </button>
        </div>
      </div>

      {/* Permission Warning if Denied */}
      {permissionState === 'denied' && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-bold">GPS Permission Required</strong>
            <p>
              Your browser has denied location access. Please enable location permissions in your browser address bar icon to view live coordinates.
            </p>
          </div>
        </div>
      )}

      {/* GPS Location Data Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${location.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                {location.isAvailable ? 'GPS Signal Locked' : 'Fallback Central Position'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {location.address}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <div>
              Lat: <strong className="text-slate-900">{location.lat.toFixed(5)}</strong>
            </div>
            <span>•</span>
            <div>
              Lng: <strong className="text-slate-900">{location.lng.toFixed(5)}</strong>
            </div>
            <span>•</span>
            <div>
              Accuracy: <strong className="text-emerald-600">±{location.accuracy}m</strong>
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleShare}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-blue-600/20 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Location</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Location Link'}</span>
          </button>

          <a
            href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-blue-600" />
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive OpenStreetMap */}
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-slate-900">Interactive Location Map</h3>
          <LeafletMap center={[location.lat, location.lng]} userLocation={location} height="420px" />
        </div>

      </div>

    </div>
  );
};
