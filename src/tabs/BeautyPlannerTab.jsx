import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Wallet, Sparkle, 
  Map, ShoppingBag, Landmark, CheckSquare, Clock 
} from 'lucide-react';

const BeautyPlannerTab = () => {
  const [beautyGoal, setBeautyGoal] = useState('Wedding Preparation');
  const [eventDate, setEventDate] = useState('2026-07-20');
  const [remainingDays, setRemainingDays] = useState(35);
  const [budget, setBudget] = useState(10000);
  const [skinType, setSkinType] = useState('Oily');
  const [hairType, setHairType] = useState('Straight');
  const [hairConcern, setHairConcern] = useState('Hair Fall');
  const [isGenerated, setIsGenerated] = useState(false);

  const [progress, setProgress] = useState({
    facial: true,
    hairSpa: true,
    makeupTrial: false,
    finalSession: false
  });

  useEffect(() => {
    const today = new Date();
    const target = new Date(eventDate);
    const difference = target.getTime() - today.getTime();
    const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setRemainingDays(days > 0 ? days : 0);
  }, [eventDate]);

  const getServicesAndProducts = () => {
    let baseServices = [
      { name: 'Deep Cleansing Facial', cost: 1200, day: 'Day 1', booking: '10 June' },
      { name: 'Advanced Hair Spa', cost: 1500, day: 'Day 10', booking: '18 June' },
      { name: 'Premium Brightening Treatment', cost: 2500, day: 'Day 20', booking: '25 June' }
    ];

    let products = ['Sunscreen SPF 50'];

    if (skinType === 'Oily') products.push('Salicylic Acid Cleanser');
    else if (skinType === 'Dry') products.push('Hyaluronic Acid Serum');
    else products.push('Vitamin C Serum');

    if (hairConcern === 'Hair Fall') products.push('Anti-Hairfall Rosemary Oil');
    else if (hairConcern === 'Dandruff') products.push('Ketoconazole Anti-Dandruff Shampoo');
    else products.push('Deep Hydration Hair Mask');

    if (beautyGoal === 'Wedding Preparation' || beautyGoal === 'Photoshoot') {
      baseServices.push({ name: 'HD Makeup & Hair Trial', cost: 3500, day: 'Day 28', booking: '05 July' });
      baseServices.push({ name: 'Final Luxury Bridal Makeup', cost: 8000, day: 'Day 35', booking: '20 July' });
    } else {
      baseServices.push({ name: 'Glow Boost Express Session', cost: 2000, day: 'Day 14', booking: '12 July' });
    }

    const totalCost = baseServices.reduce((sum, item) => sum + item.cost, 0);
    if (totalCost > budget) {
      return {
        services: baseServices.filter(s => s.cost <= budget / 1.5),
        products,
        total: baseServices.filter(s => s.cost <= budget / 1.5).reduce((sum, item) => sum + item.cost, 0)
      };
    }

    return { services: baseServices, products, total: totalCost };
  };

  const { services, products, total } = getServicesAndProducts();
  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercentage = (completedCount / Object.keys(progress).length) * 100;

  return (
    <div className="planner-outer-wrap" style={{ padding: '20px', background: '#05070c', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box' }}>
      
      <style>{`
        @keyframes subtleGlow {
          0% { box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 0px rgba(212,163,89,0); }
          50% { box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 15px rgba(212,163,89,0.1); }
          100% { box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 0px rgba(212,163,89,0); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes pulseDot {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.4; }
          100% { transform: scale(1); opacity: 1; }
        }
        .card-hover {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .card-hover:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(212,163,89,0.5) !important;
          background: rgba(20,24,38,0.95) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.4) !important;
        }
        .btn-glow {
          transition: all 0.3s ease !important;
        }
        .btn-glow:hover {
          transform: scale(1.02) !important;
          box-shadow: 0 0 25px rgba(229,184,105,0.45) !important;
        }
        
        .main-split-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 35px;
        }
        .sub-grid-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .budget-button-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .epidermal-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        .progress-checker-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 992px) {
          .main-split-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 600px) {
          .planner-outer-wrap {
            padding: 8px !important;
          }
          .main-planner-card {
            padding: 24px 14px !important;
            border-radius: 20px !important;
          }
          .sub-grid-inputs, .budget-button-row, .progress-checker-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .epidermal-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .header-area {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
        }
      `}</style>

      <div className="main-planner-card" style={{
        background: 'linear-gradient(145deg, rgba(16,20,30,0.9) 0%, rgba(6,8,12,0.98) 100%)',
        backdropFilter: 'blur(24px)', 
        borderRadius: '28px', 
        padding: '40px',
        border: '1px solid rgba(212,163,89,0.2)',
        color: '#fff',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '1150px',
        width: '100%',
        animation: 'subtleGlow 6s infinite ease-in-out',
        boxSizing: 'border-box'
      }}>
        
        {/* HEADER AREA */}
        <div className="header-area" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '25px' }}>
          <div>
            <h3 style={{ color: '#d4a359', margin: 0, display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: '900', letterSpacing: '1px' }}>
              <Sparkles size={28} style={{ color: '#e5b869' }} /> ANALYTICAL BEAUTY PLANNER
            </h3>
            <p style={{ margin: '5px 0 0 0', color: '#6b7280', fontSize: '12px' }}>AI-driven treatment vectors and optimization matrix</p>
          </div>
          {remainingDays > 0 && (
            <div style={{ background: 'rgba(229,184,105,0.12)', border: '1px solid rgba(229,184,105,0.3)', padding: '10px 20px', borderRadius: '30px', fontSize: '13px', color: '#e5b869', fontWeight: '800', letterSpacing: '0.5px' }}>
              ⏳ {remainingDays} DAYS TO GO
            </div>
          )}
        </div>

        {/* MAIN SPLIT GRID LAYOUT */}
        <div className="main-split-layout">
          
          {/* LEFT SECTION */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <div className="card-hover" style={{ background: 'rgba(3,4,7,0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#e5b869', letterSpacing: '1.2px', fontWeight: '700' }}>01. STRATEGIC PURPOSE & TIMELINE</h4>
              <div className="sub-grid-inputs">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>BEAUTY GOAL</label>
                  <select value={beautyGoal} onChange={e => { setBeautyGoal(e.target.value); setIsGenerated(false); }} style={inputStyle}>
                    <option>Wedding Preparation</option>
                    <option>Party Look</option>
                    <option>Photoshoot</option>
                    <option>Corporate Grooming</option>
                    <option>Skin Glow</option>
                    <option>Hair Transformation</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>EVENT TARGET DATE</label>
                  <input type="date" value={eventDate} onChange={e => { setEventDate(e.target.value); setIsGenerated(false); }} style={inputStyle} />
                </div>
              </div>
            </div>

            <div className="card-hover" style={{ background: 'rgba(3,4,7,0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#e5b869', letterSpacing: '1.2px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
                <Wallet size={15} /> 02. ALLOCATED BUDGET CAP
              </h4>
              <div className="budget-button-row">
                {[2000, 5000, 10000, 25000].map((amt) => (
                  <button key={amt} onClick={() => { setBudget(amt); setIsGenerated(false); }} 
                    style={{
                      padding: '12px 5px', borderRadius: '10px', border: budget === amt ? '1px solid #e5b869' : '1px solid rgba(255,255,255,0.06)',
                      background: budget === amt ? 'rgba(229,184,105,0.15)' : '#0c0f16', color: budget === amt ? '#e5b869' : '#cbd5e1',
                      fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}>
                    ₹{amt}{amt === 25000 ? '+' : ''}
                  </button>
                ))}
              </div>
            </div>

            <div className="card-hover" style={{ background: 'rgba(3,4,7,0.4)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#e5b869', letterSpacing: '1.2px', fontWeight: '700' }}>03. DIAGNOSTIC PARAMETERS</h4>
              
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>EPIDERMAL SKIN TYPE</label>
                <div className="epidermal-grid">
                  {['Oily', 'Dry', 'Combination', 'Sensitive'].map(skin => (
                    <button key={skin} onClick={() => { setSkinType(skin); setIsGenerated(false); }} style={skin === skinType ? activeRadioStyle : radioStyle}>{skin}</button>
                  ))}
                </div>
              </div>

              <div className="sub-grid-inputs">
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>HAIR PROFILE</label>
                  <select value={hairType} onChange={e => { setHairType(e.target.value); setIsGenerated(false); }} style={inputStyle}>
                    <option>Straight</option>
                    <option>Curly</option>
                    <option>Wavy</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>HAIR CONCERN</label>
                  <select value={hairConcern} onChange={e => { setHairConcern(e.target.value); setIsGenerated(false); }} style={inputStyle}>
                    <option>Hair Fall</option>
                    <option>Dandruff</option>
                    <option>Dry Hair</option>
                  </select>
                </div>
              </div>
            </div>

            <button className="btn-glow" onClick={() => setIsGenerated(true)} style={{
              width: '100%', padding: '18px', background: 'linear-gradient(135deg, #e5b869 0%, #b38238 100%)',
              border: 'none', borderRadius: '14px', fontWeight: '900', cursor: 'pointer', color: '#05070c',
              fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 6px 20px rgba(229,184,105,0.2)'
            }}>
              ⚡ COMPUTE BEAUTY MATRIX
            </button>
          </div>

          {/* RIGHT SECTION: OUTPUT LAYOUT */}
          <div style={{ 
            background: 'rgba(3,4,7,0.25)', padding: '24px', borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column', 
            justifyContent: isGenerated ? 'flex-start' : 'center', minHeight: '400px', boxSizing: 'border-box'
          }}>
            {!isGenerated ? (
              <div style={{ textAlign: 'center', color: '#4b5563', animation: 'slideUpFade 0.4s ease' }}>
                <Sparkle size={48} style={{ color: 'rgba(212,163,89,0.15)', marginBottom: '16px', animation: 'pulseDot 2s infinite' }} />
                <p style={{ fontSize: '14px', fontWeight: '500', maxWidth: '300px', margin: '0 auto', lineHeight: '1.5' }}>Configure structural properties to compile personalized workflow streams.</p>
              </div>
            ) : (
              <div style={{ animation: 'slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                
                {/* Progress Tracking Widget */}
                <div style={{ marginBottom: '28px', background: 'rgba(12,15,22,0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '10px', fontWeight: '700' }}>
                    <span style={{ color: '#d4a359', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckSquare size={15}/> JOURNEY PROGRESS TRACKER</span>
                    <span style={{ color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '6px' }}>{Math.round(progressPercentage)}% COMPLETED</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden', marginBottom: '15px' }}>
                    <div style={{ width: `${progressPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #d4a359, #10b981)', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                  </div>
                  <div className="progress-checker-grid">
                    {Object.keys(progress).map((task) => (
                      <label key={task} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: progress[task] ? '#10b981' : '#9ca3af', cursor: 'pointer', padding: '6px', borderRadius: '6px', transition: 'background 0.2s' }}>
                        <input type="checkbox" checked={progress[task]} onChange={() => setProgress({...progress, [task]: !progress[task]})} style={{ accentColor: '#10b981', transform: 'scale(1.1)' }} />
                        {task.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Timeline Roadmap Layout */}
                <div style={{ marginBottom: '28px' }}>
                  <h5 style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#e5b869', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' }}><Map size={15}/> 04. SEQUENTIAL ROADMAP TIMELINE</h5>
                  <div style={{ borderLeft: '2px solid rgba(212,163,89,0.2)', paddingLeft: '20px', marginLeft: '6px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {services.map((srv, index) => (
                      <div key={index} style={{ position: 'relative', animation: `slideUpFade 0.3s ease-out ${index * 0.1}s backward` }}>
                        <div style={{ 
                          position: 'absolute', width: '10px', height: '10px', background: '#e5b869', 
                          borderRadius: '50%', left: '-26px', top: '4px', boxShadow: '0 0 10px #e5b869',
                          animation: 'pulseDot 2s infinite' 
                        }}></div>
                        <div style={{ fontSize: '11px', color: '#e5b869', fontWeight: '800', textTransform: 'uppercase', marginBottom: '2px' }}>{srv.day}</div>
                        <div style={{ fontSize: '14px', color: '#f3f4f6', fontWeight: '600' }}>{srv.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Product Suggestions */}
                <div style={{ marginBottom: '28px' }}>
                  <h5 style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#e5b869', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' }}><ShoppingBag size={15}/> 05. TOPICAL COMPOUND MATRIX</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {products.map((prod, i) => (
                      <span key={i} style={{ background: 'rgba(212,163,89,0.04)', border: '1px solid rgba(212,163,89,0.15)', padding: '8px 14px', borderRadius: '12px', fontSize: '12px', color: '#e2e8f0', fontWeight: '500' }}>
                        ✨ {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cost Estimation */}
                <div style={{ background: 'linear-gradient(135deg, rgba(229,184,105,0.05) 0%, rgba(16,185,129,0.02) 100%)', border: '1px solid rgba(212,163,89,0.2)', padding: '20px', borderRadius: '16px' }}>
                  <h5 style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#e5b869', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' }}><Landmark size={15}/> 06. BUDGET SYNC & AUTO-BOOKING</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '12px' }}>
                    {services.map((srv, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1' }}>
                        <span>{srv.name} <span style={{ color: '#6b7280', fontSize: '11px' }}>({srv.booking})</span></span>
                        <span style={{ fontWeight: '600', color: '#fff' }}>₹{srv.cost}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#9ca3af', fontWeight: '700', letterSpacing: '0.5px' }}>AGGREGATED REVENUE MATRIX</div>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: '#e5b869', marginTop: '2px' }}>
                        ₹{total} <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '4px', marginLeft: '4px' }}>✓ Optimized</span>
                      </div>
                    </div>
                    <button className="btn-glow" onClick={() => alert('All sequences scheduled successfully! 📆')} style={{
                      background: '#10b981', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '10px',
                      fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
                      boxShadow: '0 4px 14px rgba(16,185,129,0.3)', letterSpacing: '0.5px', flex: '1 1 auto', justifyContent: 'center'
                    }}>
                      <Clock size={15}/> Auto Book Sequences
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%', background: '#0c0f16', border: '1px solid rgba(255,255,255,0.08)',
  padding: '12px 14px', borderRadius: '10px', color: '#fff', fontSize: '12px',
  fontWeight: '500', outline: 'none', marginTop: '6px', boxSizing: 'border-box'
};

const radioStyle = {
  background: '#0c0f16', border: '1px solid rgba(255,255,255,0.06)', padding: '12px',
  borderRadius: '10px', color: '#9ca3af', fontSize: '12px', cursor: 'pointer',
  fontWeight: '600', transition: 'all 0.2s'
};

const activeRadioStyle = {
  ...radioStyle, background: 'rgba(212,163,89,0.15)', border: '1px solid #d4a359', color: '#e5b869',
};

export default BeautyPlannerTab;