import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveFileToVault, getAllVaultFiles, deleteVaultFile } from '../services/dbService';

const VaultContext = createContext();

const MOCK_SAMPLE_FILES = [
  {
    id: 'vault-audio-01',
    fileName: 'Emergency_Audio_Clip_20261001.mp3',
    type: 'audio',
    mimeType: 'audio/mp3',
    fileSize: '1.4 MB',
    uploadDate: '2026-10-01 21:16',
    incidentId: 'SOS-1021',
    description: 'Ambient voice recording during SOS trigger',
    url: ''
  },
  {
    id: 'vault-photo-02',
    fileName: 'Vehicle_Plate_Evidence.jpg',
    type: 'image',
    mimeType: 'image/jpeg',
    fileSize: '2.8 MB',
    uploadDate: '2026-09-29 22:20',
    incidentId: 'INC-2026-002',
    description: 'Photograph of suspicious scooter registration',
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&auto=format&fit=crop&q=80'
  }
];

export const VaultProvider = ({ children }) => {
  const [vaultFiles, setVaultFiles] = useState(MOCK_SAMPLE_FILES);
  const [loading, setLoading] = useState(true);

  const refreshVault = useCallback(async () => {
    try {
      setLoading(true);
      const dbFiles = await getAllVaultFiles();
      if (dbFiles && dbFiles.length > 0) {
        setVaultFiles(dbFiles);
      } else {
        setVaultFiles(MOCK_SAMPLE_FILES);
      }
    } catch (e) {
      console.warn('Vault DB load warning:', e);
      setVaultFiles(MOCK_SAMPLE_FILES);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshVault();
  }, [refreshVault]);

  const addVaultRecord = async (record) => {
    const fileItem = {
      id: record.id || `vault-${Date.now()}`,
      fileName: record.fileName || 'Evidence_File.dat',
      type: record.type || 'document',
      mimeType: record.mimeType || 'application/octet-stream',
      fileSize: record.fileSize || '1.0 MB',
      uploadDate: record.uploadDate || new Date().toLocaleString(),
      incidentId: record.incidentId || 'General',
      description: record.description || 'User uploaded evidence',
      blob: record.blob || null,
      url: record.url || ''
    };

    try {
      await saveFileToVault(fileItem);
    } catch (err) {
      console.warn('Saving to IndexedDB failed, storing in memory state:', err);
    }
    setVaultFiles(prev => [fileItem, ...prev]);
  };

  const removeVaultRecord = async (id) => {
    try {
      await deleteVaultFile(id);
    } catch (err) {
      console.warn('IndexedDB delete error:', err);
    }
    setVaultFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <VaultContext.Provider
      value={{
        vaultFiles,
        loading,
        addVaultRecord,
        removeVaultRecord,
        refreshVault
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
