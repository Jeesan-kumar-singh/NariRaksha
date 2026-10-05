// AI Safety Assistant & Risk Classifier Service (Gemini API + Offline Fallback)

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Pre-defined safety rulebook for offline fallback
const FALLBACK_SAFETY_KNOWLEDGE = [
  {
    keywords: ['following', 'stalker', 'stalking', 'behind me', 'walk alone', 'dark street', 'scared', 'chasing'],
    riskLevel: 'HIGH',
    title: 'Possible Stalking / Suspected Danger',
    advice: [
      'Do not go home directly if you believe someone is tailing you.',
      'Head immediately toward a well-lit, populated public area (open store, fuel station, police booth).',
      'Call a trusted contact or 112 immediately and keep them on speaker.',
      'Make your presence known and look around confidently; do not look isolated.',
      'If in immediate physical danger, enter the nearest commercial building and inform security.'
    ]
  },
  {
    keywords: ['cab', 'taxi', 'uber', 'auto', 'driver', 'wrong route', 'rickshaw', 'ride'],
    riskLevel: 'MEDIUM',
    title: 'Transit & Vehicle Safety Caution',
    advice: [
      'Share your live trip details or current map location with your trusted emergency contacts.',
      'Call a friend or family member and speak aloud about your route and vehicle registration number.',
      'Politely ask the driver to stick to the standard GPS route.',
      'If the driver refuses to stop or strays significantly, call 112 immediately and stay near the door window.'
    ]
  },
  {
    keywords: ['harass', 'harassment', 'workplace', 'touch', 'verbal', 'abuse', 'teasing', 'eve teasing', 'office'],
    riskLevel: 'MEDIUM',
    title: 'Harassment & Safety Rights',
    advice: [
      'Your physical boundaries and dignity are protected by law.',
      'Firmly and loudly tell the individual to back off: "Stop this immediately."',
      'Document every incident: note date, exact time, location, witness names, and messages.',
      'File a complaint with your Internal Complaints Committee (ICC) or National Commission for Women helpline (181).',
      'You can also log an incident report directly in your NariRaksha Evidence Vault for reference.'
    ]
  },
  {
    keywords: ['domestic', 'violence', 'home', 'threat', 'abuse at home', 'partner', 'beaten', 'husband', 'relative'],
    riskLevel: 'HIGH',
    title: 'Domestic Abuse & Crisis Support',
    advice: [
      'Your safety and well-being are paramount. You are not alone.',
      'Contact National Women Helpline 181 (available 24/7, confidential, free).',
      'Keep your emergency bag, identity documents, and trusted contact details accessible.',
      'Reach out to local Sakhi One Stop Centers or accredited shelter homes for immediate protection.'
    ]
  }
];

export const getAISafetyResponse = async (userPrompt) => {
  const cleanPrompt = userPrompt.toLowerCase().trim();

  // If Gemini API Key exists, call Google Gemini 1.5/2.0 API
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are NariRaksha AI, a calm, empowering, and highly practical women's safety expert. Keep your advice focused on immediate physical safety, non-confrontational de-escalation, reaching safe public places, and dialing official emergency helplines (112 or 181). Never pretend to replace police or medical professionals. Format response with clear bullet points.\n\nUser Question: ${userPrompt}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) return { text: reply, source: 'gemini_api' };
      }
    } catch (err) {
      console.warn('Gemini API request failed, falling back to local safety rules:', err);
    }
  }

  // Offline / Smart Fallback Engine
  const matched = FALLBACK_SAFETY_KNOWLEDGE.find(item =>
    item.keywords.some(kw => cleanPrompt.includes(kw))
  );

  if (matched) {
    return {
      text: `### ${matched.title}\n\nHere are safety guidelines for your situation:\n\n` +
        matched.advice.map(step => `• ${step}`).join('\n\n') +
        `\n\n*Emergency Reminders:* Dial **112** for emergency police/medical or **181** for Women's Helpline immediately if in imminent danger.`,
      source: 'offline_safety_engine',
      riskLevel: matched.riskLevel
    };
  }

  // General default safety guide response
  return {
    text: `### General Personal Safety Advice\n\n` +
      `1. **Stay Alert & Aware:** Keep your head up, stay aware of surrounding exit points, and avoid distraction on dark paths.\n` +
      `2. **Share Location:** Use the NariRaksha **Share Location** feature to send your GPS coordinates to family or trusted contacts.\n` +
      `3. **Head to Public Zones:** Move quickly toward open stores, hotels, petrol pumps, or populated areas.\n` +
      `4. **Emergency Services:** Always contact official emergency services (112) or Women Helpline (181) for immediate help.`,
    source: 'offline_safety_engine',
    riskLevel: 'LOW'
  };
};

export const classifyRiskLevel = async (situationText) => {
  const text = situationText.toLowerCase();

  let level = 'LOW ATTENTION';
  let badgeColor = 'green';
  let score = 25;

  const highTriggers = ['following me', 'chasing', 'threatened', 'weapon', 'trapped', 'attacked', 'breaking in', 'scared for life', 'blood', 'forced'];
  const mediumTriggers = ['dark street', 'isolated', 'stranger asking', 'suspicious cab', 'arguments', 'uncomfortable', 'lost path', 'night alone', 'following at distance'];

  if (highTriggers.some(t => text.includes(t))) {
    level = 'HIGH ATTENTION';
    badgeColor = 'red';
    score = 85;
  } else if (mediumTriggers.some(t => text.includes(t))) {
    level = 'MEDIUM ATTENTION';
    badgeColor = 'amber';
    score = 55;
  }

  return {
    level,
    badgeColor,
    score,
    analysis: text.length > 5 ? `Situation evaluated based on situational vulnerability and environmental signals.` : `Standard baseline safety check.`,
    recommendedActions: level === 'HIGH ATTENTION'
      ? [
          'Move into the nearest open shop or populated building immediately.',
          'Call Emergency Response 112 directly.',
          'Alert your primary trusted contact via NariRaksha location share.',
          'Prepare your phone camera / audio recording.'
        ]
      : level === 'MEDIUM ATTENTION'
      ? [
          'Change your walking pace or cross to the opposite well-lit sidewalk.',
          'Call a trusted contact and maintain active call conversation.',
          'Check nearby safe locations on the NariRaksha map.',
          'Keep your hand near your phone emergency trigger.'
        ]
      : [
          'Maintain situational awareness and keep your phone charged.',
          'Verify your emergency contact numbers are up to date.',
          'Share your ETA with family when traveling late.'
        ]
  };
};
