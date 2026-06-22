import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Upload, Sparkles, RefreshCw, Download, Scissors, Check, Camera,
  Wand2, UserCheck, Palette, ShieldCheck, BadgeCheck, AlertCircle
} from 'lucide-react';

const hairTypesData = {
  auto: 'AI detects my hair type',
  straight: 'Straight',
  wavy: 'Wavy',
  curly: 'Curly',
  coily: 'Coily',
  thin: 'Thin / Fine',
  thick: 'Thick / Dense'
};

const stylesData = {
  ai_best: { name: 'AI Best Match', desc: 'Predict best style from face and requirement' },
  wolf: { name: 'Wolf Cut', desc: 'Layered modern volume' },
  butterfly: { name: 'Butterfly Layers', desc: 'Soft face framing layers' },
  taper: { name: 'Taper Fade', desc: 'Clean premium fade' },
  textured_crop: { name: 'Textured Crop', desc: 'Sharp short texture' },
  bob: { name: 'Layered Bob', desc: 'Elegant short shape' },
  curtain: { name: 'Curtain Bangs', desc: 'Soft front framing' },
  long_layers: { name: 'Long Layers', desc: 'Natural premium flow' }
};

const colorsData = {
  natural: { name: 'Natural Black', swatch: '#111827' },
  dark_brown: { name: 'Dark Brown', swatch: '#4a2c1a' },
  ash_brown: { name: 'Ash Brown', swatch: '#6b5f54' },
  burgundy: { name: 'Burgundy', swatch: '#7f1d1d' },
  caramel: { name: 'Caramel Highlights', swatch: '#b7791f' },
  blonde: { name: 'Golden Blonde', swatch: '#d6a64f' },
  no_change: { name: 'No Color Change', swatch: '#d4af37' }
};

const faceShapes = {
  auto: 'AI detects face shape',
  oval: 'Oval',
  round: 'Round',
  square: 'Square',
  heart: 'Heart',
  diamond: 'Diamond',
  long: 'Long'
};

const API_BASE_URL = process.env.REACT_APP_AI_BACKEND_URL || 'http://localhost:5000';

const compressImageForAi = (file) => new Promise((resolve) => {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);

  img.onload = () => {
    const maxSize = 768;
    const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(objectUrl);

    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(file);
        return;
      }
      resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }));
    }, 'image/jpeg', 0.82);
  };

  img.onerror = () => {
    URL.revokeObjectURL(objectUrl);
    resolve(file);
  };

  img.src = objectUrl;
});
const readJsonResponse = async (response) => {
  const rawText = await response.text();

  try {
    return JSON.parse(rawText);
  } catch (error) {
    const isHtml = rawText.trim().startsWith('<!DOCTYPE') || rawText.trim().startsWith('<html');
    const hint = isHtml
      ? 'Backend returned HTML instead of JSON. Make sure Express backend is running on port 5000, not the React app.'
      : 'Backend returned an invalid JSON response.';
    throw new Error(hint);
  }
};

const inputStyle = {
  width: '100%',
  padding: '11px 12px',
  borderRadius: '8px',
  background: '#05070f',
  border: '1px solid rgba(212,175,55,0.18)',
  color: '#fff',
  fontSize: '12px',
  boxSizing: 'border-box',
  outline: 'none'
};

