import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { reverseGeocode } from '../services/openStreetMapService';

const LocationContext = createContext();

// Default central fallback coordinates if GPS is unavailable/denied
const DEFAULT_FALLBACK_LOCATION = {
  lat: 28.6139,
  lng: 77.2090,
  accuracy: 25,
  address: 'Connaught Place, Central New Delhi, Delhi, India',
  city: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  isAvailable: false,
  isFallback: true,
  error: null
};

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(DEFAULT_FALLBACK_LOCATION);
  const [isLocating, setIsLocating] = useState(false);
  const [permissionState, setPermissionState] = useState('prompt'); // 'granted', 'denied', 'prompt'

  const updatePosition = useCallback(async (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = Math.round(position.coords.accuracy || 10);
    const timestamp = new Date(position.timestamp).toLocaleTimeString();

    // Fetch human readable address
    const geoInfo = await reverseGeocode(lat, lng);

    setLocation({
      lat,
      lng,
      accuracy,
      address: geoInfo.address,
      city: geoInfo.city,
      state: geoInfo.state,
      country: geoInfo.country,
      timestamp,
      isAvailable: true,
      isFallback: false,
      error: null
    });
    setPermissionState('granted');
    setIsLocating(false);
  }, []);

  const handleError = useCallback((error) => {
    console.warn('Geolocation API error:', error.message);
    let errorMsg = 'Location unavailable';
    if (error.code === 1) {
      errorMsg = 'Location permission denied. Please allow GPS access in your browser settings.';
      setPermissionState('denied');
    } else if (error.code === 2) {
      errorMsg = 'GPS position unavailable. Check your device sensors.';
    } else if (error.code === 3) {
      errorMsg = 'GPS request timed out.';
    }

    setLocation(prev => ({
      ...prev,
      isAvailable: false,
      error: errorMsg
    }));
    setIsLocating(false);
  }, []);

  const refreshLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser.'
      }));
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      updatePosition,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, [updatePosition, handleError]);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return (
    <LocationContext.Provider
      value={{
        location,
        isLocating,
        permissionState,
        refreshLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
