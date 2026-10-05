import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  Volume2,
  VolumeX,
  Share2,
  Mic,
  MicOff,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Users,
  MapPin,
  Clock
} from 'lucide-react';
import { useSOS } from '../../contexts/SOSContext';
import { useLocation } from '../../contexts/LocationContext';
import { useContacts } from '../../contexts/ContactsContext';
import { useVault } from '../../contexts/VaultContext';

export const EmergencyModeOverlay = () => {
  const { isSOSActive, activeSession, deactivateSOS, sirenActive, toggleSiren } = useSOS();
  const { location } = useLocation();
  const { primaryContact } = useContacts();
  const { addVaultRecord } = useVault();

  const [copied, setCopied] = useState(false);
  const [showSafeModal, setShowSafeModal] = useState(false);
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // Audio Recording duration counter
  useEffect(() => {
    let interval;
    if (isRecordingAudio) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingAudio]);

  if (!isSOSActive) return null;

  const locationText = location.isAvailable
    ? `${location.address} (Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)})`
    : `Latitude: ${location.lat.toFixed(4)}, Longitude: ${location.lng.toFixed(4)}`;

  const sharePayload = {
    title: '🚨 NariRaksha Emergency Alert',
    text: `EMERGENCY ALERT: I may need immediate assistance. My current location: ${locationText}. Map Link: https://maps.google.com/?q=${location.lat},${location.lng}`,
    url: `https://maps.google.com/?q=${location.lat},${location.lng}`
  };

  const handleShareLocation = async () => {
    if (navigator.share) {
      try {
        await navigator.share(sharePayload);
      } catch (err) {
        console.warn('Share error:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sharePayload.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Ambient Audio Recording trigger using Web MediaRecorder API
  const handleToggleAudioRecording = async () => {
    if (isRecordingAudio && mediaRecorder) {
      mediaRecorder.stop();
      setIsRecordingAudio(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const record = {
          id: `audio-${Date.now()}`,
          fileName: `SOS_Emergency_Audio_${new Date().toISOString().slice(0,10)}.webm`,
          type: 'audio',
          mimeType: 'audio/webm',
          fileSize: `${(audioBlob.size / 1024 / 1024).toFixed(2)} MB`,
          uploadDate: new Date().toLocaleString(),
          incidentId: activeSession?.id || 'SOS-Active',
          description: 'Emergency ambient audio clip captured during SOS session',
          blob: audioBlob,
          url: URL.createObjectURL(audioBlob)
        };
        addVaultRecord(record);
        // Stop audio tracks
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecordingAudio(true);
    } catch (err) {
      alert('Microphone access denied or unsupported in browser.');
      console.warn('MediaRecorder error:', err);
    }
  };

  const handleEndSOS = () => {
    deactivateSOS(resolutionNotes || 'User marked safe');
    setShowSafeModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-white animate-in fade-in duration-300">

      {/* Flashing Emergency Header Banner */}
      <div className="bg-red-600 text-white px-4 py-3 flex items-center justify-between border-b border-red-500 animate-sos-pulse sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white animate-ping" />
          <div>
            <h2 className="font-black text-sm tracking-wider uppercase">
              🚨 EMERGENCY MODE ACTIVE
            </h2>
            <p className="text-[11px] text-red-100 font-medium">
              Session #{activeSession?.id || '1000'} • Started {activeSession?.startTime || 'Just now'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowSafeModal(true)}
          className="px-4 py-1.5 rounded-full bg-white text-red-700 hover:bg-slate-100 font-extrabold text-xs shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>I'M SAFE</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* Location & GPS Info Card */}
        <div className="glass-emergency rounded-2xl p-5 text-white shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-200 text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-red-300 animate-bounce" />
              <span>Prepared Emergency GPS Coordinates</span>
            </div>
            <span className="text-[11px] bg-red-950/60 text-red-200 px-2.5 py-0.5 rounded-full border border-red-400/30">
              Accuracy: ±{location.accuracy}m
            </span>
          </div>

          <p className="text-base font-bold leading-relaxed text-white">
            {location.address}
          </p>

          <div className="flex flex-wrap items-center justify-between text-xs text-red-200 border-t border-red-500/40 pt-3 gap-2">
            <div>
              Lat: <strong>{location.lat.toFixed(5)}</strong>, Lng: <strong>{location.lng.toFixed(5)}</strong>
            </div>
            <a
              href={`https://maps.google.com/?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white hover:underline font-bold"
            >
              <span>Open Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Primary Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Call Police 112 */}
          <a
            href="tel:112"
            className="flex items-center justify-between p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all border border-red-400 transform active:scale-98 group"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-200">Official Helpline</span>
              <h4 className="text-lg font-black tracking-tight">CALL 112</h4>
              <p className="text-[11px] text-red-100">National Emergency Response Services</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Call Women Helpline 181 */}
          <a
            href="tel:181"
            className="flex items-center justify-between p-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/30 transition-all border border-amber-400 transform active:scale-98 group"
          >
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-200">24/7 Helpline</span>
              <h4 className="text-lg font-black tracking-tight">CALL 181</h4>
              <p className="text-[11px] text-amber-100">Women Helpline & Crisis Support</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
          </a>

          {/* Call Primary Contact */}
          {primaryContact ? (
            <a
              href={`tel:${primaryContact.phone.replace(/\s+/g, '')}`}
              className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all border border-blue-400 transform active:scale-98 group"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">
                  Primary Contact ({primaryContact.relationship})
                </span>
                <h4 className="text-base font-bold truncate max-w-[170px]">{primaryContact.name}</h4>
                <p className="text-[11px] text-blue-100">{primaryContact.phone}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
            </a>
          ) : null}

        </div>

        {/* Secondary Emergency Tools Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Emergency Utilities & Evidence Capture
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

            {/* Siren Toggle */}
            <button
              onClick={toggleSiren}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-bold transition-all ${
                sirenActive
                  ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {sirenActive ? <VolumeX className="w-6 h-6 mb-1.5" /> : <Volume2 className="w-6 h-6 mb-1.5 text-amber-400" />}
              <span>{sirenActive ? 'MUTE SIREN' : 'LOUD SIREN'}</span>
            </button>

            {/* Share Location */}
            <button
              onClick={handleShareLocation}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              <Share2 className="w-6 h-6 mb-1.5 text-blue-400" />
              <span>SHARE GPS</span>
            </button>

            {/* Record Audio */}
            <button
              onClick={handleToggleAudioRecording}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-bold transition-all ${
                isRecordingAudio
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-lg'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
            >
              {isRecordingAudio ? <MicOff className="w-6 h-6 mb-1.5" /> : <Mic className="w-6 h-6 mb-1.5 text-emerald-400" />}
              <span>
                {isRecordingAudio ? `REC (${recordingTime}s)` : 'REC AUDIO'}
              </span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
            >
              {copied ? <Check className="w-6 h-6 mb-1.5 text-emerald-400" /> : <Copy className="w-6 h-6 mb-1.5 text-indigo-400" />}
              <span>{copied ? 'COPIED!' : 'COPY LINK'}</span>
            </button>

          </div>
        </div>

        {/* SMS / WhatsApp Quick Action Payload */}
        {primaryContact && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Contact SMS Payload
            </h4>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={`sms:${primaryContact.phone.replace(/\s+/g, '')}?body=${encodeURIComponent(sharePayload.text)}`}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <span>Send SMS to {primaryContact.name}</span>
              </a>
              <a
                href={`https://wa.me/${primaryContact.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(sharePayload.text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>Send WhatsApp Alert</span>
              </a>
            </div>
          </div>
        )}

      </div>

      {/* "I'm Safe" Resolution Modal */}
      {showSafeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold">End Emergency Session</h3>
              <p className="text-xs text-slate-400">
                This will resolve the current SOS session and stop active alerts.
              </p>
            </div>

            <textarea
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="Optional notes (e.g. Reached safe location, fake alarm, met family)"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              rows={3}
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowSafeModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={handleEndSOS}
                className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                CONFIRM SAFE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
