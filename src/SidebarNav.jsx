import React, { useState } from 'react';
import {
  Home, MapPin, Sparkles, MessageSquare, Bot,
  Calendar, User, ShieldCheck, Ticket, Activity, X
} from 'lucide-react';

const navItems = [
  { id: 'home',            name: 'Home Gateway',             icon: Home },
  { id: 'map-locations',   name: 'Salon Map Explorer',       icon: MapPin },
  { id: 'beauty-planner',  name: 'Beauty Sequence Planner',  icon: Calendar },
  { id: 'ai-hairstyle',    name: 'AI Hairstyle Try-On',      icon: Sparkles },
  { id: 'ai-assistant',    name: 'AI Smart Assistant',       icon: Bot },
  { id: 'premium',         name: 'VIP Elite Club',           icon: ShieldCheck },
  { id: 'offers',          name: 'Offers & Rewards',         icon: Ticket },
  { id: 'reviews',         name: 'Client Reviews',           icon: MessageSquare },
  { id: 'support',         name: 'Helpdesk Support',         icon: Activity },
];

const SidebarNav = ({ activeTab, onTabSelect, mobileOpen, setMobileOpen }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const isMobileViewport = window.innerWidth <= 1024;

  return (
    <div style={{
      width: '280px', 
      background: 'linear-gradient(185deg, rgba(6, 8, 14, 0.98) 0%, rgba(2, 3, 5, 0.99) 100%)',
      borderRight: '1px solid rgba(212, 163, 89, 0.15)',
      padding: '35px 24px', 
      display: 'flex', 
      flexDirection: 'column',
      gap: '6px', 
      boxSizing: 'border-box', 
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      overflowY: 'auto',
      zIndex: 1000,
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      transform: mobileOpen || !isMobileViewport ? 'translateX(0)' : 'translateX(-100%)',
    }}>
      <style>{`
        @keyframes sidebarEntrance {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        div::-webkit-scrollbar { width: 4px; }
        div::-webkit-scrollbar-thumb { background: rgba(212, 163, 89, 0.1); border-radius: 4px; }
      `}</style>

      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '35px',
        paddingLeft: '10px'
      }}>
        <div style={{ 
          fontSize: '18px', 
          fontWeight: '900', 
          letterSpacing: '3px', 
          color: '#fff', 
          lineHeight: '1.4'
        }}>
          KOVAI <br />
          <span style={{ color: '#d4a359', fontWeight: '300' }}>MATRIX</span>
        </div>

        {isMobileViewport && (
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'rgba(212, 163, 89, 0.1)',
              border: '1px solid rgba(212, 163, 89, 0.2)',
              color: '#d4a359',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              marginTop: '-4px'
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {navItems.map((item, index) => {
          const isActive = activeTab === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onTabSelect(item.id);
                if(window.innerWidth <= 1024) setMobileOpen(false);
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex', 
                gap: '14px', 
                alignItems: 'center',
                animation: `sidebarEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.02}s both`,
                background: isActive 
                  ? 'linear-gradient(90deg, rgba(212,163,89,0.15) 0%, rgba(212,163,89,0.02) 100%)' 
                  : isHovered ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                borderLeft: isActive 
                  ? '3px solid #d4a359' 
                  : isHovered ? '3px solid rgba(212,163,89,0.4)' : '3px solid transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                color: isActive ? '#d4a359' : isHovered ? '#fff' : '#8a99ad',
                padding: '12px 16px', 
                borderRadius: '0px 12px 12px 0px', 
                cursor: 'pointer', 
                transition: 'all 0.3s ease',
                width: '100%', 
                textAlign: 'left',
                transform: isHovered && !isActive ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              <item.icon size={18} style={{ color: isActive ? '#d4a359' : isHovered ? '#f7d08a' : '#64748b' }} />
              <span style={{ fontSize: '13px', fontWeight: isActive ? '700' : '500' }}>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarNav;

