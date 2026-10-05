import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  PhoneCall,
  MapPin,
  Users,
  Lock,
  Bot,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Eye,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { useSOS } from '../contexts/SOSContext';

export const LandingPage = () => {
  const { startSOSCountdown } = useSOS();

  const features = [
    {
      icon: PhoneCall,
      title: 'One-Tap Emergency SOS',
      desc: 'Instant emergency mode activation preparing GPS coordinates, quick helplines (112, 181), audio siren tone, and trusted contact broadcast.',
      color: 'text-red-500 bg-red-500/10'
    },
    {
      icon: MapPin,
      title: 'Precise Location Sharing',
      desc: 'Real-time browser geolocation coordinates with Nominatim reverse geocoding and standard Web Share API integration.',
      color: 'text-blue-500 bg-blue-500/10'
    },
    {
      icon: Users,
      title: 'Priority Trusted Contacts',
      desc: 'Manage family and emergency contacts with one-tap calling (`tel:`) and pre-filled emergency SMS/WhatsApp location alerts.',
      color: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      icon: Bot,
      title: 'AI Safety Guidance & Classifier',
      desc: 'Google Gemini powered safety advice and real-time situational risk level classification (Low, Medium, High attention).',
      color: 'text-indigo-500 bg-indigo-500/10'
    },
    {
      icon: Lock,
      title: 'Encrypted Evidence Vault',
      desc: 'Store ambient audio recordings, photos, videos, and legal notes locally inside client-side IndexedDB with strict privacy.',
      color: 'text-purple-500 bg-purple-500/10'
    },
    {
      icon: Shield,
      title: 'Nearby Help & OpenStreetMap',
      desc: 'Locate 24/7 police stations, hospital trauma centers, and verified Sakhi women shelters around your location.',
      color: 'text-amber-500 bg-amber-500/10'
    }
  ];

  const faqs = [
    {
      q: 'Does NariRaksha replace calling 112 or police emergency services?',
      a: 'No. NariRaksha is a web-based safety utility tool designed to help you quickly organize emergency information, share your location, and trigger calls. Web browsers cannot automatically dispatch police without user interaction. Always dial 112 directly in life-threatening situations.'
    },
    {
      q: 'How does NariRaksha protect my location privacy?',
      a: 'Your location is accessed only when you explicitly grant browser permission. Location coordinates are used on your device to display maps and prepare share links. We do not continuously track you after closing the browser.'
    },
    {
      q: 'Does the AI Safety Assistant replace professional legal advice?',
      a: 'No. The AI Safety Assistant provides general situational safety guidelines and de-escalation tips. It does not replace legal representation, medical care, or emergency services.'
    },
    {
      q: 'Can I use NariRaksha on any smartphone without installing an app?',
      a: 'Yes! NariRaksha is built as a Progressive Web Application (PWA). It works seamlessly in modern web browsers on Android, iOS, tablets, and desktop computers.'
    }
  ];

  return (
    <div className="space-y-20 pb-16">

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">

        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

          {/* Tag Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-blue-300 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>AI-Assisted Women's Safety & Emergency Platform</span>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              NariRaksha
            </h1>
            <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-300 to-slate-200 bg-clip-text text-transparent">
              "Your safety. Your control. Help when you need it."
            </p>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              A trustworthy, privacy-first web platform empowering women with instant location sharing, trusted contact alerts, nearby emergency resource mapping, and AI safety guidance.
            </p>
          </div>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">

            {/* Controlled Emergency Trigger Button */}
            <button
              onClick={startSOSCountdown}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:scale-95 border border-red-400 animate-sos-pulse"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>TEST EMERGENCY SOS</span>
            </button>

            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-base border border-slate-700 transition-colors"
            >
              How It Works
            </a>

          </div>

          {/* Emergency Helplines Strip */}
          <div className="pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-3">
              Direct National Helplines (Tap to Call)
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:112"
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 font-bold text-xs flex items-center gap-1.5 hover:bg-red-500/20 transition-colors"
              >
                <span>Police / National Emergency:</span>
                <strong className="text-white text-sm">112</strong>
              </a>
              <a
                href="tel:181"
                className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-500/20 transition-colors"
              >
                <span>Women Helpline:</span>
                <strong className="text-white text-sm">181</strong>
              </a>
              <a
                href="tel:1091"
                className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-xs flex items-center gap-1.5 hover:bg-blue-500/20 transition-colors"
              >
                <span>Women Distress:</span>
                <strong className="text-white text-sm">1091</strong>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How NariRaksha Works
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Simple, reliable 3-step workflow designed for high-stress situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xl">
              1
            </div>
            <h3 className="font-bold text-lg text-slate-900">Configure Trusted Contacts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Add your family, friends, or trusted individuals with primary priorities. Set up quick SMS and WhatsApp dispatch templates.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-black text-xl">
              2
            </div>
            <h3 className="font-bold text-lg text-slate-900">Activate Emergency Mode</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Click the SOS button anywhere in the platform to prepare live GPS coordinates, turn on loud audio sirens, and trigger helpline links.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-xl">
              3
            </div>
            <h3 className="font-bold text-lg text-slate-900">Locate Help & Record Evidence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              View nearby police stations, hospitals, and shelters on OpenStreetMap while recording ambient audio directly to your private vault.
            </p>
          </div>
        </div>
      </section>

      {/* Key Safety Features Grid */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Designed for Speed, Safety & Privacy
            </h2>
            <p className="text-slate-400 text-sm">
              Comprehensive tools built specifically to operate within modern web browser standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 space-y-3 hover:border-slate-600 transition-colors">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-white">{feat.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transparency & Browser Limitations Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-amber-950">
                Transparent Web Capabilities & Disclaimers
              </h3>
              <p className="text-xs text-amber-800">
                NariRaksha enforces strict transparency. We do not make false claims.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-amber-900 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Phone Calls:</strong> Standard <code className="bg-amber-100 px-1 py-0.5 rounded">tel:</code> protocols launch your device dialer for 112 and 181.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Location Sharing:</strong> Uses official Web Geolocation API with explicit browser permission.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Evidence Vault:</strong> Client-side IndexedDB stores audio recordings securely on your device.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>No Background Tracking:</strong> Web browsers do not allow continuous GPS tracking after closing the tab.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about NariRaksha.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 space-y-2 shadow-sm">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
