import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, RefreshCw, Cpu } from 'lucide-react';

// Point this at wherever your backend is running.
// Local dev: http://localhost:5000
// Deployed (Render/Railway/Vercel): replace with your live backend URL.
const API_BASE_URL = process.env.REACT_APP_API_URL || process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5000';

const readJsonResponse = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(text.trim().startsWith('<') ? 'Backend returned HTML instead of JSON. Check backend port 5000.' : 'Backend returned invalid JSON.');
  }
};
// One stable session id per browser tab so the backend can keep conversation context.
const SESSION_ID = (() => {
  let id = sessionStorage.getItem('salon_ai_session_id');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).slice(2) + Date.now();
    sessionStorage.setItem('salon_ai_session_id', id);
  }
  return id;
})();

const AiAssistantTab = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hello! I am your Kovai Salon AI Assistant. Ask me anything about salon bookings, hair care, skin care, pricing, offers, or general questions. I will answer clearly in English.',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const streamEndRef = useRef(null);

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userQuery = inputValue.trim();
    if (!userQuery || isTyping) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: userQuery }]);
    setInputValue('');
    setIsTyping(true);
    setErrorBanner('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000);

      const response = await fetch(`${API_BASE_URL}/api/ai-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery, sessionId: SESSION_ID }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await readJsonResponse(response);

      if (data.success) {
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: data.reply }]);
      } else {
        // Backend responded but flagged an issue (e.g. missing API key, rate limit)
        setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: data.reply || 'Something went wrong. Please try again.' }]);
      }
    } catch (err) {
      setErrorBanner(err.name === 'AbortError' ? 'Assistant took too long. Try a shorter question.' : 'Could not reach the AI server. Make sure the backend is running and reachable.');
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: err.name === 'AbortError' ? 'Assistant took too long. Please try a shorter question.' : "Network error - I couldn't reach the server. Please check that the backend is running and try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const QUICK_QUESTIONS = [
    'Best salons near RS Puram?',
    'Haircut price range?',
    'Bridal package details?',
    'Hair fall treatment options?',
  ];

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #070b14 0%, #020306 100%)',
        height: 'calc(100vh - 160px)',
        maxHeight: '650px',
        borderRadius: '24px',
        border: '1px solid rgba(226, 179, 110, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: '#fff',
        boxShadow: '0 30px 70px rgba(0,0,0,0.7)',
        animation: 'slideUpMain 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <style>{`
        @keyframes slideUpMain { from { opacity: 0; transform: translateY(25px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes waveSlideIn { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes pulseGlowAvatar { 0%, 100% { box-shadow: 0 0 4px rgba(226, 179, 110, 0.2); border-color: rgba(226, 179, 110, 0.2); } 50% { box-shadow: 0 0 18px rgba(226, 179, 110, 0.7); border-color: rgba(226, 179, 110, 0.6); } }
        @keyframes fluidBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .entry-bubble-animated { animation: waveSlideIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
        .avatar-glow-active { animation: pulseGlowAvatar 2s infinite ease-in-out; }
        .spin-icon { animation: spin 1s linear infinite; }

        .scrollable-stream::-webkit-scrollbar { width: 5px; }
        .scrollable-stream::-webkit-scrollbar-thumb { background: linear-gradient(#e2b36e, #b45309); border-radius: 10px; }

        @media (max-width: 768px) {
          .salon-ai-header { padding: 14px 16px !important; }
          .salon-ai-header h3 { font-size: 13px !important; }
          .salon-ai-stream { padding: 16px !important; gap: 16px !important; }
          .salon-ai-bubble { max-width: 88% !important; font-size: 13px !important; padding: 12px 16px !important; }
          .salon-ai-form { padding: 14px !important; }
          .salon-ai-form input { padding: 14px !important; font-size: 13px !important; }
          .salon-ai-quick { padding: 0 16px 10px !important; }
        }
      `}</style>

      {/* HEADER */}
      <div
        className="salon-ai-header"
        style={{
          padding: '20px 24px',
          background: 'rgba(0,0,0,0.4)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            className="avatar-glow-active"
            style={{ background: '#090e1a', padding: '12px', borderRadius: '16px', color: '#e2b36e', border: '1px solid rgba(226, 179, 110, 0.3)' }}
          >
            <Bot size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '15.5px', fontWeight: '800', letterSpacing: '0.5px' }}>KOVAI SALON AI ASSISTANT</h3>
            <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', marginTop: '3px' }}>
              <span style={{ width: '7px', height: '7px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
              CONNECTED — READY TO HELP
            </span>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(226,179,110,0.08)',
            padding: '6px 14px',
            borderRadius: '30px',
            border: '1px solid rgba(226,179,110,0.25)',
            fontSize: '11px',
            color: '#e2b36e',
            fontWeight: '700',
          }}
        >
          <Cpu size={12} /> AI Online
        </div>
      </div>

      {/* ERROR BANNER */}
      {errorBanner && (
        <div
          style={{
            background: 'rgba(239,68,68,0.1)',
            borderBottom: '1px solid rgba(239,68,68,0.3)',
            color: '#fca5a5',
            fontSize: '12px',
            padding: '10px 20px',
          }}
        >
          ⚠️ {errorBanner}
        </div>
      )}

      {/* CHAT STREAM */}
      <div
        className="scrollable-stream salon-ai-stream"
        style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px', background: 'rgba(0,0,0,0.15)' }}
      >
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className="entry-bubble-animated"
              style={{
                display: 'flex',
                justifyContent: isBot ? 'flex-start' : 'flex-end',
                alignItems: 'flex-start',
                gap: '14px',
                maxWidth: '85%',
                alignSelf: isBot ? 'flex-start' : 'flex-end',
              }}
            >
              {isBot && (
                <div
                  style={{
                    background: 'rgba(226, 179, 110, 0.12)',
                    padding: '10px',
                    borderRadius: '50%',
                    color: '#e2b36e',
                    border: '1px solid rgba(226, 179, 110, 0.2)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={13} />
                </div>
              )}

              <div
                className="salon-ai-bubble"
                style={{
                  padding: '15px 20px',
                  borderRadius: isBot ? '4px 22px 22px 22px' : '22px 22px 4px 22px',
                  background: isBot ? '#111726' : 'linear-gradient(135deg, rgba(226, 179, 110, 0.2) 0%, rgba(180, 83, 9, 0.04) 100%)',
                  border: isBot ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(226, 179, 110, 0.4)',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  color: isBot ? '#cbd5e1' : '#fff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                  whiteSpace: 'pre-line',
                }}
              >
                {msg.text}
              </div>

              {!isBot && (
                <div
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '10px',
                    borderRadius: '50%',
                    color: '#94a3b8',
                    border: '1px solid rgba(255,255,255,0.08)',
                    marginTop: '2px',
                    flexShrink: 0,
                  }}
                >
                  <User size={13} />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '48px', fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
            <div style={{ display: 'flex', gap: '5px', background: '#111726', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ width: '6px', height: '6px', background: '#e2b36e', borderRadius: '50%', animation: 'fluidBounce 0.8s infinite 0.1s' }} />
              <span style={{ width: '6px', height: '6px', background: '#e2b36e', borderRadius: '50%', animation: 'fluidBounce 0.8s infinite 0.3s' }} />
              <span style={{ width: '6px', height: '6px', background: '#e2b36e', borderRadius: '50%', animation: 'fluidBounce 0.8s infinite 0.5s' }} />
            </div>
            <span style={{ fontStyle: 'italic', color: '#526175' }}>Thinking...</span>
          </div>
        )}
        <div ref={streamEndRef} />
      </div>

      {/* QUICK QUESTIONS */}
      <div className="salon-ai-quick" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '0 24px 14px' }}>
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setInputValue(q)}
            style={{
              background: 'rgba(226,179,110,0.08)',
              border: '1px solid rgba(226,179,110,0.25)',
              color: '#e2b36e',
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form
        className="salon-ai-form"
        onSubmit={handleSendMessage}
        style={{ padding: '20px 24px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '14px', alignItems: 'center' }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isTyping}
          placeholder={isTyping ? 'Waiting for response...' : 'Ask anything in English - salon, hair, skin, or general questions...'}
          style={{
            flex: 1,
            background: '#04060b',
            color: '#fff',
            border: '1px solid rgba(226, 179, 110, 0.35)',
            padding: '18px',
            borderRadius: '16px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.3s',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            opacity: isTyping ? 0.6 : 1,
            minWidth: 0,
          }}
        />
        <button
          type="submit"
          disabled={isTyping || !inputValue.trim()}
          style={{
            background: isTyping || !inputValue.trim() ? '#161e2e' : 'linear-gradient(135deg, #e2b36e 0%, #b45309 100%)',
            color: isTyping || !inputValue.trim() ? '#475569' : '#03050a',
            border: 'none',
            height: '54px',
            width: '56px',
            flexShrink: 0,
            borderRadius: '16px',
            cursor: isTyping || !inputValue.trim() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            boxShadow: isTyping || !inputValue.trim() ? 'none' : '0 6px 20px rgba(226, 179, 110, 0.3)',
          }}
        >
          {isTyping ? <RefreshCw size={20} className="spin-icon" /> : <Send size={20} />}
        </button>
      </form>
    </div>
  );
};

export default AiAssistantTab;

