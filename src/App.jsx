// ============================================================
//  App.jsx  —  The Ultimate Cinematic 3D Luxury Salon Lounge
//  CRITICAL FIX: Total Lockout of Background image_45494c.png Leakage
// ============================================================

import React, { useState, useEffect } from 'react';
import { Scissors, Sparkles, Crown, Wind, Gem, Award } from 'lucide-react';
import DashboardLayout from './DashboardLayout';

const frontPageBgImage    = '/front-bg.png';
const salonDashboardBgImage = '/salon-bg.png';

const FULL_TITLE = 'Welcome to Our Coimbatore Salon';
const FULL_SUB   = 'Experience the epitome of luxury grooming and bespoke styling. Your premium transformation journey begins right behind these doors.';

export default function App() {
  const [stage, setStage]   = useState('welcome-matte'); 
  const [isShearing, setIsShearing]   = useState(false);
  const [showFlash,  setShowFlash]    = useState(false);
  const [showSlash,  setShowSlash]    = useState(false);

  // Cinema Typewriter Engine
  const [typedTitle, setTypedTitle]         = useState('');
  const [typedSub,   setTypedSub]           = useState('');
  const [showEnterBtn, setShowEnterBtn]     = useState(false);

  // Heavy Scissors Strike
  const launchScissors = (e) => {
    e.preventDefault();
    setIsShearing(true);
    
    setTimeout(() => setShowSlash(true), 150);
    setTimeout(() => setShowFlash(true), 250);
    
    setTimeout(() => {
      setStage('door-opening');
      setIsShearing(false);
      setShowFlash(false);
      setShowSlash(false);
    }, 850); 
  };

  // Cinematic Reveal Typewriter
  useEffect(() => {
    if (stage !== 'door-opening') return;
    setTypedTitle('');
    setTypedSub('');
    setShowEnterBtn(false);

    const start = setTimeout(() => {
      let ti = 0;
      let titleBuf = '';
      const titleTick = setInterval(() => {
        if (ti < FULL_TITLE.length) {
          titleBuf += FULL_TITLE[ti++];
          setTypedTitle(titleBuf);
        } else {
          clearInterval(titleTick);
          let si = 0;
          let subBuf = '';
          const subTick = setInterval(() => {
            if (si < FULL_SUB.length) {
              subBuf += FULL_SUB[si++];
              setTypedSub(subBuf);
            } else {
              clearInterval(subTick);
              setShowEnterBtn(true);
            }
          }, 8); 
        }
      }, 12);
    }, 1200); 

    return () => clearTimeout(start);
  }, [stage]);

  if (stage === 'dashboard-active') return <DashboardLayout />;

  return (
    <>
      <style>{`
        body { margin:0; background:#010203; color:#f3f4f6; font-family:'Inter',system-ui,sans-serif; overflow-x:hidden; }

        /* ULTRA DYNAMIC 3D KEN BURNS BG ENGINE */
        .bg-slider-wrapper {
          position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; z-index: 1;
        }
        .bg-slider-img {
          position: absolute; 
          top: -5%; left: -5%; width: 110%; height: 110%;
          background-size: cover; 
          background-position: center center;
          background-repeat: no-repeat;
          animation: megaCinematicPan 24s infinite alternate ease-in-out;
        }
        @keyframes megaCinematicPan {
          0% { transform: scale(1) translate(0, 0) rotate(0deg); filter: brightness(0.55) contrast(1); }
          33% { transform: scale(1.06) translate(1.5%, -1%) rotate(0.4deg); filter: brightness(0.65) contrast(1.08); }
          66% { transform: scale(1.03) translate(-1%, 2%) rotate(-0.3deg); filter: brightness(0.5) contrast(0.95); }
          100% { transform: scale(1.08) translate(0, -1.5%) rotate(0.5deg); filter: brightness(0.6) contrast(1.02); }
        }

        /* Gold Shimmer Flare Overlay layers */
        .ambient-gold-lens-front {
          position: absolute; inset: 0; z-index: 2; pointer-events: none;
          background: radial-gradient(circle at 30% 20%, rgba(212,163,89,0.18) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, rgba(212,163,89,0.12) 0%, transparent 60%);
          mix-blend-mode: color-dodge;
        }

        /* Gold Dust Floating Grid */
        .dust-overlay {
          position:absolute; inset:0;
          background:url('https://www.transparenttextures.com/patterns/stardust.png');
          opacity:0.28; pointer-events:none; z-index: 3;
          animation:dustDrift 16s infinite linear;
          filter: sepia(1) saturate(2.2) hue-rotate(12deg);
        }
        @keyframes dustDrift { 0%{background-position:0 0} 100%{background-position:500px 500px} }

        /* Floating Luxury Instrument Icons */
        .instrument-badge {
          position:absolute; background: linear-gradient(135deg, rgba(22,17,11,0.95), rgba(4,5,7,0.99)); 
          backdrop-filter:blur(20px); border:1px solid rgba(212,163,89,0.45); 
          width:56px; height:56px; border-radius:18px;
          display:flex; align-items:center; justify-content:center; color: #d4a359;
          box-shadow:0 20px 45px rgba(0,0,0,0.85), inset 0 0 10px rgba(212,163,89,0.2);
          z-index:4;
        }
        .float-1 { animation: luxuryFloat1 6s ease-in-out infinite alternate; }
        .float-2 { animation: luxuryFloat2 8s ease-in-out infinite alternate; }
        .float-3 { animation: luxuryFloat3 7s ease-in-out infinite alternate; }

        @keyframes luxuryFloat1 { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-25px) translateX(12px) rotate(15deg); } }
        @keyframes luxuryFloat2 { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-18px) translateX(-15px) rotate(-15deg); } }
        @keyframes luxuryFloat3 { 0% { transform: translateY(0) rotate(0deg); } 100% { transform: translateY(-30px) translateX(8px) rotate(25deg); } }

        /* Centered Core Layout Wrapper */
        .center-stage-container {
          position: relative; z-index: 5;
          width: 100%; max-width: 500px;
          display: flex; align-items: center; justify-content: center;
          box-sizing: border-box;
        }

        /* Optimized Welcome Card Design */
        .login-wrap {
          width:100%; border-radius:32px; padding:1.5px;
          background:linear-gradient(135deg, #d4a359 0%, rgba(212,163,89,0.08) 50%, rgba(212,163,89,0.55) 100%);
          box-shadow:0 50px 120px rgba(0,0,0,0.96), 0 0 50px rgba(212,163,89,0.12);
          animation:cardEntrance 1.2s cubic-bezier(0.16,1,0.3,1) forwards;
          box-sizing: border-box;
        }
        @keyframes cardEntrance { 0%{opacity:0;transform:scale(0.96) translateY(35px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        
        .login-card {
          background:linear-gradient(140deg, rgba(12,9,6,0.94) 0%, rgba(4,5,6,0.98) 90%);
          backdrop-filter:blur(25px); padding:50px 40px; border-radius:30px;
          text-align:center; border:1px solid rgba(212,163,89,0.04);
          box-shadow:inset 0 0 45px rgba(212,163,89,0.1);
          box-sizing: border-box;
        }
        .hero-text {
          font-size:40px; font-weight:900; letter-spacing:8px; line-height:1.25;
          background:linear-gradient(135deg, #ffffff 20%, #d4a359 75%, #9c7336 100%);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          margin-bottom:20px;
        }
        
        .launch-btn {
          background:linear-gradient(135deg, #fde7c4 0%, #d4a359 50%, #825718 100%);
          color:#010203; border:none; padding:20px 50px; border-radius:14px;
          font-weight:900; cursor:pointer; text-transform:uppercase;
          letter-spacing:3px; font-size:12.5px; width: 100%; max-width: 300px;
          box-shadow:0 18px 45px rgba(212,163,89,0.4);
          transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .launch-btn:hover { transform: scale(1.03) translateY(-2px); box-shadow:0 25px 55px rgba(212,163,89,0.55); }

        /* Scissors Snip Overlay Layers */
        .scissors-overlay {
          position:fixed; inset:0; z-index:999999;
          background:rgba(1,2,3,0.98); backdrop-filter:blur(30px);
          display:flex; align-items:center; justify-content:center;
        }
        .shear-wrap { position:relative; width:450px; height:450px; display:flex; align-items:center; justify-content:center; }
        .blade-top    { position:absolute; transform-origin:158px 165px; animation:snipTop 0.45s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .blade-bottom { position:absolute; transform-origin:158px 165px; animation:snipBottom 0.45s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes snipTop    { 0%{transform:rotate(-85deg)} 75%{transform:rotate(4deg)} 100%{transform:rotate(0deg)} }
        @keyframes snipBottom { 0%{transform:rotate(80deg)}  75%{transform:rotate(-4deg)} 100%{transform:rotate(0deg)} }
        
        .scissors-slash {
          position: absolute; width: 200%; height: 8px; background: linear-gradient(90deg, transparent, #ffffff, #d4a359, transparent);
          transform: rotate(-28deg) scaleX(0); z-index: 98;
          animation: slashPass 0.35s ease-out forwards 0.18s;
          box-shadow: 0 0 30px #d4a359;
        }
        @keyframes slashPass { 0% { transform: rotate(-28deg) scaleX(0); opacity: 1; } 100% { transform: rotate(-28deg) scaleX(1); opacity: 0; } }

        .flash {
          position:absolute; width:450px; height:450px;
          background:radial-gradient(circle at center, #ffffff 0%, #d4a359 45%, transparent 75%);
          border-radius:50%; mix-blend-mode:screen; z-index:99;
          animation:burstImpact 0.45s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes burstImpact { 0%{transform:scale(0);opacity:1} 100%{transform:scale(4.2);opacity:0;filter:blur(10px)} }


        /* 3D THEATRICAL ENHANCED GATE SYSTEM */
        .door-scene {
          position:fixed; inset:0; z-index:99995; background:#010103;
          display:flex; align-items:center; justify-content:center; 
          perspective:2800px;
          padding: 20px; box-sizing: border-box; overflow: hidden;
        }
        
        /* [FIX FOR image_45494c.png]: STRICT INITIAL LOCKOUT UNTIL DOORS FULLY SWING OPEN */
        .reveal-bg-bright {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          z-index: 1;
          
          /* Start completely dead-invisible so bottom star design cannot leak through lines */
          opacity: 0;
          visibility: hidden;
          
          /* Activates beautifully exactly when gates are wide open */
          animation: brightReveal 5.5s cubic-bezier(0.16,1,0.3,1) forwards 0.7s;
        }
        @keyframes brightReveal {
          0% { opacity: 0; visibility: visible; transform: scale(1.15); filter: blur(20px) brightness(0.15); }
          15% { opacity: 1; filter: blur(15px) brightness(0.4); }
          100% { opacity: 1; visibility: visible; transform: scale(1); filter: blur(0px) brightness(0.9) contrast(1.05); }
        }
        
        .ambient-gold-lens {
          position:absolute; inset:0; z-index:2; pointer-events:none;
          background: radial-gradient(circle at center, rgba(212,163,89,0.2) 0%, transparent 75%);
        }

        /* CORE CONTENT CARD — Hidden during closed state */
        .tw-card {
          position:relative; z-index:5; 
          background:linear-gradient(180deg, rgba(12,15,25,0.92) 0%, rgba(3,4,5,0.99) 100%);
          backdrop-filter:blur(40px); border:1px solid rgba(212,163,89,0.55);
          width:100%; max-width:580px; padding:55px 40px; border-radius:32px;
          text-align:center; box-shadow:0 60px 120px rgba(0,0,0,0.98), 0 0 50px rgba(212,163,89,0.12);
          box-sizing: border-box;
          
          opacity: 0;
          transform: translateY(30px) scale(0.96);
          filter: blur(12px);
          animation: cinemaCardReveal 1.8s cubic-bezier(0.16,1,0.3,1) forwards 0.9s;
        }
        @keyframes cinemaCardReveal { 
          0% { opacity:0; transform:translateY(30px) scale(0.96); filter: blur(12px); } 
          100% { opacity:1; transform:translateY(0) scale(1); filter: blur(0px); } 
        }

        /* MANOR GATES — Completely covers the dashboard background elements initially */
        .door-left, .door-right {
          position:absolute; top:0; width:50%; height:100%; 
          z-index:50;
          background: linear-gradient(145deg, #131720 0%, #030406 100%);
          border-color: #d4a359; display:flex; align-items:center;
          box-sizing: border-box;
          box-shadow: inset 0 0 100px rgba(0,0,0,0.95);
        }
        .door-left {
          left:0; border-right:4.5px solid #d4a359;
          transform-origin: left center;
          animation: ultra3DLeft 2.8s cubic-bezier(0.76, 0, 0.175, 1) forwards 0.1s;
          justify-content:flex-end;
          box-shadow: inset -45px 0 75px rgba(0,0,0,0.95), 20px 0 40px rgba(212,163,89,0.25);
        }
        .door-right {
          right:0; border-left:4.5px solid #d4a359;
          transform-origin: right center;
          animation: ultra3DRight 2.8s cubic-bezier(0.76, 0, 0.175, 1) forwards 0.1s;
          justify-content:flex-start;
          box-shadow: inset 30px 0 75px rgba(0,0,0,0.95), -20px 0 40px rgba(212,163,89,0.25);
        }
        
        @keyframes ultra3DLeft  { 
          0%   { transform: rotateY(0deg) scale(1); opacity: 1; } 
          30%  { filter: brightness(1.35) drop-shadow(0 0 25px rgba(212,163,89,0.35)); } 
          100% { transform: rotateY(-128deg) scale(0.82); opacity: 0; pointer-events: none; visibility: hidden; } 
        }
        @keyframes ultra3DRight { 
          0%   { transform: rotateY(0deg) scale(1); opacity: 1; } 
          30%  { filter: brightness(1.35) drop-shadow(0 0 25px rgba(212,163,89,0.35)); } 
          100% { transform: rotateY(128deg) scale(0.82); opacity: 0; pointer-events: none; visibility: hidden; } 
        }

        .door-label {
          font-size:120px; font-weight:900; color:rgba(212,163,89,0.25);
          text-shadow: 0 0 35px rgba(212,163,89,0.4);
          user-select: none;
        }

        .enter-btn {
          margin-top:30px; width: 100%; max-width: 300px;
          background:linear-gradient(135deg, #fde7c4 0%, #d4a359 100%);
          color:#010203; border:none; padding:18px 40px; border-radius:12px;
          font-weight:900; font-size:13px; letter-spacing:3px;
          text-transform:uppercase; cursor:pointer; box-sizing: border-box;
          animation:luxuryPulse 2s infinite alternate; transition: all 0.25s;
        }
        .enter-btn:hover { transform: translateY(-2px); box-shadow:0 20px 45px rgba(212,163,89,0.55); }

        @keyframes luxuryPulse {
          0%  {box-shadow:0 15px 30px rgba(212,163,89,0.3)}
          100%{box-shadow:0 15px 45px rgba(212,163,89,0.65)}
        }

        /* PHONE AND TABLET RESPONSIVE RESTRUCTURING */
        @media (max-width: 768px) {
          .center-stage-container { max-width: 88%; }
          .login-card { 
            padding: 35px 20px; 
            border-radius: 26px;
            background: linear-gradient(140deg, rgba(12,9,6,0.85) 0%, rgba(4,5,6,0.94) 100%); 
          }
          .hero-text { font-size: 28px; letter-spacing: 4px; margin-bottom: 14px; }
          .launch-btn { padding: 16px 35px; font-size: 11.5px; width: 100%; }
          
          .instrument-badge { display: none !important; } 
          .shear-wrap { transform: scale(0.6); }
          
          .tw-card { 
            padding: 35px 20px; 
            border-radius: 26px; 
            max-width: 90%;
            background: linear-gradient(180deg, rgba(13,17,28,0.86) 0%, rgba(3,4,5,0.96) 100%);
          }
          .tw-card h2 { font-size: 22px !important; min-height: 32px !important; }
          .tw-card p { font-size: 13.5px !important; line-height: 1.6 !important; }
          .door-label { font-size: 75px !important; }
          .enter-btn { padding: 16px 30px; font-size: 12px; }
        }
      `}</style>

      {/* ===== STAGE 1: CINEMATIC WELCOME MATTE ===== */}
      {stage === 'welcome-matte' && (
        <div style={{
          position:'fixed', inset:0,
          display:'flex', alignItems:'center', justifyContent:'center', zIndex:9990, padding:'16px', boxSizing:'border-box'
        }}>
          {/* Ken Burns Front Background */}
          <div className="bg-slider-wrapper">
            <div className="bg-slider-img" style={{ backgroundImage: `url(${frontPageBgImage})` }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(1,2,3,0.05) 0%, rgba(1,2,3,0.88) 85%)' }} />
          </div>

          <div className="ambient-gold-lens-front" />
          <div className="dust-overlay" />

          {/* Floating Luxury Badges */}
          {[
            [<Scissors size={22} />, 'top:18%;left:16%;', 'float-1'],
            [<Wind size={22} />, 'top:62%;left:13%;', 'float-2'],
            [<Crown size={22} />, 'bottom:18%;left:18%;', 'float-3'],
            [<Gem size={22} />, 'top:15%;right:17%;', 'float-1'],
            [<Award size={22} />, 'top:58%;right:14%;', 'float-2'],
            [<Sparkles size={22} />, 'bottom:20%;right:19%;', 'float-3'],
          ].map(([icon, pos, floatClass], i) => (
            <div key={i} className={`instrument-badge ${floatClass}`} style={Object.fromEntries(
              pos.split(';').filter(Boolean).map(p => {
                const [k,v] = p.split(':');
                return [k.trim(), v.trim()];
              })
            )}>{icon}</div>
          ))}

          {/* PERFECTLY CENTERED CARD FOR ALL SCREEN SIZES */}
          <div className="center-stage-container">
            <div className="login-wrap">
              <div className="login-card">
                <div style={{ color:'#d4a359', margin:'0 auto 16px auto', width:'fit-content' }}>
                  <Crown size={34} strokeWidth={1.2} />
                </div>
                <h1 className="hero-text">COIMBATORE<br />LOUNGE</h1>
                <p style={{ color:'#cbd5e1', fontSize:'13.5px', lineHeight:'1.65', margin:'0 0 35px 0', fontWeight:'300' }}>
                  Step into Coimbatore's premier destination for luxury grooming and bespoke aesthetics. Unveil an uncompromised experience of elite transformation.
                </p>
                <button className="launch-btn" onClick={launchScissors}>Experience Lounge</button>
              </div>
            </div>
          </div>

          {/* Scissors Impact Explosion */}
          {isShearing && (
            <div className="scissors-overlay">
              <div className="shear-wrap">
                {showSlash && <div className="scissors-slash" />}
                {showFlash && <div className="flash" />}
                <div className="blade-top"    style={{ color:'#d4a359' }}>
                  <Scissors size={310} strokeWidth={0.5} style={{ transform:'scaleX(-1) rotate(-10deg)', filter: 'drop-shadow(0 0 25px rgba(212,163,89,0.6))' }} />
                </div>
                <div className="blade-bottom" style={{ color:'#d4a359' }}>
                  <Scissors size={310} strokeWidth={0.5} style={{ transform:'rotate(10deg)', filter: 'drop-shadow(0 0 25px rgba(212,163,89,0.6))' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== STAGE 2: 3D REVEAL ENHANCED STAGE ===== */}
      {stage === 'door-opening' && (
        <div className="door-scene">
          {/* Dashboard Scene Backdrop (Hidden until gates pop wide open to prevent image_45494c.png leak!) */}
          <div className="reveal-bg-bright" style={{ backgroundImage: `url(${salonDashboardBgImage})` }} />
          <div className="ambient-gold-lens" />

          {/* Core Card with absolute zero icon leaking pre-animation */}
          <div className="tw-card">
            <div style={{ color: '#d4a359', marginBottom: '12px' }}>
              <Sparkles size={24} />
            </div>
            <span style={{ color:'#d4a359', fontSize:'10.5px', fontWeight:'900', letterSpacing:'5px', display:'block', marginBottom:'16px', textTransform:'uppercase' }}>
              The Premium Awakening
            </span>
            <h2 style={{ color:'#fff', fontSize:'34px', fontWeight:'900', margin:'0 0 16px 0', minHeight:'42px', letterSpacing:'0.5px' }}>
              {typedTitle}
            </h2>
            <p style={{ color:'#e2e8f0', fontSize:'14.5px', maxWidth:'500px', margin:'0 auto', lineHeight:'1.75', minHeight:'55px', fontWeight:'300' }}>
              {typedSub}
            </p>
            {showEnterBtn && (
              <button className="enter-btn" onClick={() => setStage('dashboard-active')}>
                Enter Coimbatore Hub →
              </button>
            )}
          </div>

          {/* Giant Manor Gates standing securely in FRONT shielding everything */}
          <div className="door-left">
            <div className="door-label" style={{ paddingRight:'45px' }}>C</div>
          </div>
          <div className="door-right">
            <div className="door-label" style={{ paddingLeft:'45px' }}>L</div>
          </div>

        </div>
      )}
    </>
  );
}