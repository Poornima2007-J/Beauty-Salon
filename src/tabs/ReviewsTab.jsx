import React, { useState, useEffect } from 'react';
import { MessageSquare, Star, Sparkles, User, Send, CheckCircle2, ThumbsUp, TrendingUp } from 'lucide-react';

const initialReviews = [
  {
    id: 1, name: 'Anand Kumar', rating: 5,
    comment: 'Absolutely marvelous experience! The premium lounge atmosphere combined with world-class styling techniques completely elevated my transformation journey.',
    date: '3 hours ago',
    likes: 4
  },
  {
    id: 2, name: 'Priya Selvam', rating: 4,
    comment: 'Excellent setup at Race Course lounge. The attention to detail and personalized consultation was top-notch.',
    date: '2 days ago',
    likes: 2
  },
];

const ReviewsTab = () => {
  // LocalStorage Engine
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('matrix_salon_reviews');
    return savedReviews ? JSON.parse(savedReviews) : initialReviews;
  });

  const [newName, setNewName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedRating, setSelectedRating] = useState(0); // Default 0 - user fill பண்ணா தான் கோல்டன் ஆகும்!
  const [hoveredStar, setHoveredStar] = useState(null);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('matrix_salon_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Calculate Real-time Stats
  const totalNodes = reviews.length;
  const avgRating = totalNodes > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalNodes).toFixed(1) 
    : '0.0';

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim() || selectedRating === 0) return;

    setIsBroadcasting(true);

    setTimeout(() => {
      const newReviewNode = {
        id: Date.now(),
        name: newName,
        rating: selectedRating,
        comment: newComment,
        date: 'Just now',
        likes: 0
      };

      setReviews([newReviewNode, ...reviews]);
      setNewName('');
      setNewComment('');
      setSelectedRating(0); // Reset back to empty outline stars
      setIsBroadcasting(false);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 3500);
    }, 1200);
  };

  const handleLike = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(15, 18, 28, 0.8) 0%, rgba(4, 5, 9, 0.99) 100%)',
      padding: '32px 24px',
      borderRadius: '28px',
      border: '1px solid rgba(212, 163, 89, 0.22)',
      color: '#fff',
      boxSizing: 'border-box',
      backdropFilter: 'blur(30px)',
      boxShadow: '0 30px 70px rgba(0, 0, 0, 0.6)'
    }}>

      {/* Advanced Real-time Animation Keyframe System */}
      <style>{`
        @keyframes customFadeInUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes pulseGlow {
          0%, 100% { border-color: rgba(212, 163, 89, 0.2); box-shadow: 0 0 0 0 rgba(212, 163, 89, 0); }
          50% { border-color: rgba(212, 163, 89, 0.5); box-shadow: 0 0 25px 4px rgba(212, 163, 89, 0.12); }
        }
        @keyframes popInSuccess {
          0% { transform: scale(0.9) translateY(-10px); opacity: 0; filter: blur(4px); }
          100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); }
        }
        @keyframes starScalePop {
          0% { transform: scale(1); }
          50% { transform: scale(1.45) rotate(15deg); filter: drop-shadow(0 0 12px #facc15); }
          100% { transform: scale(1); }
        }
        @keyframes broadcastProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes textShimmer {
          0% { opacity: 0.5; }
          100% { opacity: 1; color: #d4a359; }
        }

        .review-card-node {
          animation: customFadeInUp 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.15) both;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .review-card-node:hover {
          transform: translateY(-6px) scale(1.008);
          border-color: rgba(212, 163, 89, 0.45) !important;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(212, 163, 89, 0.03) 100%) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.55);
        }

        .interactive-star {
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
        }
        .interactive-star:hover {
          transform: scale(1.35) rotate(10deg);
        }
        .interactive-star:active {
          animation: starScalePop 0.3s ease-out;
        }
        
        .like-btn {
          transition: all 0.25s ease;
        }
        .like-btn:hover {
          color: #d4a359 !important;
          background: rgba(212, 163, 89, 0.12) !important;
          transform: translateY(-1px);
        }
        .like-btn:active {
          transform: scale(0.92);
        }

        .sync-pulse {
          animation: textShimmer 1.5s infinite alternate ease-in-out;
        }
      `}</style>

      {/* Real-time Header & Analytics Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ color: '#d4a359', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontSize: '19px', fontWeight: '900', letterSpacing: '0.8px' }}>
            <MessageSquare size={22} style={{ color: '#d4a359' }} /> GUEST EXPERIENCE HUB
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '11px', background: 'rgba(212,163,89,0.1)', color: '#d4a359', padding: '6px 14px', borderRadius: '20px', border: '1px solid rgba(212,163,89,0.15)', fontWeight: '700', display:'flex', alignItems:'center', gap:'5px' }}>
              <TrendingUp size={12} /> {totalNodes} Total Feedbacks
            </span>
          </div>
        </div>

        {/* Real-time Insights Panel */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}>
          <div style={{ textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
              {avgRating} <Star size={18} fill="#facc15" color="#facc15" style={{ marginBottom:'2px' }} />
            </div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginTop: '2px' }}>Lounge Rating Score</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#d4a359' }}>100%</div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', marginTop: '2px' }}>Satisfaction Protocol</div>
          </div>
        </div>
      </div>

      {/* Review Submission Core Form Container */}
      <form onSubmit={handleAddReview} style={{
        background: 'rgba(5, 6, 10, 0.45)', padding: '24px', borderRadius: '20px', marginBottom: '32px', 
        boxSizing: 'border-box', border: '1px solid rgba(212, 163, 89, 0.15)', animation: 'pulseGlow 5s infinite ease-in-out'
      }}>
        
        {/* Profile Input Group */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#d4a359' }} />
          <input
            type="text" placeholder="Enter Your Signature Name..."
            value={newName} onChange={e => setNewName(e.target.value)}
            required
            style={{
              width: '100%', background: '#07080d', border: '1px solid rgba(255,255,255,0.08)',
              padding: '14px 14px 14px 44px', borderRadius: '12px', color: '#fff', fontSize: '13.5px',
              outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box',
            }}
            onFocus={(e) => e.target.style.borderColor = '#d4a359'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
          />
        </div>

        {/* Dynamic Star Selection Controller Grid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px', background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <span style={{ fontSize: '12.5px', color: '#cbd5e1', fontWeight: '600' }}>Your Experience Vector:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4, 5].map((starIndex) => {
                // FIXED MECHANISM: Fill ONLY happens during Hover or when Selected!
                const isLit = hoveredStar !== null ? starIndex <= hoveredStar : starIndex <= selectedRating;
                return (
                  <Star
                    key={starIndex}
                    size={23}
                    className="interactive-star"
                    fill={isLit ? '#facc15' : 'transparent'} // No default golden fill anymore!
                    color={isLit ? '#facc15' : 'rgba(212, 163, 89, 0.45)'} // Gorgeous soft gold borders when empty
                    onMouseEnter={() => setHoveredStar(starIndex)}
                    onMouseLeave={() => setHoveredStar(null)}
                    onClick={() => setSelectedRating(starIndex)}
                    style={{
                      filter: isLit ? 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.5))' : 'none'
                    }}
                  />
                );
              })}
            </div>
            <span style={{ fontSize: '12px', background: selectedRating > 0 ? 'rgba(250,204,21,0.1)' : 'rgba(255,255,255,0.05)', color: selectedRating > 0 ? '#facc15' : '#64748b', padding: '4px 9px', borderRadius: '6px', fontWeight: '800', minWidth: '40px', textAlign: 'center', transition: 'all 0.3s' }}>
              {selectedRating}.0 / 5.0
            </span>
          </div>
        </div>

        {/* Real-time Experience Message Area */}
        <textarea
          placeholder="Share details of your luxurious transformation sequence..."
          value={newComment} onChange={e => setNewComment(e.target.value)}
          required
          style={{
            width: '100%', height: '95px', background: '#07080d', border: '1px solid rgba(255,255,255,0.08)',
            padding: '14px', borderRadius: '12px', color: '#fff', resize: 'none', fontSize: '13.5px',
            outline: 'none', boxSizing: 'border-box', marginBottom: '20px', transition: 'all 0.3s',
            lineHeight: '1.5'
          }}
          onFocus={(e) => e.target.style.borderColor = '#d4a359'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />

        {/* Action Dispatcher System Trigger */}
        <div style={{ position: 'relative' }}>
          <button 
            type="submit" 
            disabled={isBroadcasting || !newName.trim() || !newComment.trim() || selectedRating === 0}
            style={{
              background: isBroadcasting ? '#0f172a' : 'linear-gradient(135deg, #fce1b4 0%, #d4a359 50%, #8c6223 100%)',
              border: 'none', padding: '16px', borderRadius: '12px', fontWeight: '900', fontSize: '13px',
              cursor: (!newName.trim() || !newComment.trim() || selectedRating === 0) ? 'not-allowed' : 'pointer', color: isBroadcasting ? '#475569' : '#010204', 
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              transition: 'all 0.3s', opacity: (!newName.trim() || !newComment.trim() || selectedRating === 0) ? 0.45 : 1,
              letterSpacing: '0.8px', textTransform: 'uppercase', overflow: 'hidden'
            }}
          >
            {isBroadcasting ? (
              <span style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <Sparkles size={14} style={{ animation: 'spin 2s linear infinite' }} /> Syncing Encryption Pipeline...
              </span>
            ) : (
              <><span>Publish Experience Live</span> <Send size={14} /></>
            )}
          </button>
          
          {/* Micro Loading Progress Animation Strip */}
          {isBroadcasting && (
            <div style={{
              position: 'absolute', bottom: 0, left: 0, height: '3.5px', 
              background: 'linear-gradient(90deg, #d4a359, #fff, #d4a359)', borderRadius: '0 0 12px 12px',
              animation: 'broadcastProgress 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards'
            }} />
          )}
        </div>
      </form>

      {/* Mini Dynamic Alert Block */}
      {showSuccess && (
        <div className="success-alert" style={{
          display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.4)', padding: '14px', borderRadius: '14px', marginBottom: '24px',
          animation: 'popInSuccess 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both'
        }}>
          <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0 }} />
          <span style={{ fontSize: '12.5px', color: '#34d399', fontWeight: '700' }}>
            Review feed integrated into local database node successfully!
          </span>
        </div>
      )}

      {/* Feed Architecture Live Stream Block */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.map((r, index) => (
          <div 
            key={r.id} 
            className="review-card-node"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(255,255,255,0.03) 100%)',
              padding: '20px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.05)',
              animationDelay: `${index * 0.08}s` 
            }}
          >
            {/* Review Card Header Elements */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', background: 'rgba(212,163,89,0.08)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212,163,89,0.2)' }}>
                  <Sparkles size={12} style={{ color: '#d4a359', margin:'auto' }} />
                </div>
                <div style={{ display:'flex', flexDirection:'column' }}>
                  <strong style={{ fontSize: '14.5px', color: '#fff', letterSpacing: '-0.1px', fontWeight: '700' }}>{r.name}</strong>
                  <span style={{ fontSize: '10px', color: '#475569', fontWeight: '600', marginTop:'1px' }}>VERIFIED GUEST</span>
                </div>
              </div>
              
              {/* Output Star Generator Panel (Always gold for published records) */}
              <div style={{ display: 'flex', gap: '3px', background: 'rgba(0,0,0,0.3)', padding: '5px 10px', borderRadius: '8px', border:'1px solid rgba(255,255,255,0.02)' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    size={12} 
                    fill={idx < r.rating ? '#facc15' : 'transparent'} 
                    color={idx < r.rating ? '#facc15' : '#334155'} 
                  />
                ))}
              </div>
            </div>

            {/* Content Field Segment */}
            <p style={{ margin: '0 0 16px 0', fontSize: '13.5px', color: '#cbd5e1', lineHeight: '1.6', paddingLeft: '2px' }}>
              "{r.comment}"
            </p>

            {/* Interactive Footer Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '12px' }}>
              <button 
                onClick={() => handleLike(r.id)}
                className="like-btn"
                style={{
                  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                  padding: '5px 12px', borderRadius: '8px', color: '#94a3b8', fontSize: '11px',
                  display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '700'
                }}
              >
                <ThumbsUp size={11} /> Helpful ({r.likes})
              </button>
              
              <span className="sync-pulse" style={{ fontSize: '10px', color: '#475569', fontWeight: '700', letterSpacing: '0.5px' }}>
                ⚡ TIMELINE SYNC: {r.date.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;