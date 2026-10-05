import React, { useState, useEffect } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { Bot, Sparkles, AlertTriangle, Send, PhoneCall, Share2, Shield, AlertOctagon, CheckCircle2, RefreshCw } from 'lucide-react';
import { getAISafetyResponse, classifyRiskLevel } from '../services/geminiService';
import { useSOS } from '../contexts/SOSContext';
import { useLocation } from '../contexts/LocationContext';

export const AIAssistantPage = () => {
  const routerLoc = useRouterLocation();
  const initialPrompt = routerLoc.state?.initialPrompt || '';

  const { startSOSCountdown } = useSOS();
  const { location } = useLocation();

  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'risk'

  // Chat State
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Hello, I am your NariRaksha AI Safety Guide. I am here to provide calm, practical safety advice, de-escalation tips, and help you locate emergency resources. How can I support you right now?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputQuery, setInputQuery] = useState(initialPrompt);
  const [isThinking, setIsThinking] = useState(false);

  // Risk Classifier State
  const [situationText, setSituationText] = useState('I am walking home alone and noticed someone following me at a distance.');
  const [riskResult, setRiskResult] = useState(null);
  const [isAnalyzingRisk, setIsAnalyzingRisk] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, []);

  const handleSendMessage = async (textToSend) => {
    const prompt = textToSend || inputQuery;
    if (!prompt.trim()) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: prompt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      const response = await getAISafetyResponse(prompt);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        source: response.source,
        riskLevel: response.riskLevel,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI error:', err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleRunRiskAssessment = async (e) => {
    e.preventDefault();
    if (!situationText.trim()) return;

    setIsAnalyzingRisk(true);
    const result = await classifyRiskLevel(situationText);
    setRiskResult(result);
    setIsAnalyzingRisk(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 rounded-3xl text-white border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-300" />
            <span>AI Safety Advisory Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            NariRaksha AI Safety Assistant
          </h1>
          <p className="text-xs text-slate-300">
            Real-time safety recommendations, situational de-escalation, and risk level classification.
          </p>
        </div>

        {/* Quick Actions Panel Bar */}
        <div className="flex items-center gap-2">
          <a
            href="tel:112"
            className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 112</span>
          </a>
          <a
            href="tel:181"
            className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call 181</span>
          </a>
        </div>
      </div>

      {/* Tabs Selector: Chat vs Risk Classifier */}
      <div className="flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm max-w-md mx-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'chat'
              ? 'bg-slate-900 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>Safety Chat Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('risk')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'risk'
              ? 'bg-indigo-600 text-white shadow-sm font-extrabold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>AI Risk Classifier</span>
        </button>
      </div>

      {/* TAB 1: Chat Assistant */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col h-[600px]">

          {/* Chat Messages Log */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                  msg.sender === 'user' ? 'bg-blue-600' : 'bg-indigo-600'
                }`}>
                  {msg.sender === 'user' ? 'You' : <Bot className="w-5 h-5" />}
                </div>

                <div className={`rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-none'
                }`}>
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>
                  <div className={`text-[10px] text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex items-center gap-2 text-xs text-indigo-600 font-bold p-3 bg-indigo-50 rounded-2xl max-w-xs">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>NariRaksha AI processing safety advice...</span>
              </div>
            )}
          </div>

          {/* Quick Action Shortcuts Bar inside Chat */}
          <div className="bg-slate-100 px-4 py-2 border-t border-slate-200 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-500 text-[11px]">Quick Action Shortcuts:</span>
            <button
              onClick={() => handleSendMessage('I think someone is following me. What steps should I take?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 font-semibold"
            >
              "Someone is following me"
            </button>
            <button
              onClick={() => handleSendMessage('What are my rights if harassed in a public place?')}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 font-semibold"
            >
              "Public harassment rights"
            </button>
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-white border-t border-slate-200 flex gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask any safety question or describe your situation..."
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isThinking || !inputQuery.trim()}
              className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* TAB 2: AI Risk Classifier */}
      {activeTab === 'risk' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">Situational Risk Level Classifier</h3>
            <p className="text-xs text-slate-500">
              Describe a real-world scenario to receive an automated safety attention score and recommended steps.
            </p>
          </div>

          <form onSubmit={handleRunRiskAssessment} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Describe Your Current Situation</label>
              <textarea
                value={situationText}
                onChange={(e) => setSituationText(e.target.value)}
                rows={3}
                className="w-full p-4 rounded-2xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Walking alone on a dimly lit street, noticed a vehicle slowing down next to me."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isAnalyzingRisk}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              {isAnalyzingRisk ? (
                <span>Analyzing situation...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Risk & Get Recommendations</span>
                </>
              )}
            </button>
          </form>

          {/* Risk Results Card */}
          {riskResult && (
            <div className={`p-6 rounded-3xl border space-y-4 animate-in fade-in duration-300 ${
              riskResult.level === 'HIGH ATTENTION'
                ? 'bg-red-50 border-red-200 text-red-950'
                : riskResult.level === 'MEDIUM ATTENTION'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider opacity-70">
                    AI Situation Assessment
                  </span>
                  <h4 className="text-2xl font-black">{riskResult.level}</h4>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black">{riskResult.score}/100</span>
                  <p className="text-[10px] font-semibold opacity-70">Attention Index</p>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200/60 pt-3">
                <h5 className="font-bold text-xs">Recommended Safety Steps:</h5>
                <ul className="space-y-1 text-xs">
                  {riskResult.recommendedActions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-white/80 text-[11px] text-slate-600 border border-slate-200">
                <strong>AI Disclaimer:</strong> Risk classification is generated for informational guidance only. If you believe you are in immediate physical danger, contact emergency services (112) immediately.
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
