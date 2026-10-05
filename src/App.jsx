import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context Providers
import { DemoProvider } from './contexts/DemoContext';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import { ContactsProvider } from './contexts/ContactsContext';
import { SOSProvider } from './contexts/SOSContext';
import { IncidentsProvider } from './contexts/IncidentsContext';
import { VaultProvider } from './contexts/VaultContext';

// Common UI & Emergency Components
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { SOSCountdownModal } from './components/emergency/SOSCountdownModal';
import { EmergencyModeOverlay } from './components/emergency/EmergencyModeOverlay';

// 18 Application Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { LocationPage } from './pages/LocationPage';
import { NearbyHelpPage } from './pages/NearbyHelpPage';
import { ContactsPage } from './pages/ContactsPage';
import { IncidentReportPage } from './pages/IncidentReportPage';
import { EvidenceVaultPage } from './pages/EvidenceVaultPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { SafetyMapPage } from './pages/SafetyMapPage';
import { EmergencyHistoryPage } from './pages/EmergencyHistoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { HelpResourcesPage } from './pages/HelpResourcesPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <DemoProvider>
      <AuthProvider>
        <LocationProvider>
          <ContactsProvider>
            <SOSProvider>
              <IncidentsProvider>
                <VaultProvider>
                  <Router>
                    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
                      {/* Top Emergency Disclaimer & Demo Banner */}
                      <DisclaimerBanner />

                      {/* Sticky Navigation Header */}
                      <Navbar />

                      {/* Main Page Content */}
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<LandingPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />
                          <Route path="/dashboard" element={<DashboardPage />} />
                          <Route path="/emergency" element={<EmergencyPage />} />
                          <Route path="/location" element={<LocationPage />} />
                          <Route path="/nearby" element={<NearbyHelpPage />} />
                          <Route path="/contacts" element={<ContactsPage />} />
                          <Route path="/report" element={<IncidentReportPage />} />
                          <Route path="/vault" element={<EvidenceVaultPage />} />
                          <Route path="/ai-assistant" element={<AIAssistantPage />} />
                          <Route path="/safety-map" element={<SafetyMapPage />} />
                          <Route path="/history" element={<EmergencyHistoryPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/privacy" element={<PrivacyPolicyPage />} />
                          <Route path="/help" element={<HelpResourcesPage />} />
                          <Route path="/admin" element={<AdminDashboardPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </main>

                      {/* Global Modals & Emergency Overlays */}
                      <SOSCountdownModal />
                      <EmergencyModeOverlay />

                      {/* Mobile Bottom Navigation Bar */}
                      <MobileBottomNav />

                      {/* Footer */}
                      <Footer />
                    </div>
                  </Router>
                </VaultProvider>
              </IncidentsProvider>
            </SOSProvider>
          </ContactsProvider>
        </LocationProvider>
      </AuthProvider>
    </DemoProvider>
  );
}

export default App;
