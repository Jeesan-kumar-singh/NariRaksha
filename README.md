# NariRaksha — AI-Assisted Women's Safety & Emergency Platform

> *"Your safety. Your control. Help when you need it."*

NariRaksha is a modern, responsive, privacy-first web application and PWA designed to empower women with instant emergency support, location sharing, trusted contact management, nearby help locator, community incident reporting, encrypted evidence storage, and AI-assisted safety guidance.

---

## 🌟 Key Features & Modules

1. **Emergency / SOS System (`/emergency`)**
   - 3-second safety countdown modal with instant override and audio siren generator (Web Audio API).
   - Full 🚨 **EMERGENCY MODE** layout with high contrast UI.
   - Quick dial buttons (`tel:112`, `tel:181`, `tel:1091`, `tel:1098`).
   - One-tap Web Share location trigger + WhatsApp / SMS quick alert payload generator.
   - Ambient audio recording via `MediaRecorder` API directly saved to Evidence Vault.
   - "I'm Safe" session resolution modal with duration logging.

2. **Real-Time Geolocation & Maps (`/location`, `/nearby`, `/safety-map`)**
   - Integrated OpenStreetMap + Leaflet map rendering (Zero paid API keys required).
   - High-precision GPS tracking with Nominatim reverse geocoding for readable addresses.
   - Nearby facilities finder with categorized filters: 👮 Police Stations, 🏥 Hospitals, 🛡️ Sakhi Women Safe Places.
   - One-tap `tel:` phone dialing and Google Maps / Apple Maps directions links.
   - Interactive Community Safety Map displaying verified safe zones and reported incidents.

3. **Trusted Contacts Management (`/contacts`)**
   - Full CRUD operations with LocalStorage persistence.
   - Set primary emergency contact and priority tags (Primary, High, Medium).
   - Instant phone call and pre-filled SMS emergency dispatch.

4. **Structured Incident Reporting (`/report`)**
   - Multi-category incident form (Harassment, Stalking, Unsafe Area, Transport, Workplace).
   - GPS location auto-fill, date/time pickers, and media attachments.
   - Anonymous reporting toggle.
   - Clear legal disclaimer stating reports do not replace official police FIR complaints.

5. **Private Evidence Vault (`/vault`)**
   - Persistent client-side storage powered by IndexedDB.
   - Store photos, videos, ambient audio recordings, and legal documents.
   - File preview modal, download capability, and record deletion.

6. **AI Safety Assistant & Risk Classifier (`/ai-assistant`)**
   - Google Gemini API integration (`VITE_GEMINI_API_KEY`) with an intelligent offline fallback engine.
   - Interactive AI Risk Classifier categorizing user scenarios into **LOW**, **MEDIUM**, or **HIGH ATTENTION** with actionable safety steps.
   - Direct emergency helpline triggers embedded within AI responses.

7. **Admin Dashboard (`/admin`)**
   - Role-based authorization for administrative overview.
   - Metrics: Total users, active SOS sessions, reports filed, vault record counts.
   - Visual SVG metric charts and incident moderation table.

8. **18 Complete Responsive Pages**
   - Landing Page, Login, Signup, Dashboard, Emergency SOS, My Location, Nearby Help, Trusted Contacts, Incident Reporting, Evidence Vault, AI Safety Assistant, Safety Map, Emergency History, Profile & Settings, Privacy & Security, Help Resources, Admin Dashboard, and 404 Page.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS v4, Lucide Icons, React Router DOM v7
- **Mapping**: Leaflet, React-Leaflet, OpenStreetMap Tile API, Nominatim Reverse Geocoding
- **Storage**: LocalStorage (Settings & Contacts), IndexedDB (`dbService.js` for Evidence Vault)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`) + Offline Safety Knowledge Rule Engine
- **Web APIs**: Geolocation API, Web Share API, Web Audio API (Siren Synthesizer), MediaRecorder API (Audio Evidence)

---

## 🚀 Local Installation & Setup

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/nariraksha.git
cd nariraksha
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

To enable Google Gemini API support for the AI Assistant, add your key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key
```
*Note: If no API key is provided, NariRaksha automatically uses its intelligent offline safety engine so the app remains 100% functional out-of-the-box.*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Web-Only Limitations & Disclaimers

NariRaksha enforces strict transparency regarding browser capabilities:
- **No Automatic Emergency Dialing**: Browsers cannot place phone calls without user interaction. All phone calls use standard `tel:` links.
- **No Background GPS Tracking**: Browser Geolocation API functions only when the user grants explicit permission and the tab is active.
- **Not a Police Service**: NariRaksha is a web support tool. It does not replace dialing **112** or official emergency dispatchers.

---

## 🛡️ Demo Credentials

Toggle **DEMO MODE** anytime in the top banner.

- **User Login**: `priya@example.com` / `Password123!` (Role: User)
- **Admin Login**: `admin@nariraksha.gov.in` / `AdminSecure99!` (Role: Admin)

---

## 📄 License

MIT License — Built for public safety and empowerment.
