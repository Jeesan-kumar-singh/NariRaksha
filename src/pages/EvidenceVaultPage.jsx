import React, { useState } from 'react';
import { Lock, FileText, Image as ImageIcon, Music, Video, Download, Trash2, Eye, Plus, ShieldCheck, AlertCircle, X } from 'lucide-react';
import { useVault } from '../contexts/VaultContext';

export const EvidenceVaultPage = () => {
  const { vaultFiles, addVaultRecord, removeVaultRecord, loading } = useVault();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);

  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('image');
  const [description, setDescription] = useState('');
  const [incidentId, setIncidentId] = useState('General');
  const [fileBlob, setFileBlob] = useState(null);

  const handleChooseFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileBlob(file);
    }
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileName) return;

    const record = {
      id: `vault-${Date.now()}`,
      fileName: fileName,
      type: fileType,
      mimeType: fileBlob?.type || 'application/octet-stream',
      fileSize: fileBlob ? `${(fileBlob.size / 1024 / 1024).toFixed(2)} MB` : '1.2 MB',
      uploadDate: new Date().toLocaleString(),
      incidentId: incidentId || 'General',
      description: description || 'User uploaded evidence',
      blob: fileBlob,
      url: fileBlob ? URL.createObjectURL(fileBlob) : ''
    };

    addVaultRecord(record);
    setIsModalOpen(false);
    setFileName('');
    setDescription('');
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'audio': return <Music className="w-5 h-5 text-amber-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
            Client-Side Storage
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Private Evidence Vault
          </h1>
          <p className="text-xs text-slate-500">
            Securely store ambient audio clips, photos, videos, and legal notes on your device.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 text-purple-400" />
          <span>Add Evidence File</span>
        </button>
      </div>

      {/* Legal Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 text-xs flex items-start gap-3">
        <Lock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Privacy & Legal Evidence Disclaimer:</strong>
          <p>
            Files in the Evidence Vault are stored locally in your browser's IndexedDB. Storing evidence here does <strong>NOT</strong> automatically render files legally authenticated in court without proper chain-of-custody verification. Never share your private PIN.
          </p>
        </div>
      </div>

      {/* Vault Files Table / Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>Encrypted Records ({vaultFiles.length})</span>
        </h3>

        {vaultFiles.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No evidence files currently stored in your vault.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {vaultFiles.map((file) => (
              <div key={file.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 p-3 rounded-2xl transition-colors">

                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">{file.fileName}</span>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                        {file.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{file.description}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span>Size: {file.fileSize}</span>
                      <span>•</span>
                      <span>Uploaded: {file.uploadDate}</span>
                      <span>•</span>
                      <span>Incident ID: {file.incidentId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {file.url && (
                    <button
                      onClick={() => setSelectedFilePreview(file)}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View / Listen</span>
                    </button>
                  )}

                  {file.url && (
                    <a
                      href={file.url}
                      download={file.fileName}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      if (confirm(`Delete ${file.fileName} from vault?`)) removeVaultRecord(file.id);
                    }}
                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 text-xs font-bold"
                    title="Delete File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Record Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-lg text-slate-900">Add Evidence File</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Select Local File</label>
                <input
                  type="file"
                  onChange={handleChooseFile}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">File Display Title</label>
                <input
                  type="text"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="e.g. Incident_Audio_Recording.mp3"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Type</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="image">Photo / Image</option>
                    <option value="audio">Audio Clip</option>
                    <option value="video">Video Recording</option>
                    <option value="document">Legal Document</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Incident Tag</label>
                  <input
                    type="text"
                    value={incidentId}
                    onChange={(e) => setIncidentId(e.target.value)}
                    placeholder="e.g. SOS-1021"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notes / Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Contextual notes for this file..."
                  rows={3}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
                >
                  Store in Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Preview Modal */}
      {selectedFilePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-base text-slate-900">{selectedFilePreview.fileName}</h3>
              <button onClick={() => setSelectedFilePreview(null)} className="p-1 rounded-full hover:bg-slate-100">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {selectedFilePreview.type === 'image' && (
              <img src={selectedFilePreview.url} alt="Evidence Preview" className="w-full h-64 object-cover rounded-2xl border" />
            )}

            {selectedFilePreview.type === 'audio' && (
              <audio controls src={selectedFilePreview.url} className="w-full mt-4" />
            )}

            <p className="text-xs text-slate-600">{selectedFilePreview.description}</p>
          </div>
        </div>
      )}

    </div>
  );
};
