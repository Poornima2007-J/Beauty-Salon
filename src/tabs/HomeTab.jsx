
import React, { useEffect, useMemo, useState } from 'react';
import {
  Award,
  CalendarCheck,
  ChevronRight,
  Clock3,
  CloudRain,
  Crown,
  Eye,
  Flame,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  Music,
  PhoneCall,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  TimerReset,
  TrendingUp,
  User,
  UserCheck,
  Users,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react';

const HomeTab = () => {
  const [selectedGender, setSelectedGender] = useState('Female');
  const [selectedAge, setSelectedAge] = useState('26-35');
  const [selectedDay, setSelectedDay] = useState('Sat');
  const [selectedPackage, setSelectedPackage] = useState('bridal');
  const [spotlightSalon, setSpotlightSalon] = useState(null);
  const [likedNodes, setLikedNodes] = useState({});
  const [currentHeroBgIndex, setCurrentHeroBgIndex] = useState(0);
  const [showSalonsGrid, setShowSalonsGrid] = useState(true);

  const heroImages = useMemo(
    () => [
      'https://tse2.mm.bing.net/th/id/OIP.n5v_WlbvQ2rHcTXFhyqyxQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://images.squarespace-cdn.com/content/v1/622562a91826ae0faf2e21fb/f043c914-21e8-40be-b745-790c99984dbc/2-SalonCapri-HERO-Newton-Boston-Dedham-NewburyStreet-hair-salon.jpg',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=85',
    ],
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const weeklyCrowdData = [
    { day: 'Mon', load: 34, wait: '08 min', status: 'Relaxed', color: '#10b981' },
    { day: 'Tue', load: 44, wait: '12 min', status: 'Easy Flow', color: '#14b8a6' },
    { day: 'Wed', load: 58, wait: '18 min', status: 'Moderate', color: '#f59e0b' },
    { day: 'Thu', load: 53, wait: '15 min', status: 'Steady', color: '#f59e0b' },
    { day: 'Fri', load: 79, wait: '32 min', status: 'Busy', color: '#f97316' },
    { day: 'Sat', load: 96, wait: '45 min', status: 'Peak Rush', color: '#ef4444' },
    { day: 'Sun', load: 91, wait: '38 min', status: 'Heavy', color: '#ef4444' },
  ];

  const ambienceAlerts = [
    'RS Puram: Bridal styling suite has 3 express slots today',
    'Race Course: VIP facial lounge humidity balanced at 45%',
    'Peelamedu: Balayage master chair open from 5:30 PM',
    'Saibaba Colony: Premium beard therapy combo is trending',
    'Gandhipuram: Keratin smoothening station running live',
    'All branches: UV tool sterilisation completed every cycle',
    'Today only: Glow facial add-on available with hair spa',
  ];

  const topServices = [
    { name: 'Honey Balayage', demand: '98%', trend: '+24%', time: '120 min', icon: WandSparkles, color: '#f59e0b' },
    { name: 'Olaplex Repair', demand: '92%', trend: '+18%', time: '45 min', icon: ShieldCheck, color: '#38bdf8' },
    { name: 'Hydro Glow Facial', demand: '89%', trend: '+12%', time: '60 min', icon: Sparkles, color: '#10b981' },
    { name: 'Beard Sculpt', demand: '95%', trend: '+31%', time: '30 min', icon: Scissors, color: '#ef4444' },
  ];

  const packages = [
    {
      id: 'bridal',
      title: 'Bridal Glow Suite',
      price: '₹7,499',
      tag: 'Most booked',
      perks: ['HD makeup trial', 'Hair spa', 'Glow facial'],
      icon: Crown,
    },
    {
      id: 'express',
      title: 'Express Makeover',
      price: '₹1,499',
      tag: '60 mins',
      perks: ['Haircut', 'Blow dry', 'Quick cleanup'],
      icon: TimerReset,
    },
    {
      id: 'family',
      title: 'Family Grooming',
      price: '₹2,999',
      tag: 'Weekend pick',
      perks: ['3 services', 'Kids cut', 'Priority slot'],
      icon: Users,
    },
  ];

  const salons = [
    { id: 1, name: 'Toni & Guy Essentials', area: 'RS Puram', rating: '4.9', reviews: 1420, image: 'https://beautyinsider.sg/wp-content/uploads/2017/07/TONIGUY-Mandarin-Gallery_inside-1024x683.jpg', stylists: 14, slots: 3, humidity: '45% Optimal', hygiene: '99.8% Certified', lighting: 'Soft Gold', audio: 'Deep Lounge', description: 'Flagship luxury spot for global colouring, signature cuts, and private styling lounges.' },
    { id: 2, name: 'Essensuals by Toni & Guy', area: 'Peelamedu', rating: '4.8', reviews: 980, image: 'https://tse3.mm.bing.net/th/id/OIP.yDJt6H3c7JwdSg6G-CzkrgHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', stylists: 9, slots: 4, humidity: '42% Clear', hygiene: '98.5% Certified', lighting: 'Daylight', audio: 'Lo-Fi Jazz', description: 'Youthful trend salon for hair transitions, organic treatments, and modern styling bars.' },
    { id: 3, name: 'WIBES Luxury Lounge', area: 'Race Course', rating: '4.9', reviews: 1150, image: 'https://tse2.mm.bing.net/th/id/OIP.n5v_WlbvQ2rHcTXFhyqyxQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', stylists: 11, slots: 2, humidity: '50% Spa Fresh', hygiene: '100% Elite', lighting: 'Warm Dimmer', audio: 'Acoustic Soul', description: 'Premium wellness lounge for bridal makeovers, skin rituals, and aromatherapy care.' },
    { id: 4, name: 'Beard & Blade Studio', area: 'Saibaba Colony', rating: '4.7', reviews: 840, image:'https://beardo.in/cdn/shop/files/BSP_hair_color_Website_Landing_Page_Banner_1440_x_940_01_527fdb69-6171-4f6d-819c-69045c2cc3fd.jpg?v=1727088954&width=2000', stylists: 6, slots: 5, humidity: '40% Crisp', hygiene: '96.9% Certified', lighting: 'Vintage Glow', audio: 'Classic Retro', description: 'Sharp grooming studio for fades, beard contouring, hot towel shaves, and beard spa.' },
    { id: 5, name: 'Green Trends Premium', area: 'Gandhipuram', rating: '4.6', reviews: 2100, image: 'https://tse4.mm.bing.net/th/id/OIP.WjbiemiFWfFoy7ZLMfs_IAHaE7?r=0&w=512&h=341&rs=1&pid=ImgDetMain&o=7&rm=3', stylists: 16, slots: 7, humidity: '46% Standard', hygiene: '98.0% Certified', lighting: 'Clarity LED', audio: 'Soft Pop', description: 'High-capacity unisex salon for family packages, skin care, and express hair styling.' },
    { id: 6, name: 'Limelite Salon & Spa', area: 'Race Course', rating: '4.8', reviews: 720, image: 'https://th.bing.com/th/id/R.39ce67393df60eb59c1d23bafec95d18?rik=7d%2fk7a1pXfMDdQ&riu=http%3a%2f%2f4.bp.blogspot.com%2f-b1x3y60RD1U%2fVeg_JLhfh2I%2fAAAAAAAAFr8%2f7O0aiysPba0%2fs1600%2flimelite%252Bsalon%252Breview%252Bspa.jpg&ehk=e4Hvip5XXN02k2%2ffTJR5KzH9QEvddoKyk2rjg1w%2bWdU%3d&risl=&pid=ImgRaw&r=0', stylists: 10, slots: 3, humidity: '44% Controlled', hygiene: '99.2% Certified', lighting: 'Glam Glow', audio: 'Ambient Beats', description: 'Boutique luxury studio for bridal artistry, global styling, and premium skin care.' },
  ];

  const calculateClusterEngine = () => {
    if (selectedGender === 'Others') {
      return { ratio: '78%', bill: '₹1,950', retention: '91%', peak: '05:00 PM - 07:30 PM', trend: 'Vivid highlights with scalp detox therapy' };
    }

    if (selectedGender === 'Male') {
      if (selectedAge === '18-25') return { ratio: '94%', bill: '₹850', retention: '84%', peak: '04:00 PM - 06:00 PM', trend: 'Drop fade with textured quiff styling' };
      if (selectedAge === '26-35') return { ratio: '89%', bill: '₹1,500', retention: '93%', peak: '06:00 PM - 08:30 PM', trend: 'Beard contour sculpting with charcoal mask' };
      return { ratio: '70%', bill: '₹2,100', retention: '95%', peak: '11:00 AM - 02:00 PM', trend: 'Anti-thinning hair ritual with executive cut' };
    }

    if (selectedAge === '18-25') return { ratio: '96%', bill: '₹3,800', retention: '86%', peak: '02:30 PM - 05:30 PM', trend: 'Honey balayage with pro-plex defence' };
    if (selectedAge === '26-35') return { ratio: '92%', bill: '₹5,500', retention: '97%', peak: '04:30 PM - 08:00 PM', trend: 'Olaplex repair with hydro-lock glow facial' };
    return { ratio: '82%', bill: '₹4,900', retention: '98%', peak: '10:30 AM - 01:30 PM', trend: 'Collagen infusion with anti-ageing lift care' };
  };

  const dynamicMetrics = calculateClusterEngine();
  const activeDayMetric = weeklyCrowdData.find((day) => day.day === selectedDay);
  const activePackage = packages.find((pack) => pack.id === selectedPackage);
  const ActivePackageIcon = activePackage.icon;

  return (
    <div className="salon-home">
      <style>{`
        .salon-home {
          --gold: #e5b869;
          --gold-dark: #a8742b;
          --ink: #05070d;
          --panel: rgba(10, 14, 24, 0.86);
          --line: rgba(255, 255, 255, 0.09);
          --muted: #94a3b8;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 18px;
          width: min(1180px, 100%);
          margin: 0 auto;
          padding: 12px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .salon-home * {
          box-sizing: border-box;
        }

        @keyframes heroFloat {
          0%, 100% { background-position: 50% 45%; }
          50% { background-position: 50% 58%; }
        }

        @keyframes marqueeMove {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(229, 184, 105, 0); transform: translateY(0); }
          50% { box-shadow: 0 18px 38px rgba(229, 184, 105, 0.16); transform: translateY(-2px); }
        }

        @keyframes riseIn {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes shineSweep {
          from { transform: translateX(-120%) rotate(12deg); }
          to { transform: translateX(120%) rotate(12deg); }
        }

        .salon-ticker {
          display: flex;
          align-items: center;
          gap: 12px;
          min-height: 42px;
          padding: 9px 12px;
          border: 1px solid rgba(229, 184, 105, 0.2);
          border-radius: 12px;
          background: rgba(229, 184, 105, 0.05);
          overflow: hidden;
        }

        .salon-ticker-badge {
          flex: 0 0 auto;
          border-radius: 999px;
          background: var(--gold);
          color: #111827;
          font-size: 10px;
          font-weight: 900;
          padding: 5px 9px;
        }

        .salon-ticker-track {
          display: inline-flex;
          gap: 42px;
          min-width: max-content;
          animation: marqueeMove 34s linear infinite;
          color: #dbe4ef;
          font-size: 12px;
          font-weight: 650;
          white-space: nowrap;
        }

        .salon-hero {
          position: relative;
          min-height: 430px;
          border: 1px solid rgba(229, 184, 105, 0.28);
          border-radius: 22px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          box-shadow: 0 28px 55px rgba(0, 0, 0, 0.46);
          animation: heroFloat 13s ease-in-out infinite;
          isolation: isolate;
        }

        .salon-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 18%, rgba(229, 184, 105, 0.25), transparent 30%),
            linear-gradient(90deg, rgba(3, 5, 10, 0.92) 0%, rgba(3, 5, 10, 0.64) 46%, rgba(3, 5, 10, 0.28) 100%);
          z-index: -1;
        }

        .salon-hero::after {
          content: "";
          position: absolute;
          top: -30%;
          bottom: -30%;
          width: 110px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          animation: shineSweep 6s ease-in-out infinite;
          z-index: -1;
        }

        .salon-hero-content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 330px;
          gap: 24px;
          align-items: end;
          min-height: 430px;
          padding: 30px;
        }

        .salon-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          width: fit-content;
          border: 1px solid rgba(229, 184, 105, 0.28);
          border-radius: 999px;
          background: rgba(5, 7, 13, 0.78);
          color: var(--gold);
          font-size: 11px;
          font-weight: 850;
          padding: 7px 12px;
          text-transform: uppercase;
        }

        .salon-hero h1 {
          max-width: 680px;
          margin: 16px 0 10px;
          font-size: clamp(34px, 5vw, 64px);
          line-height: 0.98;
          letter-spacing: 0;
          font-weight: 950;
          text-transform: uppercase;
        }

        .salon-hero p {
          max-width: 560px;
          margin: 0;
          color: #d8e1ed;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 520;
        }

        .salon-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 22px;
        }

        .salon-btn {
          min-height: 46px;
          border: 0;
          border-radius: 12px;
          padding: 0 15px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 180ms ease;
        }

        .salon-btn:active {
          transform: scale(0.98);
        }

        .salon-btn-primary {
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: #05070d;
          animation: softPulse 2.8s ease-in-out infinite;
        }

        .salon-btn-ghost {
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
        }

        .salon-live-panel,
        .salon-card {
          border: 1px solid var(--line);
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(10, 14, 24, 0.88), rgba(4, 7, 13, 0.94));
          backdrop-filter: blur(18px);
          box-shadow: 0 18px 38px rgba(0, 0, 0, 0.22);
        }

        .salon-live-panel {
          padding: 16px;
        }

        .salon-live-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .salon-live-row:last-child {
          border-bottom: 0;
        }

        .salon-label {
          color: var(--muted);
          font-size: 11px;
          font-weight: 750;
          text-transform: uppercase;
        }

        .salon-value {
          color: #fff;
          font-size: 14px;
          font-weight: 900;
          text-align: right;
        }

        .salon-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .salon-card {
          padding: 18px;
          animation: riseIn 520ms ease both;
        }

        .salon-card-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }

        .salon-card-title h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0;
          font-size: 17px;
          font-weight: 900;
        }

        .salon-segment {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 7px;
        }

        .salon-pill {
          min-height: 42px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.04);
          color: #b7c3d3;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          transition: 180ms ease;
        }

        .salon-pill.active {
          border-color: transparent;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: #05070d;
          box-shadow: 0 12px 22px rgba(229, 184, 105, 0.18);
        }

        .salon-metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 14px;
        }

        .salon-metric {
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          background: rgba(2, 6, 15, 0.72);
          padding: 12px;
        }

        .salon-metric strong {
          display: block;
          margin-top: 5px;
          color: var(--gold);
          font-size: 17px;
        }

        .salon-trend-box {
          margin-top: 12px;
          border: 1px dashed rgba(229, 184, 105, 0.28);
          border-radius: 12px;
          padding: 12px;
          background: rgba(229, 184, 105, 0.06);
          color: #f8fafc;
          font-size: 13px;
          font-weight: 760;
          line-height: 1.45;
        }

        .salon-chart {
          display: grid;
          grid-template-columns: repeat(7, minmax(0, 1fr));
          align-items: end;
          gap: 8px;
          height: 172px;
          padding: 12px 8px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          background: rgba(2, 6, 15, 0.72);
        }

        .salon-bar {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          border: 0;
          background: transparent;
          color: #718096;
          cursor: pointer;
        }

        .salon-bar-fill {
          width: 100%;
          min-width: 16px;
          max-width: 30px;
          border-radius: 8px 8px 3px 3px;
          transition: 220ms ease;
        }

        .salon-bar.active {
          color: var(--gold);
        }

        .salon-bar.active .salon-bar-fill {
          box-shadow: 0 0 18px rgba(229, 184, 105, 0.45);
          outline: 2px solid rgba(255, 255, 255, 0.75);
        }

        .salon-services,
        .salon-packages,
        .salon-list {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .service-tile,
        .package-tile,
        .studio-card {
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          background: rgba(3, 7, 15, 0.72);
          overflow: hidden;
          transition: transform 200ms ease, border-color 200ms ease;
        }

        .service-tile:hover,
        .package-tile:hover,
        .studio-card:hover {
          transform: translateY(-3px);
          border-color: rgba(229, 184, 105, 0.35);
        }

        .service-tile {
          padding: 14px;
        }

        .service-icon {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(255, 255, 255, 0.07);
          margin-bottom: 12px;
        }

        .service-tile h4,
        .package-tile h4 {
          margin: 0;
          color: #fff;
          font-size: 14px;
          font-weight: 900;
        }

        .service-meta {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-top: 12px;
          color: var(--muted);
          font-size: 11px;
          font-weight: 760;
        }

        .package-tile {
          padding: 14px;
          cursor: pointer;
          text-align: left;
        }

        .package-tile.active {
          border-color: rgba(229, 184, 105, 0.54);
          background: linear-gradient(145deg, rgba(229, 184, 105, 0.15), rgba(3, 7, 15, 0.82));
        }

        .package-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }

        .package-tag {
          border-radius: 999px;
          background: rgba(229, 184, 105, 0.13);
          color: var(--gold);
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 900;
        }

        .package-price {
          color: var(--gold);
          font-size: 19px;
          font-weight: 950;
          margin: 8px 0;
        }

        .package-perks {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .package-perks span {
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: #cbd5e1;
          padding: 5px 8px;
          font-size: 10px;
          font-weight: 760;
        }

        .salon-list {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .studio-image {
          position: relative;
          height: 150px;
          overflow: hidden;
        }

        .studio-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 500ms ease;
        }

        .studio-card:hover .studio-image img {
          transform: scale(1.07);
        }

        .studio-like {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.58);
          color: #fff;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .studio-body {
          padding: 14px;
        }

        .studio-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #cbd5e1;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .studio-body h4 {
          margin: 0 0 12px;
          font-size: 15px;
          font-weight: 950;
        }

        .studio-action {
          width: 100%;
          min-height: 40px;
          border: 1px solid rgba(229, 184, 105, 0.24);
          border-radius: 11px;
          background: rgba(229, 184, 105, 0.07);
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 12px;
          font-weight: 900;
          cursor: pointer;
        }

        .salon-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: grid;
          place-items: center;
          padding: 16px;
          background: rgba(3, 5, 10, 0.92);
          backdrop-filter: blur(16px);
        }

        .salon-modal {
          width: min(440px, 100%);
          max-height: 92vh;
          overflow: auto;
          border: 1px solid rgba(229, 184, 105, 0.32);
          border-radius: 18px;
          background: #080c15;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.72);
          animation: riseIn 260ms ease both;
        }

        .modal-image {
          position: relative;
          height: 180px;
        }

        .modal-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, #080c15, transparent 62%);
        }

        .modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          z-index: 2;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.68);
          color: #fff;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .modal-name {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 14px;
          z-index: 2;
          margin: 0;
          font-size: 20px;
          font-weight: 950;
        }

        .modal-body {
          padding: 16px;
        }

        .modal-body p {
          margin: 4px 0 14px;
          color: #cbd5e1;
          font-size: 13px;
          line-height: 1.55;
        }

        .modal-insights {
          display: grid;
          gap: 9px;
        }

        .modal-insight {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.04);
          padding: 10px;
          color: #cbd5e1;
          font-size: 12px;
          font-weight: 780;
        }

        .modal-insight strong {
          color: #fff;
          text-align: right;
        }

        @media (max-width: 900px) {
          .salon-hero-content,
          .salon-grid {
            grid-template-columns: 1fr;
          }

          .salon-live-panel {
            max-width: 440px;
          }

          .salon-services,
          .salon-packages,
          .salon-list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 560px) {
          .salon-home {
            gap: 14px;
            padding: 10px;
          }

          .salon-ticker-badge {
            display: none;
          }

          .salon-hero {
            min-height: 520px;
            border-radius: 18px;
          }

          .salon-hero::before {
            background:
              radial-gradient(circle at 20% 10%, rgba(229, 184, 105, 0.22), transparent 34%),
              linear-gradient(to bottom, rgba(3, 5, 10, 0.38), rgba(3, 5, 10, 0.92) 54%, #03050a 100%);
          }

          .salon-hero-content {
            min-height: 520px;
            align-content: end;
            padding: 20px;
          }

          .salon-hero h1 {
            font-size: 38px;
          }

          .salon-hero p {
            font-size: 13px;
          }

          .salon-hero-actions {
            display: grid;
            grid-template-columns: 1fr;
          }

          .salon-live-panel {
            padding: 13px;
          }

          .salon-card {
            padding: 15px;
            border-radius: 14px;
          }

          .salon-card-title {
            align-items: flex-start;
            flex-direction: column;
          }

          .salon-segment,
          .salon-metrics,
          .salon-services,
          .salon-packages,
          .salon-list {
            grid-template-columns: 1fr;
          }

          .salon-chart {
            gap: 5px;
            height: 150px;
          }

          .studio-image {
            height: 180px;
          }
        }
      `}</style>

      <section className="salon-ticker">
        <span className="salon-ticker-badge">LIVE BEAUTY FEED</span>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="salon-ticker-track">
            {[...ambienceAlerts, ...ambienceAlerts].map((alert, index) => (
              <span key={`${alert}-${index}`}>{alert}</span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="salon-hero"
        style={{ backgroundImage: `url("${heroImages[currentHeroBgIndex]}")` }}
      >
        <div className="salon-hero-content">
          <div>
            <span className="salon-eyebrow">
              <Sparkles size={14} fill="currentColor" />
              Coimbatore premium salon hub
            </span>
            <h1>Book your glow-up before the rush starts</h1>
            <p>
              Hair styling, spa care, bridal makeovers, beard sculpting, and trend-based packages with live crowd insights for faster booking decisions.
            </p>
            <div className="salon-hero-actions">
              <button className="salon-btn salon-btn-primary" onClick={() => setShowSalonsGrid(true)}>
                <CalendarCheck size={17} />
                Explore slots
              </button>
              <button className="salon-btn salon-btn-ghost">
                <PhoneCall size={17} />
                Call stylist
              </button>
              <button className="salon-btn salon-btn-ghost">
                <MessageCircle size={17} />
                WhatsApp
              </button>
            </div>
          </div>

          <aside className="salon-live-panel">
            <div className="salon-live-row">
              <span className="salon-label">Today peak</span>
              <strong className="salon-value">{activeDayMetric.wait} wait</strong>
            </div>
            <div className="salon-live-row">
              <span className="salon-label">Open premium chairs</span>
              <strong className="salon-value">18 across city</strong>
            </div>
            <div className="salon-live-row">
              <span className="salon-label">Selected package</span>
              <strong className="salon-value">{activePackage.price}</strong>
            </div>
            <div className="salon-live-row">
              <span className="salon-label">Trending now</span>
              <strong className="salon-value">Balayage</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="salon-grid">
        <div className="salon-card">
          <div className="salon-card-title">
            <h3>
              <Zap size={18} color="var(--gold)" />
              Smart Client Match
            </h3>
            <span className="salon-label">AI forecast</span>
          </div>

          <div style={{ display: 'grid', gap: 13 }}>
            <div>
              <span className="salon-label">Profile</span>
              <div className="salon-segment" style={{ marginTop: 7 }}>
                <button className={`salon-pill ${selectedGender === 'Male' ? 'active' : ''}`} onClick={() => setSelectedGender('Male')}>
                  <User size={14} /> Male
                </button>
                <button className={`salon-pill ${selectedGender === 'Female' ? 'active' : ''}`} onClick={() => setSelectedGender('Female')}>
                  <UserCheck size={14} /> Female
                </button>
                <button className={`salon-pill ${selectedGender === 'Others' ? 'active' : ''}`} onClick={() => setSelectedGender('Others')}>
                  <Users size={14} /> Others
                </button>
              </div>
            </div>

            <div>
              <span className="salon-label">Age range</span>
              <div className="salon-segment" style={{ marginTop: 7 }}>
                {['18-25', '26-35', '36+'].map((age) => (
                  <button key={age} className={`salon-pill ${selectedAge === age ? 'active' : ''}`} onClick={() => setSelectedAge(age)}>
                    {age}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="salon-metrics">
            <div className="salon-metric">
              <span className="salon-label">Walk-in ratio</span>
              <strong>{dynamicMetrics.ratio}</strong>
            </div>
            <div className="salon-metric">
              <span className="salon-label">Est. bill</span>
              <strong style={{ color: '#10b981' }}>{dynamicMetrics.bill}</strong>
            </div>
            <div className="salon-metric">
              <span className="salon-label">Retention</span>
              <strong style={{ color: '#38bdf8' }}>{dynamicMetrics.retention}</strong>
            </div>
            <div className="salon-metric">
              <span className="salon-label">Peak slot</span>
              <strong style={{ fontSize: 13 }}>{dynamicMetrics.peak}</strong>
            </div>
          </div>

          <div className="salon-trend-box">
            <Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--gold)' }} />
            {dynamicMetrics.trend}
          </div>
        </div>

        <div className="salon-card">
          <div className="salon-card-title">
            <h3>
              <TrendingUp size={18} color="var(--gold)" />
              Weekly Crowd Heat
            </h3>
            <span className="salon-label">{activeDayMetric.status}</span>
          </div>

          <div className="salon-chart">
            {weeklyCrowdData.map((day) => {
              const active = selectedDay === day.day;
              return (
                <button key={day.day} className={`salon-bar ${active ? 'active' : ''}`} onClick={() => setSelectedDay(day.day)} type="button">
                  <span style={{ fontSize: 10, fontWeight: 900 }}>{day.load}%</span>
                  <span
                    className="salon-bar-fill"
                    style={{
                      height: `${day.load}%`,
                      background: active
                        ? 'linear-gradient(to top, var(--gold-dark), var(--gold))'
                        : `linear-gradient(to top, rgba(255,255,255,0.06), ${day.color})`,
                    }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 900 }}>{day.day}</span>
                </button>
              );
            })}
          </div>

          <div className="salon-metrics">
            <div className="salon-metric">
              <span className="salon-label">Crowd load</span>
              <strong style={{ color: activeDayMetric.color }}>{activeDayMetric.load}%</strong>
            </div>
            <div className="salon-metric">
              <span className="salon-label">Expected wait</span>
              <strong>{activeDayMetric.wait}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="salon-card">
        <div className="salon-card-title">
          <h3>
            <Flame size={18} color="#ef4444" />
            High Demand Services
          </h3>
          <span className="salon-label">Live trend matrix</span>
        </div>
        <div className="salon-services">
          {topServices.map((service) => {
            const ServiceIcon = service.icon;
            return (
              <article className="service-tile" key={service.name}>
                <div className="service-icon" style={{ color: service.color }}>
                  <ServiceIcon size={19} />
                </div>
                <h4>{service.name}</h4>
                <div className="service-meta">
                  <span>{service.time}</span>
                  <span style={{ color: service.color }}>{service.demand} demand</span>
                  <span>{service.trend}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="salon-card">
        <div className="salon-card-title">
          <h3>
            <Gift size={18} color="var(--gold)" />
            Featured Packages
          </h3>
          <span className="salon-label">Tap to preview</span>
        </div>
        <div className="salon-packages">
          {packages.map((pack) => {
            const PackageIcon = pack.icon;
            return (
              <button
                className={`package-tile ${selectedPackage === pack.id ? 'active' : ''}`}
                key={pack.id}
                onClick={() => setSelectedPackage(pack.id)}
                type="button"
              >
                <div className="package-head">
                  <PackageIcon size={20} color="var(--gold)" />
                  <span className="package-tag">{pack.tag}</span>
                </div>
                <h4>{pack.title}</h4>
                <div className="package-price">{pack.price}</div>
                <div className="package-perks">
                  {pack.perks.map((perk) => (
                    <span key={perk}>{perk}</span>
                  ))}
                </div>
              </button>
            );
          })}
          <div className="package-tile active" style={{ cursor: 'default' }}>
            <div className="package-head">
              <ActivePackageIcon size={20} color="var(--gold)" />
              <span className="package-tag">Selected</span>
            </div>
            <h4>Ready to reserve</h4>
            <div className="package-price">{activePackage.price}</div>
            <button className="salon-btn salon-btn-primary" style={{ width: '100%', marginTop: 10 }}>
              <CalendarCheck size={16} />
              Book this package
            </button>
          </div>
        </div>
      </section>

      <section className="salon-card">
        <div className="salon-card-title">
          <h3>
            <Award size={18} color="var(--gold)" />
            Famous Salon Studios
          </h3>
          <button className="salon-btn salon-btn-ghost" onClick={() => setShowSalonsGrid((value) => !value)} type="button">
            {showSalonsGrid ? 'Hide' : 'Show'} Studios
            <ChevronRight size={16} />
          </button>
        </div>

        {showSalonsGrid && (
          <div className="salon-list">
            {salons.map((salon) => (
              <article className="studio-card" key={salon.id}>
                <div className="studio-image">
                  <img src={salon.image} alt={salon.name} />
                  <button
                    className="studio-like"
                    onClick={() => setLikedNodes((prev) => ({ ...prev, [salon.id]: !prev[salon.id] }))}
                    type="button"
                  >
                    <Heart size={16} fill={likedNodes[salon.id] ? '#ef4444' : 'none'} color={likedNodes[salon.id] ? '#ef4444' : '#fff'} />
                  </button>
                </div>
                <div className="studio-body">
                  <div className="studio-meta">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MapPin size={12} color="var(--gold)" />
                      {salon.area}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Star size={12} fill="var(--gold)" color="var(--gold)" />
                      {salon.rating} ({salon.reviews})
                    </span>
                  </div>
                  <h4>{salon.name}</h4>
                  <button className="studio-action" onClick={() => setSpotlightSalon(salon)} type="button">
                    <Eye size={15} />
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {spotlightSalon && (
        <div className="salon-modal-backdrop">
          <div className="salon-modal">
            <div className="modal-image">
              <img src={spotlightSalon.image} alt={spotlightSalon.name} />
              <button className="modal-close" onClick={() => setSpotlightSalon(null)} type="button">
                <X size={16} />
              </button>
              <h3 className="modal-name">{spotlightSalon.name}</h3>
            </div>
            <div className="modal-body">
              <span className="salon-label">Studio overview</span>
              <p>{spotlightSalon.description}</p>

              <div className="modal-insights">
                <div className="modal-insight">
                  <span><Music size={14} color="#a855f7" /> Audio ambience</span>
                  <strong>{spotlightSalon.audio}</strong>
                </div>
                <div className="modal-insight">
                  <span><Sun size={14} color="var(--gold)" /> Lighting</span>
                  <strong>{spotlightSalon.lighting}</strong>
                </div>
                <div className="modal-insight">
                  <span><CloudRain size={14} color="#38bdf8" /> Air moisture</span>
                  <strong>{spotlightSalon.humidity}</strong>
                </div>
                <div className="modal-insight">
                  <span><ShieldCheck size={14} color="#10b981" /> Hygiene</span>
                  <strong>{spotlightSalon.hygiene}</strong>
                </div>
                <div className="modal-insight">
                  <span><Scissors size={14} color="var(--gold)" /> Active stylists</span>
                  <strong>{spotlightSalon.stylists} masters</strong>
                </div>
                <div className="modal-insight">
                  <span><Clock3 size={14} color="#10b981" /> Open slots</span>
                  <strong>{spotlightSalon.slots} chairs</strong>
                </div>
              </div>

              <button className="salon-btn salon-btn-primary" style={{ width: '100%', marginTop: 14 }} onClick={() => setSpotlightSalon(null)} type="button">
                Close details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTab;
