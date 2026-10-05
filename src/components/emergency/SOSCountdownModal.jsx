import React, { useEffect } from 'react';
import { AlertOctagon, X, Zap } from 'lucide-react';
import { useSOS } from '../../contexts/SOSContext';
import { useLocation } from '../../contexts/LocationContext';

export const SOSCountdownModal = () => {
  const {
    isCountdownActive,
    countdownSeconds,
    setCountdownSeconds,
    cancelSOSCountdown,
    activateSOSDirect
  } = useSOS();
  const { location } = useLocation();

  useEffect(() => {
    let timer;
    if (isCountdownActive && countdownSeconds > 0) {
      timer = setInterval(() => {
        setCountdownSeconds(prev => prev - 1);
      }, 1000);
    } else if (isCountdownActive && countdownSeconds === 0) {
      activateSOSDirect(location);
    }
    return () => clearInterval(timer);
  }, [isCountdownActive, countdownSeconds, setCountdownSeconds, activateSOSDirect, location]);

  if (!isCountdownActive) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-red-500/50 rounded-3xl max-w-md w-full p-6 text-center text-white shadow-2xl relative overflow-hidden">

        {/* Ambient Red Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-red-600/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={cancelSOSCountdown}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
          aria-label="Cancel Emergency Countdown"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 border border-red-500/40 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-extrabold text-white mb-1">
          Activating Emergency SOS
        </h3>
        <p className="text-xs text-slate-300 mb-6">
          Preparing location sharing and emergency resources...
        </p>

        {/* Countdown Large Ring */}
        <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
          <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
          <span className="text-5xl font-black text-red-500 tracking-tighter">
            {countdownSeconds}
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => activateSOSDirect(location)}
            className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/40 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-98"
          >
            <Zap className="w-4 h-4 fill-white" />
            <span>ACTIVATE IMMEDIATELY</span>
          </button>

          <button
            onClick={cancelSOSCountdown}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-colors"
          >
            CANCEL (I'M SAFE)
          </button>
        </div>

      </div>
    </div>
  );
};
