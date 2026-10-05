import React, { useState } from 'react';
import { AlertTriangle, MapPin, Upload, ShieldCheck, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';
import { useIncidents } from '../contexts/IncidentsContext';
import { useLocation } from '../contexts/LocationContext';

export const IncidentReportPage = () => {
  const { addIncidentReport } = useIncidents();
  const { location } = useLocation();

  const [type, setType] = useState('Harassment');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [incidentLoc, setIncidentLoc] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Harassment',
    'Stalking',
    'Unsafe Area / Dark Street',
    'Suspicious Activity',
    'Public Transport Concern',
    'Workplace Concern',
    'Domestic Concern',
    'Other Safety Issue'
  ];

  const handleUseCurrentLocation = () => {
    setIncidentLoc(location.address);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!incidentLoc || !description) return;

    addIncidentReport({
      type,
      date,
      time,
      location: incidentLoc,
      lat: location.lat,
      lng: location.lng,
      description,
      anonymous,
      reportedBy: anonymous ? 'Anonymous User' : 'Verified User',
      urgency: 'Medium',
      filesCount: attachedFiles.length
    });

    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
          Community Safety Network
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Report a Safety Incident
        </h1>
        <p className="text-xs text-slate-500">
          Document unsafe locations, harassment, or suspicious activities to inform community safety mapping.
        </p>
      </div>

      {/* Privacy Warning & Legal Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Important Legal & Privacy Notice:</strong>
          <p>
            Submitting a report through NariRaksha helps map community safety patterns but does <strong>NOT</strong> automatically constitute an official police FIR complaint. In an ongoing emergency, call <strong>112</strong> or <strong>181</strong> directly.
          </p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Incident Report Logged</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Your report has been securely saved to the community safety database. Thank you for helping keep others informed.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setDescription('');
            }}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">

          {/* Category Selector */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Incident Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-blue-500 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Date of Incident</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Approximate Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Location Details</label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Auto-fill Current Location</span>
              </button>
            </div>
            <input
              type="text"
              value={incidentLoc}
              onChange={(e) => setIncidentLoc(e.target.value)}
              placeholder="e.g. Metro Gate 2 street crossing, Market Rd"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Detailed Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Incident Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happened, individuals involved, landmarks, or vehicle details..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Optional Attachments */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Optional Evidence Files (Photos / Videos / Audio)</label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="fileUploadInput"
              />
              <label htmlFor="fileUploadInput" className="cursor-pointer space-y-1 block">
                <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                <span className="text-xs font-bold text-blue-600 block">Click to choose files</span>
                <span className="text-[11px] text-slate-400 block">
                  {attachedFiles.length > 0 ? `${attachedFiles.length} file(s) selected` : 'Images, audio clips, or documents'}
                </span>
              </label>
            </div>
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <input
              type="checkbox"
              id="anonymousCheck"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="anonymousCheck" className="text-xs font-bold text-slate-700 cursor-pointer">
              Submit Report Anonymously (Hide my profile identity)
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Submit Structured Incident Report</span>
          </button>

        </form>
      )}

    </div>
  );
};
