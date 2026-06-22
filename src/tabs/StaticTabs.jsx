import React, { useState, useEffect } from 'react';
import { 
  User, ShieldCheck, Ticket, Activity, Check, Copy, Star, Crown, Gift, 
  Zap, Headphones, Send, Clock, ArrowRight, Smartphone, Mail, ShieldAlert 
} from 'lucide-react';

// Unified Premium Luxury Shared Style Configurations
const cardStyle = {
  background: 'linear-gradient(145deg, rgba(15, 20, 32, 0.75) 0%, rgba(4, 5, 9, 0.98) 100%)',
  backdropFilter: 'blur(30px)',
  padding: '32px 24px',
  borderRadius: '28px',
  border: '1px solid rgba(212, 163, 89, 0.18)',
  color: '#fff',
  boxShadow: '0 30px 70px rgba(0, 0, 0, 0.55)',
  boxSizing: 'border-box'
};

const titleStyle = { 
  color: '#fff', margin: '0 0 6px 0', fontSize: '20px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.5px'
};

const mutedStyle = { color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: '0 0 28px 0' };

// Central Animation Repository
const AnimationStyle = () => (
  <style>{`
    @keyframes tabContentFadeIn { 
      0% { opacity: 0; transform: translateY(20px) scale(0.98); filter: blur(4px); } 
      100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } 
    }
    @keyframes glowSpike { 
      0%, 100% { border-color: rgba(212,163,89,0.18); box-shadow: 0 0 0px rgba(212,163,89,0); } 
      50% { border-color: rgba(212,163,89,0.5); box-shadow: 0 0 20px 2px rgba(212,163,89,0.12); } 
    }
    @keyframes signalRadar {
      0% { transform: scale(0.95); opacity: 1; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes microShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .tab-animate-container {
      animation: tabContentFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .premium-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .coupons-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(290px, 1fr)); gap: 20px; }
    
    @media (max-width: 1024px) { 
      .premium-grid { grid-template-columns: 1fr; gap: 20px; } 
    }

    .interactive-coupon-card {
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .interactive-coupon-card:hover {
      transform: translateY(-6px) scale(1.01);
      border-color: #d4a359 !important;
      box-shadow: 0 15px 35px rgba(212, 163, 89, 0.08) !important;
    }

    .radar-dot::after {
      content: '';
      position: absolute; width: 100%; height: 100%; top: 0; left: 0;
      background: inherit; borderRadius: '50%';
      animation: signalRadar 1.8s infinite cubic-bezier(0.25, 0, 0, 1);
    }

    .shimmer-text {
      background: linear-gradient(90deg, #fff, #d4a359, #fff);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: microShimmer 3s linear infinite;
    }
  `}</style>
);

