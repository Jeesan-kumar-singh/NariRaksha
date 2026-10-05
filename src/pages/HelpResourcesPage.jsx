import React, { useState } from 'react';
import { PhoneCall, Shield, FileText, ExternalLink, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

export const HelpResourcesPage = () => {
  const [activeGuideTab, setActiveGuideTab] = useState('helplines');

  const helplines = [
    { title: 'National Emergency Response System', number: '112', desc: 'Police, Fire, Ambulance & Integrated Emergency Response.', category: 'Police / Medical' },
    { title: 'National Women Helpline (NCW)', number: '181', desc: '24/7 Toll-Free helpline for women in distress, domestic abuse, & rescue.', category: 'Women Helpline' },
    { title: 'Women In Distress Cell', number: '1091', desc: 'Special police cell for women safety and immediate patrolling.', category: 'Women Protection' },
    { title: 'National Commission for Women (NCW)', number: '7827170170', desc: 'WhatsApp & Telephonic helpline for reporting harassment & legal aid.', category: 'Legal Aid' },
    { title: 'Childline Emergency Support', number: '1098', desc: '24/7 free assistance for minors and young women in distress.', category: 'Child Safety' }
  ];

  const legalRights = [
    {
      title: 'Right to File Zero FIR',
      desc: 'A woman has the legal right to lodge a "Zero FIR" at any police station regardless of where the incident occurred. The police station cannot refuse registration on territorial jurisdiction grounds.'
    },
    {
      title: 'Right to Confidentiality & Identity Protection',
      desc: 'Section 228A of Indian Penal Code protects the identity of victims of sexual harassment/assault. Names and identity details cannot be publicly published.'
    },
    {
      title: 'Right to Virtual / Home Statement Recording',
      desc: 'Under Section 160 of CrPC, a woman cannot be called to the police station for interrogation. Her statement must be recorded at her residence in the presence of female police officers or family.'
    },
    {
      title: 'Right to Free Legal Aid',
      desc: 'Under the Legal Services Authorities Act, all women are entitled to free legal assistance regardless of income status.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div>
        <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
          Emergency Knowledge Base
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Helplines & Legal Safety Resources
        </h1>
        <p className="text-xs text-slate-500">
          Essential 24/7 helplines, Sakhi shelter contacts, legal rights summary, and personal safety guidelines.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-white p-1 border border-slate-200 shadow-sm max-w-md text-xs font-bold">
        <button
          onClick={() => setActiveGuideTab('helplines')}
          className={`flex-1 py-2.5 rounded-xl transition-all ${
            activeGuideTab === 'helplines' ? 'bg-slate-900 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Helplines Directory
        </button>
        <button
          onClick={() => setActiveGuideTab('rights')}
          className={`flex-1 py-2.5 rounded-xl transition-all ${
            activeGuideTab === 'rights' ? 'bg-blue-600 text-white shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Legal Rights Guide
        </button>
      </div>

      {/* Helplines Directory */}
      {activeGuideTab === 'helplines' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helplines.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                <a
                  href={`tel:${item.number}`}
                  className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm flex items-center gap-1.5 shadow-md shrink-0"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{item.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legal Rights Guide */}
      {activeGuideTab === 'rights' && (
        <div className="space-y-4">
          {legalRights.map((right, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600 shrink-0" />
                <span>{right.title}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-7">{right.desc}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
