// OpenStreetMap Reverse Geocoding & Nearby Help Facilities Service

export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'Accept-Language': 'en',
          'User-Agent': 'NariRaksha-Safety-Platform/1.0'
        }
      }
    );
    if (!response.ok) throw new Error('Geocoding request failed');
    const data = await response.json();
    return {
      address: data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      city: data.address?.city || data.address?.town || data.address?.suburb || 'Nearby Area',
      state: data.address?.state || '',
      country: data.address?.country || 'India',
      raw: data
    };
  } catch (error) {
    console.warn('Reverse geocode warning:', error);
    return {
      address: `Latitude: ${lat.toFixed(5)}, Longitude: ${lng.toFixed(5)}`,
      city: 'Local Region',
      state: '',
      country: 'India',
      raw: null
    };
  }
};

// Generate realistic nearby emergency facilities around current lat/lng or default city
export const getNearbyFacilities = (lat = 28.6139, lng = 77.2090) => {
  // Generates nearby stations within ~0.5 - 3.5 km offset
  const policeStations = [
    {
      id: 'pol-1',
      name: 'Central Women Police Station & Helpline Desk',
      category: 'police',
      address: 'Main Secretariat Road, Block B',
      phone: '112',
      altPhone: '011-23385555',
      distanceKm: 0.8,
      lat: lat + 0.005,
      lng: lng + 0.004,
      openHours: '24/7 Active',
      verified: true
    },
    {
      id: 'pol-2',
      name: 'Metro Security & Transit Police Outpost',
      category: 'police',
      address: 'Central Station Complex, Platform 1 Exit',
      phone: '112',
      altPhone: '1512',
      distanceKm: 1.4,
      lat: lat - 0.007,
      lng: lng + 0.008,
      openHours: '24/7 Active',
      verified: true
    },
    {
      id: 'pol-3',
      name: 'District Police Headquarter & Control Room',
      category: 'police',
      address: 'Civic Centre Drive, Sector 4',
      phone: '112',
      altPhone: '100',
      distanceKm: 2.3,
      lat: lat + 0.012,
      lng: lng - 0.010,
      openHours: '24/7 Active',
      verified: true
    }
  ];

  const hospitals = [
    {
      id: 'hosp-1',
      name: 'City General Hospital & Emergency Care',
      category: 'hospital',
      address: 'Healthcare Avenue, Ward 12',
      phone: '102',
      altPhone: '011-26588500',
      distanceKm: 1.1,
      lat: lat - 0.006,
      lng: lng - 0.005,
      openHours: '24/7 Trauma Emergency',
      verified: true
    },
    {
      id: 'hosp-2',
      name: 'Sanjeevani Trauma & Medical Center',
      category: 'hospital',
      address: 'Ring Road Crossing, Near Flyover',
      phone: '108',
      altPhone: '011-23365400',
      distanceKm: 2.7,
      lat: lat + 0.015,
      lng: lng + 0.012,
      openHours: '24/7 Active',
      verified: true
    }
  ];

  const safePlaces = [
    {
      id: 'safe-1',
      name: '24/7 Sakhi One Stop Center for Women',
      category: 'safe_place',
      address: 'Government Women Empowerment Hub, Building 3',
      phone: '181',
      altPhone: '1091',
      distanceKm: 1.5,
      lat: lat + 0.008,
      lng: lng - 0.003,
      openHours: '24/7 Women Shelter & Support',
      verified: true
    },
    {
      id: 'safe-2',
      name: 'All-Night Well-Lit Transit Hub & Fuel Station',
      category: 'safe_place',
      address: 'Grand Trunk Road Junction',
      phone: '112',
      altPhone: '1800-180-1234',
      distanceKm: 0.5,
      lat: lat - 0.003,
      lng: lng + 0.003,
      openHours: '24/7 CCTV Monitored',
      verified: true
    },
    {
      id: 'safe-3',
      name: 'Community Women Safety Refuge & Help Desk',
      category: 'safe_place',
      address: 'Municipal Library Complex, Ground Floor',
      phone: '181',
      altPhone: '',
      distanceKm: 3.1,
      lat: lat - 0.018,
      lng: lng - 0.014,
      openHours: '6 AM - 11 PM Staffed',
      verified: true
    }
  ];

  return {
    police: policeStations,
    hospitals: hospitals,
    safePlaces: safePlaces,
    all: [...policeStations, ...hospitals, ...safePlaces]
  };
};