const AiHairstyleTab = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [generatedOutput, setGeneratedOutput] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [photoFit, setPhotoFit] = useState('contain');
  const [photoPositionY, setPhotoPositionY] = useState(42);
  const [photoZoom, setPhotoZoom] = useState(1.25);

  const [selectedHairType, setSelectedHairType] = useState('auto');
  const [selectedStyle, setSelectedStyle] = useState('ai_best');
  const [selectedColor, setSelectedColor] = useState('natural');
  const [selectedFaceShape, setSelectedFaceShape] = useState('auto');
  const [genderPreference, setGenderPreference] = useState('Auto');
  const [hairLength, setHairLength] = useState('Medium');
  const [occasion, setOccasion] = useState('Daily premium salon look');
  const [requirements, setRequirements] = useState('');
  const [keepIdentity, setKeepIdentity] = useState(true);

  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE_URL}/api/health`)
      .then(readJsonResponse)
      .then((data) => {
        if (isMounted) setBackendStatus(data.success ? 'online' : 'offline');
      })
      .catch(() => {
        if (isMounted) setBackendStatus('offline');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // சாத்தியமான பாதுகாப்பு சோதனையுடன் (Optional Chaining) மாற்றப்பட்ட useMemo
  const selectedSummary = useMemo(() => {
    return {
      style: stylesData[selectedStyle]?.name || 'AI Best Match',
      color: colorsData[selectedColor]?.name || 'Natural Black',
      hairType: hairTypesData[selectedHairType] || 'Auto Detect',
      faceShape: faceShapes[selectedFaceShape] || 'Auto Detect'
    };
  }, [selectedStyle, selectedColor, selectedHairType, selectedFaceShape]);

  const handlePhotoSelection = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file.');
      return;
    }

    // பழைய Blob URL ஐ மெமரியிலிருந்து நீக்குகிறது (Memory Leak Fix)
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setSelectedFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setGeneratedOutput(null);
    setErrorMessage('');
  };

  const triggerRealBackendAiGeneration = async () => {
    if (!selectedFile) {
      setErrorMessage('Upload your clear front-facing photo first.');
      return;
    }

    setIsGenerating(true);
    setErrorMessage('');
    setGeneratedOutput(null);

    const formData = new FormData();
    const aiReadyFile = await compressImageForAi(selectedFile, {
      positionY: photoPositionY,
      zoom: photoZoom
    });
    formData.append('image', aiReadyFile);
    formData.append('hairType', selectedSummary.hairType);
    formData.append('hairstyle', selectedSummary.style);
    formData.append('hairColor', selectedSummary.color);
    formData.append('faceShape', selectedSummary.faceShape);
    formData.append('genderPreference', genderPreference);
    formData.append('hairLength', hairLength);
    formData.append('occasion', occasion);
    formData.append('requirements', requirements);
    formData.append('keepIdentity', keepIdentity ? 'yes' : 'no');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000);

      const response = await fetch(`${API_BASE_URL}/api/generate-hairstyle`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await readJsonResponse(response);

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'AI generation failed.');
      }

      setGeneratedOutput(data);
      if (data.setupMessage || data.prediction?.setupMessage) {
        setErrorMessage(data.setupMessage || data.prediction.setupMessage);
      }
    } catch (err) {
      setErrorMessage(err.name === 'AbortError' ? 'AI took too long. Try a clearer face photo or use a smaller image.' : (err.message || 'Backend connection failed. Run npm run server and check API keys in .env.'));
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadGeneratedImage = () => {
    if (!generatedOutput?.imageUrl) return;

    const link = document.createElement('a');
    link.href = generatedOutput.imageUrl;
    link.download = 'ai-hairstyle-preview.png';
    link.click();
  };

  return (
    <div style={{ background: '#05070f', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '16px', boxSizing: 'border-box' }}>
      <style>{`
        @keyframes fadeInUpWindow {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatEffect {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes goldenScan {
          0% { transform: translateY(-100%); opacity: 0; }
          15% { opacity: 1; }
          100% { transform: translateY(420%); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 rgba(212,175,55,0); }
          50% { box-shadow: 0 0 30px rgba(212,175,55,0.25); }
        }
        .ai-layout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 1024px) {
          .ai-layout-grid {
            grid-template-columns: 0.92fr 1.08fr;
          }
        }
        .luxury-panel {
          background: #0b0f19;
          border: 1px solid rgba(212,175,55,0.15);
          border-radius: 16px;
          padding: 18px;
          animation: fadeInUpWindow 0.45s ease both;
        }
        .luxury-button-glow {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .luxury-button-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212,175,55,0.45);
          filter: brightness(1.08);
        }
        .option-btn {
          background: #05070f;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          text-align: left;
          font-size: 12px;
          transition: 0.25s ease;
        }
        .option-btn:hover {
          border-color: rgba(212,175,55,0.38);
          color: #FFE5A3;
        }
        .option-btn.active {
          background: rgba(212,175,55,0.12);
          border-color: #D4AF37;
          color: #FFE5A3;
        }
        .form-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .style-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .ai-preview-image {
          height: 360px;
          border-radius: 12px;
          overflow: hidden;
          background: #020617;
        }
        .ai-header-title {
          margin: 0 0 3px 0;
          font-size: 20px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #FFE5A3;
        }
        @media (max-width: 640px) {
          .luxury-panel {
            padding: 14px;
            border-radius: 12px;
          }
          .form-two-col,
          .style-options-grid {
            grid-template-columns: 1fr;
          }
          .ai-header-title {
            font-size: 17px;
            line-height: 1.25;
          }
          .option-btn {
            min-height: 54px;
          }
          .ai-preview-image {
            height: 260px;
          }
        }
        .floating-icon-node {
          animation: floatEffect 3s ease-in-out infinite;
        }
        .preview-shell {
          position: relative;
          overflow: hidden;
        }
        .preview-shell.generating::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 90px;
          top: 0;
          background: linear-gradient(180deg, rgba(212,175,55,0), rgba(212,175,55,0.32), rgba(212,175,55,0));
          animation: goldenScan 1.4s linear infinite;
          pointer-events: none;
        }
        .photo-adjust-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: center;
          margin-top: 10px;
        }
        .segmented-control {
          display: inline-flex;
          background: #05070f;
          border: 1px solid rgba(212,175,55,0.18);
          border-radius: 8px;
          overflow: hidden;
        }
        .segmented-control button {
          border: 0;
          background: transparent;
          color: #94a3b8;
          padding: 8px 10px;
          font-size: 11px;
          font-weight: 900;
          cursor: pointer;
        }
        .segmented-control button.active {
          background: rgba(212,175,55,0.16);
          color: #FFE5A3;
        }
        .range-row {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          font-size: 11px;
          font-weight: 800;
        }
        .range-row input {
          width: 100%;
          accent-color: #D4AF37;
        }
        input::placeholder,
        textarea::placeholder {
          color: #64748b;
        }
        @media (max-width: 640px) {
          .photo-adjust-grid {
            grid-template-columns: 1fr;
          }
          .segmented-control {
            width: 100%;
          }
          .segmented-control button {
            flex: 1;
          }
        }
      `}</style>

      <div style={{
        marginBottom: '16px',
        background: '#0b0f19',
        padding: '16px 20px',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        flexWrap: 'wrap'
      }}>
        <div>
          <h2 className="ai-header-title">
            <Wand2 size={24} className="floating-icon-node" style={{ color: '#D4AF37' }} />
            AI HAIRSTYLE STUDIO
          </h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>
            Upload photo, choose requirements, get AI predicted salon hairstyle preview.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#05070f',
          border: '1px solid rgba(212,175,55,0.16)',
          borderRadius: '10px',
          padding: '8px 10px',
          color: '#22c55e',
          fontSize: '12px',
          fontWeight: 800
        }}>
          <ShieldCheck size={16} />
          {backendStatus === 'online' ? 'Backend Online' : backendStatus === 'checking' ? 'Checking Backend' : 'Backend Offline'}
        </div>
      </div>

      {errorMessage && (
        <div style={{
          marginBottom: '14px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.35)',
          color: '#fecaca',
          borderRadius: '12px',
          padding: '12px 14px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          fontSize: '13px'
        }}>
          <AlertCircle size={18} />
          {errorMessage}
        </div>
      )}

      <div className="ai-layout-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="luxury-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '11px', color: '#D4AF37', fontWeight: 900 }}>
              <span>1. SOURCE PHOTO</span>
              <span>REQUIRED</span>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: '#05070f',
                border: '1px dashed rgba(212,175,55,0.35)',
                borderRadius: '12px',
                minHeight: '190px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoSelection} style={{ display: 'none' }} />

              {photoPreview ? (
                <>
                  <img
                    src={photoPreview}
                    alt="Uploaded face"
                    style={{
                      width: '100%',
                      height: '260px',
                      objectFit: photoFit,
                      objectPosition: `50% ${photoPositionY}%`,
                      background: '#020617'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    left: '12px',
                    bottom: '12px',
                    background: 'rgba(5,7,15,0.88)',
                    border: '1px solid rgba(212,175,55,0.35)',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    color: '#FFE5A3',
                    fontSize: '12px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '7px'
                  }}>
                    <Check size={15} /> Photo locked
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <Upload size={30} style={{ color: '#D4AF37', marginBottom: '10px' }} />
                  <div style={{ fontSize: '13px', color: '#FFE5A3', fontWeight: 900 }}>Upload clear face photo</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '5px' }}>Front-facing photo gives better prediction</div>
                </div>
              )}
            </div>

            {photoPreview && (
              <div className="photo-adjust-grid">
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div className="range-row">
                    <span>Top</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={photoPositionY}
                      onChange={(e) => setPhotoPositionY(Number(e.target.value))}
                      aria-label="Adjust AI crop vertical position"
                    />
                    <span>Bottom</span>
                  </div>
                  <div className="range-row">
                    <span>Zoom</span>
                    <input
                      type="range"
                      min="1"
                      max="2.4"
                      step="0.05"
                      value={photoZoom}
                      onChange={(e) => setPhotoZoom(Number(e.target.value))}
                      aria-label="Adjust AI crop zoom"
                    />
                    <span>{photoZoom.toFixed(2)}x</span>
                  </div>
                </div>
                <div className="segmented-control" aria-label="Photo fit mode">
                  {['contain', 'cover'].map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      className={photoFit === fit ? 'active' : ''}
                      onClick={() => setPhotoFit(fit)}
                    >
                      {fit === 'contain' ? 'Fit' : 'Crop'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="luxury-panel" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 900 }}>2. REQUIREMENTS</div>

            <div className="form-two-col">
              <div>
                <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Face Shape</label>
                <select value={selectedFaceShape} onChange={(e) => setSelectedFaceShape(e.target.value)} style={inputStyle}>
                  {Object.entries(faceShapes).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                </select>
              </div>

              <div>
                <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Hair Type</label>
                <select value={selectedHairType} onChange={(e) => setSelectedHairType(e.target.value)} style={inputStyle}>
                  {Object.entries(hairTypesData).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                </select>
              </div>
            </div>

            <div className="form-two-col">
              <div>
                <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Gender Style</label>
                <select value={genderPreference} onChange={(e) => setGenderPreference(e.target.value)} style={inputStyle}>
                  <option value="Auto">Auto</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>

              <div>
                <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Target Length</label>
                <select value={hairLength} onChange={(e) => setHairLength(e.target.value)} style={inputStyle}>
                  <option value="Short">Short</option>
                  <option value="Medium">Medium</option>
                  <option value="Long">Long</option>
                  <option value="Keep current length">Keep current length</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '6px' }}>Predicted Hairstyle</label>
              <div className="style-options-grid">
                {Object.entries(stylesData).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedStyle(key)}
                    className={`option-btn ${selectedStyle === key ? 'active' : ''}`}
                  >
                    <strong style={{ display: 'block', marginBottom: '3px' }}>{item.name}</strong>
                    <span style={{ fontSize: '10px', color: selectedStyle === key ? '#f8e7b0' : '#64748b' }}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '6px' }}>Hair Color</label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
                {Object.entries(colorsData).map(([key, item]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedColor(key)}
                    className={`option-btn ${selectedColor === key ? 'active' : ''}`}
                    style={{ minWidth: '122px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: item.swatch, border: '1px solid rgba(255,255,255,0.28)' }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ color: '#FFE5A3', fontSize: '11px', fontWeight: 800, display: 'block', marginBottom: '5px' }}>Occasion</label>
              <input value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Example: wedding, college, office, party..." style={inputStyle} />
            </div>

            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Your exact requirement: low maintenance, hide forehead, volume, professional look, beard match..."
              style={{ ...inputStyle, minHeight: '78px', resize: 'vertical' }}
            />

            <label style={{ display: 'flex', gap: '9px', alignItems: 'center', color: '#94a3b8', fontSize: '12px', cursor: 'pointer' }}>
              <input type="checkbox" checked={keepIdentity} onChange={(e) => setKeepIdentity(e.target.checked)} />
              Keep face identity realistic, only change hairstyle
            </label>

            <button
              onClick={triggerRealBackendAiGeneration}
              disabled={isGenerating}
              className="luxury-button-glow"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #AA771C, #D4AF37)',
                color: '#05070f',
                fontWeight: 900,
                fontSize: '14px',
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '9px',
                opacity: isGenerating ? 0.75 : 1
              }}
            >
              {isGenerating ? <RefreshCw size={17} className="floating-icon-node" /> : <Sparkles size={17} />}
              {isGenerating ? 'Predicting and generating...' : 'Generate AI Hairstyle'}
            </button>
          </div>
        </div>

        <div className="luxury-panel" style={{ minHeight: '620px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 900 }}>3. REAL AI PREVIEW</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '3px' }}>Before / after with prediction notes</div>
            </div>

            {generatedOutput?.imageUrl && (
              <button
                onClick={downloadGeneratedImage}
                className="luxury-button-glow"
                style={{
                  border: '1px solid rgba(212,175,55,0.32)',
                  background: '#05070f',
                  color: '#FFE5A3',
                  borderRadius: '8px',
                  padding: '9px 11px',
                  cursor: 'pointer',
                  display: 'flex',
                  gap: '7px',
                  alignItems: 'center',
                  fontWeight: 800,
                  fontSize: '12px'
                }}
              >
                <Download size={15} /> Download
              </button>
            )}
          </div>

          <div className={`preview-shell ${isGenerating ? 'generating' : ''}`} style={{
            background: '#05070f',
            border: '1px solid rgba(212,175,55,0.12)',
            borderRadius: '14px',
            minHeight: '420px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: isGenerating ? 'pulseGlow 1.5s ease-in-out infinite' : 'none'
          }}>
            {isGenerating && (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <RefreshCw size={34} style={{ color: '#D4AF37', marginBottom: '12px' }} className="floating-icon-node" />
                <div style={{ color: '#FFE5A3', fontWeight: 900, fontSize: '15px' }}>AI is checking hair only</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>Face and body are locked; only hairstyle recommendation is being processed.</div>
              </div>
            )}

            {!isGenerating && !generatedOutput && (
              <div style={{ textAlign: 'center', padding: '24px' }}>
                <Camera size={38} style={{ color: '#D4AF37', marginBottom: '12px' }} />
                <div style={{ color: '#FFE5A3', fontWeight: 900, fontSize: '15px' }}>No AI preview yet</div>
                <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>Upload photo and click generate.</div>
              </div>
            )}

            {!isGenerating && generatedOutput && (
              <div style={{ width: '100%', padding: '14px', boxSizing: 'border-box' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 900, marginBottom: '6px' }}>BEFORE</div>
                    <div className="ai-preview-image">
                      <img src={photoPreview} alt="Before hairstyle" style={{ width: '100%', height: '100%', objectFit: photoFit, objectPosition: '50% ' + photoPositionY + '%', transform: photoFit === 'cover' ? 'scale(' + photoZoom + ')' : 'none', background: '#020617' }} />
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '10px', color: '#D4AF37', fontWeight: 900, marginBottom: '6px' }}>AFTER AI PREDICTION</div>
                    <div className="ai-preview-image" style={{ border: '2px solid #D4AF37' }}>
                      <img src={generatedOutput.imageUrl} alt="Generated hairstyle" style={{ width: '100%', height: '100%', objectFit: photoFit, objectPosition: '50% ' + photoPositionY + '%', transform: photoFit === 'cover' ? 'scale(' + photoZoom + ')' : 'none', background: '#020617' }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  marginTop: '12px',
                  background: '#0b0f19',
                  border: '1px solid rgba(212,175,55,0.14)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'grid',
                  gap: '9px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '13px', fontWeight: 900 }}>
                    <BadgeCheck size={17} /> AI Prediction Ready
                  </div>

                  <div style={{ color: '#94a3b8', fontSize: '12px', lineHeight: 1.55 }}>
                    <strong style={{ color: '#FFE5A3' }}>Suggested:</strong> {generatedOutput.prediction?.recommendedStyle || selectedSummary.style}<br />
                    <strong style={{ color: '#FFE5A3' }}>Detected Face:</strong> {generatedOutput.prediction?.detectedFaceShape || selectedSummary.faceShape}<br />
                    <strong style={{ color: '#FFE5A3' }}>Confidence:</strong> {generatedOutput.prediction?.confidence || generatedOutput.metadata?.confidence || 'Ready'}%<br />
                    <strong style={{ color: '#FFE5A3' }}>Why:</strong> {generatedOutput.prediction?.reason || 'Matched with your selected requirement and salon-ready look.'}<br />
                    <strong style={{ color: '#FFE5A3' }}>Salon Notes:</strong> {generatedOutput.prediction?.salonNotes || generatedOutput.prediction?.suitability || 'Keep it natural and salon realistic.'}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {[selectedSummary.hairType, selectedSummary.color, hairLength, genderPreference].map((item) => (
                      <span key={item} style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#FFE5A3', borderRadius: '999px', padding: '6px 9px', fontSize: '11px', fontWeight: 800 }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
            <div style={{ background: '#05070f', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '10px', padding: '11px' }}>
              <UserCheck size={17} style={{ color: '#D4AF37', marginBottom: '6px' }} />
              <div style={{ color: '#FFE5A3', fontSize: '12px', fontWeight: 900 }}>Face Aware</div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>Uses face shape input</div>
            </div>

            <div style={{ background: '#05070f', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '10px', padding: '11px' }}>
              <Palette size={17} style={{ color: '#D4AF37', marginBottom: '6px' }} />
              <div style={{ color: '#FFE5A3', fontSize: '12px', fontWeight: 900 }}>Color Preview</div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>Salon color matching</div>
            </div>

            <div style={{ background: '#05070f', border: '1px solid rgba(212,175,55,0.12)', borderRadius: '10px', padding: '11px' }}>
              <Scissors size={17} style={{ color: '#D4AF37', marginBottom: '6px' }} />
              <div style={{ color: '#FFE5A3', fontSize: '12px', fontWeight: 900 }}>Style Control</div>
              <div style={{ color: '#64748b', fontSize: '11px' }}>Requirement based output</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiHairstyleTab;







