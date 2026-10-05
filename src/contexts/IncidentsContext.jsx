import React, { createContext, useContext, useState, useEffect } from 'react';

const IncidentsContext = createContext();

const INITIAL_INCIDENTS = [
  {
    id: 'INC-2026-001',
    type: 'Unsafe Area / Poor Lighting',
    date: '2026-10-02',
    time: '20:30',
    location: 'Near Metro Gate 3, Sector 15',
    lat: 28.6189,
    lng: 77.2150,
    description: 'Streetlights have been broken for 3 days. High footfall area but completely dark after sunset.',
    anonymous: true,
    status: 'Verified',
    reportedBy: 'Anonymous User',
    urgency: 'Medium'
  },
  {
    id: 'INC-2026-002',
    type: 'Stalking / Following',
    date: '2026-09-29',
    time: '22:15',
    location: 'Bus Terminal Corridor, Market Rd',
    lat: 28.6089,
    lng: 77.2010,
    description: 'Two individuals on a black motor scooter following lone commuters near bus shelter.',
    anonymous: false,
    status: 'Under Review',
    reportedBy: 'Priya Singh',
    urgency: 'High'
  },
  {
    id: 'INC-2026-003',
    type: 'Public Transport Concern',
    date: '2026-09-25',
    time: '19:40',
    location: 'Feeder Bus Route 402',
    lat: 28.6239,
    lng: 77.2250,
    description: 'Overcrowding and lack of designated women seating enforcement during peak hours.',
    anonymous: true,
    status: 'Resolved',
    reportedBy: 'Anonymous User',
    urgency: 'Low'
  }
];

export const IncidentsProvider = ({ children }) => {
  const [incidents, setIncidents] = useState(() => {
    const saved = localStorage.getItem('nariraksha_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  useEffect(() => {
    localStorage.setItem('nariraksha_incidents', JSON.stringify(incidents));
  }, [incidents]);

  const addIncidentReport = (reportData) => {
    const newReport = {
      ...reportData,
      id: `INC-2026-${String(incidents.length + 1).padStart(3, '0')}`,
      status: 'Under Review',
      submittedAt: new Date().toISOString()
    };
    setIncidents(prev => [newReport, ...prev]);
    return newReport;
  };

  const deleteIncident = (id) => {
    setIncidents(prev => prev.filter(item => item.id !== id));
  };

  const updateIncidentStatus = (id, newStatus) => {
    setIncidents(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <IncidentsContext.Provider
      value={{
        incidents,
        addIncidentReport,
        deleteIncident,
        updateIncidentStatus
      }}
    >
      {children}
    </IncidentsContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentsContext);
