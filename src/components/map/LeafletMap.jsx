import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default icon URL issues in Vite bundler
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom Icon helper
const createCustomIcon = (colorHex, labelText) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        background-color: ${colorHex};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: 800;
        font-size: 11px;
      ">
        ${labelText || ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: `
    <div style="
      background-color: #2563EB;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 0 0 8px rgba(37,99,235,0.3);
    "></div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

const policeIcon = createCustomIcon('#1E3A8A', '👮');
const hospitalIcon = createCustomIcon('#DC2626', '🏥');
const safeIcon = createCustomIcon('#16A34A', '🛡️');
const incidentIcon = createCustomIcon('#D97706', '⚠️');

// Helper to auto-recenter map when center prop updates
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

export const LeafletMap = ({
  center = [28.6139, 77.2090],
  zoom = 14,
  userLocation = null,
  facilities = [],
  incidents = [],
  height = '400px'
}) => {
  return (
    <div style={{ height, width: '100%' }} className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={center} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="p-1 space-y-1 text-xs">
                <strong className="text-blue-700 font-bold block">Your Current Location</strong>
                <p className="text-slate-600 leading-tight">{userLocation.address}</p>
                <span className="text-[10px] text-slate-400">Accuracy: ±{userLocation.accuracy}m</span>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Nearby Facilities Markers */}
        {facilities.map((fac) => {
          const icon = fac.category === 'police' ? policeIcon : fac.category === 'hospital' ? hospitalIcon : safeIcon;
          return (
            <Marker key={fac.id} position={[fac.lat, fac.lng]} icon={icon}>
              <Popup>
                <div className="p-1 space-y-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-slate-900">{fac.name}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{fac.address}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`tel:${fac.phone}`}
                      className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold text-[10px] hover:bg-blue-700"
                    >
                      Call {fac.phone}
                    </a>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${fac.lat},${fac.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-slate-800 text-white rounded font-bold text-[10px] hover:bg-slate-700"
                    >
                      Directions
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Community Incident Markers */}
        {incidents.map((inc) => (
          <Marker key={inc.id} position={[inc.lat, inc.lng]} icon={incidentIcon}>
            <Popup>
              <div className="p-1 space-y-1 text-xs">
                <span className="bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded text-[10px]">
                  {inc.type}
                </span>
                <p className="text-slate-700 font-medium">{inc.location}</p>
                <p className="text-[11px] text-slate-500">{inc.description}</p>
                <span className="text-[10px] text-slate-400">Date: {inc.date}</span>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
};