// ── 1. IDENTITY MATRIX TAB ──────────────────────────────────────────────────
export const UserProfileTab = () => {
  return (
    <div style={cardStyle} className="tab-animate-container">
      <AnimationStyle />
      <h3 style={titleStyle}>
        <User style={{ color: '#d4a359' }} size={24} /> IDENTITY PROFILE MATRIX
      </h3>
      <p style={mutedStyle}>
        User Signature Stream verified. Access privileges matched to <strong style={{ color: '#d4a359' }}>Platinum Tier Core Loyalty</strong> status.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { label: 'Security Key', value: 'SEC-CORE-99X7' },
          { label: 'Last Connection', value: '17 Jun 2026 via Terminal' },
        ].map((info, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', borderRadius: '14px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>{info.label}</div>
            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600' }}>{info.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── 2. VIP PREMIUM TIERS TAB ─────────────────────────────────────────────
export const PremiumTab = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    { id: 'S', tier: 'Silver Elite', price: '₹499/mo', desc: 'Entry-level premium processing protocols.', perks: ['Priority Booking Engine Access', '10% flat discount on baseline items', 'Free automated scheduler queue slots'], label: 'Essential Pack' },
    { id: 'G', tier: 'Gold Prestige', price: '₹999/mo', desc: 'Enhanced saturation pipelines for regular workflows.', perks: ['Advanced Priority Routing', '20% flat tracking deductions', 'Complimentary chemical hair wash sessions', 'Dedicated Stylist Allocation'], label: 'Most Popular' },
    { id: 'P', tier: 'Platinum Sovereign', price: '₹1,999/mo', desc: 'Ultimate infrastructure luxury allocation tier.', perks: ['Absolute Zero-Queue Priority', '30% flat reduction matrix lines', 'Unlimited Free Premium Home Deliveries', '24/7 Priority Helpdesk Streaming Callouts'], label: 'VIP Ultimate' }
  ];

  return (
    <div style={cardStyle} className="tab-animate-container">
      <AnimationStyle />
      <h3 style={titleStyle}>
        <ShieldCheck style={{ color: '#d4a359' }} size={24} /> VIP MEMBERSHIP SECTIONS
      </h3>
      <p style={mutedStyle}>
        Unlocks continuous lane routing, algorithmic discounts, and priority streaming responses inside our physical grooming lounges.
      </p>
      
      <div className="premium-grid">
        {plans.map((t) => {
          const isHovered = hoveredCard === t.id;
          const isPlatinum = t.id === 'P';
          return (
            <div 
              key={t.id} 
              onMouseEnter={() => setHoveredCard(t.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: isPlatinum ? 'linear-gradient(145deg, rgba(212,163,89,0.12) 0%, rgba(10,14,26,0.95) 100%)' : 'rgba(255,255,255,0.02)', 
                border: isHovered || isPlatinum ? '1px solid #d4a359' : '1px solid rgba(255,255,255,0.06)',
                padding: '24px', 
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isHovered ? 'translateY(-6px)' : 'none',
                animation: isPlatinum ? 'glowSpike 4s infinite ease-in-out' : 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', background: 'rgba(212,163,89,0.15)', color: '#d4a359', padding: '4px 8px', borderRadius: '6px', fontWeight: '800', textTransform: 'uppercase' }}>{t.label}</span>
                  {isPlatinum && <Crown size={16} style={{ color: '#d4a359' }} />}
                </div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: '800', color: '#fff' }}>{t.tier}</h4>
                <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748b' }}>{t.desc}</p>
                <div style={{ color: '#d4a359', fontWeight: '900', fontSize: '26px', marginBottom: '20px', letterSpacing: '-0.5px' }}>{t.price}</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                  {t.perks.map((p, index) => (
                    <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '12px', color: '#cbd5e1' }}>
                      <Check size={14} style={{ color: '#d4a359', flexShrink: 0, marginTop: '2px' }} />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button style={{
                width: '100%', padding: '12px', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer',
                background: isPlatinum ? 'linear-gradient(135deg, #e5b869 0%, #b38238 100%)' : 'rgba(255,255,255,0.06)',
                color: isPlatinum ? '#000' : '#fff',
                marginTop: '20px', transition: 'all 0.2s'
              }}>
                Activate VIP Pass
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── 3. OFFERS & COUPONS TAB (HIGH ENHANCED MATRIX INTERFACE) ─────────────────
export const OffersTab = () => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [tickerTime, setTickerTime] = useState({ mins: 42, secs: 18 });

  // Real-time ticking effect simulation for vouchers urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerTime(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { mins: prev.mins - 1, secs: 59 };
        return { mins: 59, secs: 59 }; // Cycle reset
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const coupons = [
    { code: 'KOVAI2026', discount: '15% FLAT REDUCTION', desc: 'Valid across premium hair styling procedures and spa configurations.', type: 'General Pack', claims: '84% Claimed' },
    { code: 'STUDENT199', discount: 'FREE COMBO UPGRADE', desc: 'Exclusive validation tier matching college identities.', type: 'Student Exclusive', claims: 'ONLY 3 SLOTS LEFT' },
    { code: 'BRIDALGLOW', discount: '₹500 SURGE DISCOUNT', desc: 'Applies directly to pre-booked wedding packages and full makeovers.', type: 'Elite Premium', claims: 'High Demand' },
    { code: 'FESTIVEZAP', discount: '25% SURGE VALUE', desc: 'Limited runtime dynamic coupon matrix execution.', type: 'Flash Offer', claims: 'Expiring Fast' }
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div style={cardStyle} className="tab-animate-container">
      <AnimationStyle />
      
      {/* Top Banner Row with Live Urgency Timer Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '6px' }}>
        <h3 style={{ ...titleStyle, margin: 0 }}>
          <Ticket style={{ color: '#d4a359' }} size={24} /> ACTIVE REWARDS & DISCOUNT CODES
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '6px 12px', borderRadius: '12px' }}>
          <Clock size={13} style={{ color: '#ef4444' }} />
          <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: '800', fontFamily: 'monospace' }}>
            FLASH SYNC INDEX EXPIRY: {tickerTime.mins}m {tickerTime.secs}s
          </span>
        </div>
      </div>
      <p style={mutedStyle}>Click on any active voucher profile node below to automatically copy configurations directly onto backend ledgers.</p>
      
      <div className="coupons-grid">
        {coupons.map((o) => {
          const isCopied = copiedCode === o.code;
          return (
            <div 
              key={o.code} 
              onClick={() => handleCopy(o.code)}
              className="interactive-coupon-card"
              style={{
                background: 'rgba(5, 7, 12, 0.4)',
                border: '1px dashed rgba(212,163,89,0.3)', 
                borderRadius: '18px', padding: '22px', cursor: 'pointer',
                position: 'relative', overflow: 'hidden',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
              }}
            >
              {/* Dynamic decorative corner element */}
              <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(212,163,89,0.06)', padding: '4px 10px', borderBottomLeftRadius: '10px', fontSize: '9px', color: '#d4a359', fontWeight: '700', textTransform: 'uppercase' }}>
                {o.claims}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.04)', padding: '3px 8px', borderRadius: '5px', color: '#94a3b8', fontWeight: '700', border: '1px solid rgba(255,255,255,0.02)' }}>{o.type}</span>
                  <Gift size={15} style={{ color: '#d4a359' }} />
                </div>
                
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#d4a359', letterSpacing: '-0.3px', marginBottom: '6px', display:'flex', alignItems:'center', gap:'6px' }}>
                  <Zap size={14} fill="#d4a359" /> {o.discount}
                </div>
                <p style={{ margin: '0 0 20px 0', color: '#cbd5e1', fontSize: '12px', lineHeight: '1.5' }}>{o.desc}</p>
              </div>

              {/* Dynamic Interactive Copy Bar Trigger */}
              <div style={{
                background: isCopied ? 'rgba(16, 185, 129, 0.08)' : '#070a10', 
                padding: '12px', borderRadius: '10px', 
                border: isCopied ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.02)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '800', color: isCopied ? '#34d399' : '#fff', letterSpacing: '0.5px' }}>{o.code}</span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: isCopied ? '#34d399' : '#d4a359', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {isCopied ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={12} />}
                  {isCopied ? 'COPIED CONFIG!' : 'COPY CODE'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── 4. SUPPORT TELEMETRY TAB (INTERACTIVE HELP CENTER SYSTEM) ───────────────
export const SupportTab = () => {
  // Ticket interactive submission form states
  const [ticketMsg, setTicketMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketStatus, setTicketStatus] = useState(null);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketMsg.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketStatus('SUCCESS');
      setTicketMsg('');
      setTimeout(() => setTicketStatus(null), 4000);
    }, 1500);
  };

  return (
    <div style={cardStyle} className="tab-animate-container">
      <AnimationStyle />
      <h3 style={titleStyle}>
        <Activity style={{ color: '#d4a359' }} size={24} /> HELPDESK SUPPORT TERMINAL
      </h3>
      <p style={mutedStyle}>Active system support pipelines listening live for telemetry data & styling configuration parameters.</p>
      
      {/* Structural Two-Column Grid For Support Core Metrics + Interactive Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Left Side: Live Connection Channels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#d4a359', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Secure Core Gateways</div>
          {[
            { label: 'Hotline Core Channel', value: '+91 98765 43210', icon: <Smartphone size={16} /> },
            { label: 'Secure Email Gateway', value: 'support@kovaisalon.in', icon: <Mail size={16} /> },
            { label: 'Operational Sync Window', value: '9 AM – 9 PM, Mon–Sat', icon: <Clock size={16} /> },
          ].map((item, idx) => (
            <div 
              key={idx} 
              style={{
                background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)',
                padding: '16px 20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', gap: '12px', transition: 'all 0.25s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,163,89,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#d4a359', background: 'rgba(212,163,89,0.06)', padding: '10px', borderRadius: '12px' }}>
                  {item.icon}
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>{item.label}</span>
                  <span style={{ color: '#fff', fontSize: '13.5px', fontWeight: '700', marginTop: '3px', display: 'block', wordBreak: 'break-all' }}>{item.value}</span>
                </div>
              </div>
              
              {/* Animated Live Status Radar Dot */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="radar-dot" style={{ position: 'relative', width: '7px', height: '7px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }} />
                <span style={{ fontSize: '9px', color: '#10b981', fontWeight: '800', letterSpacing: '0.3px' }}>LIVE</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: New Interactive Live Ticket Uplink Form */}
        <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(212,163,89,0.12)', padding: '20px', borderRadius: '18px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Headphones size={15} style={{ color: '#d4a359' }} />
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Instant Telemetry Uplink</span>
          </div>
          <p style={{ margin: '0 0 14px 0', fontSize: '11.5px', color: '#64748b', lineHeight: '1.4' }}>Have queries regarding bookings or custom transformations? Broadcast an encrypted ping directly to response units.</p>
          
          <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
            <textarea
              value={ticketMsg}
              onChange={(e) => setTicketMsg(e.target.value)}
              placeholder="Type encryption telemetry parameters or message here..."
              required
              disabled={isSubmitting}
              style={{
                width: '100%', background: '#05070a', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px', padding: '12px', color: '#fff', fontSize: '12.5px',
                resize: 'none', height: '80px', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#d4a359'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.06)'}
            />

            <button
              type="submit"
              disabled={isSubmitting || !ticketMsg.trim()}
              style={{
                background: isSubmitting ? '#0f172a' : 'linear-gradient(135deg, #fce1b4 0%, #d4a359 100%)',
                border: 'none', padding: '12px', borderRadius: '10px', color: isSubmitting ? '#475569' : '#000',
                fontWeight: '900', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px',
                cursor: (!ticketMsg.trim() || isSubmitting) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s', opacity: (!ticketMsg.trim() || isSubmitting) ? 0.5 : 1
              }}
            >
              {isSubmitting ? 'Transmitting Ping...' : <><span>Initialize Support Stream</span> <Send size={12} /></>}
            </button>
          </form>

          {/* Ticket Response Alert Feedback Block */}
          {ticketStatus === 'SUCCESS' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', padding: '10px 12px', borderRadius: '10px', marginTop: '12px' }}>
              <ShieldAlert size={14} style={{ color: '#10b981' }} />
              <span style={{ fontSize: '11px', color: '#34d399', fontWeight: '700' }}>Ping received! Signal routing operator response within 15m.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};