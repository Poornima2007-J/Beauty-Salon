import React, { useState, useEffect } from 'react';
import { Layers, MapPin, Menu } from 'lucide-react';

import SidebarNav         from './SidebarNav';
import HomeTab            from './tabs/HomeTab';
import MapLocationsTab    from './tabs/MapLocationsTab';
import AiHairstyleTab     from './tabs/AiHairstyleTab';
import ReviewsTab         from './tabs/ReviewsTab';
import AiAssistantTab     from './tabs/AiAssistantTab';
import BeautyPlannerTab   from './tabs/BeautyPlannerTab';

import {
  UserProfileTab, PremiumTab, OffersTab, SupportTab
} from './tabs/StaticTabs';

const salonDashboardBgImage = '/salon-bg.png';

const TabRenderer = ({ tab, setTab }) => {
  const goToHome = (msg) => {
    setTab('home');
    if (msg) alert(msg);
  };

  return (
    <div style={{ transition: 'all 0.4s ease' }}>
      {(() => {
        switch (tab) {
          case 'home':           return <HomeTab setTab={setTab} />;
          case 'map-locations':  return (
            <MapLocationsTab
              onSelectBooking={() => goToHome('Dashboard Control updated! Modify parameters instantly.')}
              onSelectVipBooking={() => goToHome('VIP Infrastructure Route Active. Head down to Custom Layout Tab!')}
            />
          );
          case 'ai-hairstyle':   return <AiHairstyleTab />;
          case 'reviews':        return <ReviewsTab />;
          case 'ai-assistant':   return <AiAssistantTab />;
          case 'beauty-planner': return <BeautyPlannerTab />;
          case 'user-profile':   return <UserProfileTab />;
          case 'premium':        return <PremiumTab />;
          case 'offers':         return <OffersTab />;
          case 'support':        return <SupportTab />;
          default:               return null;
        }
      })()}
    </div>
  );
};

const DashboardLayout = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobileMode = window.innerWidth <= 1024;
      setIsMobile(mobileMode);
      if (!mobileMode) setMobileSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      height: '100vh',
      maxHeight: '100vh',
      background: '#020306',
      display: 'flex',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(135deg, rgba(4, 6, 12, 0.94) 20%, rgba(10, 14, 26, 0.82) 70%, rgba(0, 0, 0, 0.95) 100%), url(${salonDashboardBgImage})`,
        backgroundSize: '120% 120%',
        backgroundPosition: 'center',
        zIndex: 0,
        pointerEvents: 'none',
        animation: 'ambientBgShift 25s ease-in-out infinite alternate'
      }} />

      <style>{`
        @keyframes ambientBgShift {
          0% { background-position: 0% 50%; transform: scale(1); }
          50% { background-position: 100% 50%; transform: scale(1.03); }
          100% { background-position: 0% 50%; transform: scale(1); }
        }
        @keyframes liveRadar { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>

      {isMobile && mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed', 
            inset: 0, 
            background: 'rgba(0,0,0,0.4)', 
            backdropFilter: 'blur(8px)', 
            zIndex: 950,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      <SidebarNav 
        activeTab={currentTab} 
        onTabSelect={setCurrentTab} 
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 5,
        marginLeft: isMobile ? 0 : '280px',
        transition: 'margin-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        
        <nav style={{
          padding: isMobile ? '16px 20px' : '20px 50px',
          background: 'rgba(5, 7, 13, 0.65)',
          backdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(212, 163, 89, 0.1)',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky', 
          top: 0, 
          zIndex: 100,
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {isMobile && (
              <button 
                onClick={() => setMobileSidebarOpen(true)}
                style={{ 
                  background: 'rgba(212, 163, 89, 0.08)', 
                  border: '1px solid rgba(212, 163, 89, 0.2)', 
                  color: '#d4a359', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center',
                  padding: '10px',
                  borderRadius: '12px',
                  transition: 'all 0.2s'
                }}
              >
                <Menu size={20} />
              </button>
            )}
            <span style={{ fontSize: isMobile ? '13px' : '16px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', gap: '12px', letterSpacing: '0.8px' }}>
              {!isMobile && <Layers size={18} style={{ color: '#d4a359' }} />} 
              KOVAI SALON PORTAL
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.05)', padding: '6px 12px', borderRadius: '14px', border: '1px solid rgba(16,185,129,0.15)' }}>
              <div style={{ position: 'relative', width: '6px', height: '6px' }}>
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#10b981', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#10b981', borderRadius: '50%', animation: 'liveRadar 1.5s infinite ease-out' }} />
              </div>
              <span style={{ color: '#10b981', fontSize: '11px', fontWeight: '800' }}>LIVE</span>
            </div>

            {!isMobile && (
              <span style={{ color: '#d4a359', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(212,163,89,0.05)', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(212,163,89,0.15)' }}>
                <MapPin size={14} /> Coimbatore Hub
              </span>
            )}
          </div>
        </nav>

        <div style={{
          maxWidth: '1200px', 
          width: '100%', 
          margin: '0 auto',
          padding: isMobile ? '16px 12px 80px 12px' : '40px 40px 100px 40px', 
          boxSizing: 'border-box'
        }}>
          <TabRenderer tab={currentTab} setTab={setCurrentTab} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;