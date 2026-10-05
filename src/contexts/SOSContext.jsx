import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SOSContext = createContext();

const INITIAL_HISTORY = [
  {
    id: 'SOS-1021',
    date: '2026-10-01',
    time: '21:14:00',
    duration: '6 mins',
    location: 'Connaught Place Outer Circle, New Delhi',
    status: 'Ended — User marked safe',
    notes: 'Walked into metro station, situation resolved safely.'
  },
  {
    id: 'SOS-0988',
    date: '2026-09-18',
    time: '22:45:12',
    duration: '4 mins',
    location: 'Sector 18 Market, Noida',
    status: 'Ended — Cancelled',
    notes: 'Test emergency drill check.'
  }
];

export const SOSProvider = ({ children }) => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(3);
  const [activeSession, setActiveSession] = useState(null);
  const [sirenActive, setSirenActive] = useState(false);

  const [sosHistory, setSosHistory] = useState(() => {
    const saved = localStorage.getItem('nariraksha_sos_history');
    return saved ? JSON.parse(saved) : INITIAL_HISTORY;
  });

  // Web Audio API Siren Synthesizer Reference
  const audioCtxRef = useRef(null);
  const oscRef = useRef(null);
  const gainRef = useRef(null);
  const lfoRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('nariraksha_sos_history', JSON.stringify(sosHistory));
  }, [sosHistory]);

  // Audio Siren Generator via Web Audio API
  const startAudioSiren = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create main siren oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.value = 800; // Base frequency Hz

      lfo.type = 'sine';
      lfo.frequency.value = 2; // 2 Hz frequency modulation
      lfoGain.gain.value = 400; // Frequency variation magnitude

      lfo.connect(osc.frequency);
      osc.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);

      osc.start();
      lfo.start();

      oscRef.current = osc;
      gainRef.current = gain;
      lfoRef.current = lfo;
      setSirenActive(true);
    } catch (err) {
      console.warn('Web Audio Siren error:', err);
    }
  };

  const stopAudioSiren = () => {
    try {
      if (oscRef.current) {
        oscRef.current.stop();
        oscRef.current.disconnect();
        oscRef.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      setSirenActive(false);
    } catch (err) {
      console.warn('Stop siren error:', err);
    }
  };

  const toggleSiren = () => {
    if (sirenActive) {
      stopAudioSiren();
    } else {
      startAudioSiren();
    }
  };

  // Countdown flow before activating SOS
  const startSOSCountdown = () => {
    setIsCountdownActive(true);
    setCountdownSeconds(3);
  };

  const cancelSOSCountdown = () => {
    setIsCountdownActive(false);
    setCountdownSeconds(3);
  };

  const activateSOSDirect = (currentLocation) => {
    setIsCountdownActive(false);
    setIsSOSActive(true);
    const session = {
      id: `SOS-${Math.floor(1000 + Math.random() * 9000)}`,
      startTime: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      location: currentLocation?.address || 'Current Coordinates',
      lat: currentLocation?.lat || 28.6139,
      lng: currentLocation?.lng || 77.2090,
      timestamp: Date.now()
    };
    setActiveSession(session);
  };

  const deactivateSOS = (notes = 'User marked safe') => {
    stopAudioSiren();
    if (activeSession) {
      const endTime = Date.now();
      const durationMins = Math.max(1, Math.round((endTime - activeSession.timestamp) / 60000));
      const completedRecord = {
        id: activeSession.id,
        date: activeSession.date,
        time: activeSession.startTime,
        duration: `${durationMins} mins`,
        location: activeSession.location,
        status: `Ended — ${notes}`,
        notes: notes
      };
      setSosHistory(prev => [completedRecord, ...prev]);
    }
    setIsSOSActive(false);
    setActiveSession(null);
  };

  const deleteHistoryItem = (id) => {
    setSosHistory(prev => prev.filter(item => item.id !== id));
  };

  const clearAllHistory = () => {
    setSosHistory([]);
  };

  return (
    <SOSContext.Provider
      value={{
        isSOSActive,
        isCountdownActive,
        countdownSeconds,
        setCountdownSeconds,
        activeSession,
        sirenActive,
        sosHistory,
        startSOSCountdown,
        cancelSOSCountdown,
        activateSOSDirect,
        deactivateSOS,
        toggleSiren,
        deleteHistoryItem,
        clearAllHistory
      }}
    >
      {children}
    </SOSContext.Provider>
  );
};

export const useSOS = () => useContext(SOSContext);
