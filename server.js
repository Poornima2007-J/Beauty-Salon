require('dotenv').config({ override: true });

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const { toFile } = require('openai/uploads');

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image files are allowed.'));
      return;
    }
    cb(null, true);
  }
});

const gemini = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

app.use(cors({ origin: true }));
app.use(express.json({ limit: '10mb' }));

const withTimeout = async (promise, ms, message) => {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId);
  }
};

const jsonFallback = (value, fallback) => {
  if (!value) return fallback;
  try {
    const clean = value.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (error) {
    return fallback;
  }
};

const buildPredictionFallback = (body) => ({
  recommendedStyle: body.hairstyle || 'AI Best Match',
  detectedFaceShape: body.faceShape || 'Auto Detect',
  detectedHairType: body.hairType || 'Auto Detect',
  confidence: 72,
  reason: 'Matched with your selected face shape, hair type, length and salon requirement.',
  salonNotes: 'Use a clear front-facing photo and natural light for better hairstyle prediction.',
  careTips: ['Ask stylist to preserve natural hairline', 'Keep layers blended around the face', 'Use light styling product for daily maintenance'],
  suitability: 'Good everyday salon look with controlled maintenance.'
});

const predictWithOllama = async (file, body, fallback) => {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2-vision';

  const prompt = `Analyze this customer's photo for a salon hairstyle recommendation. Do not recommend changes to face shape, skin, body, pose, clothing or background. Return strict JSON only with keys: recommendedStyle, detectedFaceShape, detectedHairType, confidence, reason, salonNotes, careTips, suitability.

Customer choices:
- Desired style: ${body.hairstyle || 'AI Best Match'}
- Selected hair type: ${body.hairType || 'Auto Detect'}
- Hair color: ${body.hairColor || 'Natural'}
- Selected face shape: ${body.faceShape || 'Auto Detect'}
- Gender style: ${body.genderPreference || 'Auto'}
- Target length: ${body.hairLength || 'Medium'}
- Occasion: ${body.occasion || 'Daily salon look'}
- Extra requirement: ${body.requirements || 'No extra requirement'}

Rules: choose a realistic hairstyle only; never suggest changing face shape or facial features; confidence must be 0-100; careTips must be 3 short strings.`;

  const response = await withTimeout(fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: ollamaModel,
      prompt,
      images: [file.buffer.toString('base64')],
      stream: false,
      format: 'json'
    })
  }), Number(process.env.LOCAL_AI_TIMEOUT_MS || 45000), 'Local AI prediction timed out. Use a clearer face photo or a smaller image.');

  if (!response.ok) {
    throw new Error(`Ollama local AI failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    ...fallback,
    ...jsonFallback(data.response, fallback),
    aiProvider: 'ollama-local',
    modelUsed: ollamaModel
  };
};

const predictHairstyle = async (file, body) => {
  const fallback = buildPredictionFallback(body);

  if (process.env.LOCAL_AI_PROVIDER === 'ollama') {
    try {
      return await predictWithOllama(file, body, fallback);
    } catch (error) {
      return {
        ...fallback,
        aiProvider: 'fallback',
        setupMessage: error.message.includes('timed out')
          ? 'Local AI took too long. I used fallback prediction; try a smaller face-focused image or increase LOCAL_AI_TIMEOUT_MS in .env.'
          : `${error.message}. If the model is missing, run: ollama pull ${process.env.OLLAMA_MODEL || 'llava'}, then restart backend.`
      };
    }
  }

  if (!gemini) {
    return {
      ...fallback,
      aiProvider: 'fallback',
      setupMessage: 'Add GEMINI_API_KEY in .env for image-aware prediction.'
    };
  }

  const modelNames = [
    process.env.GEMINI_MODEL,
    'gemini-2.0-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash-lite'
  ].filter(Boolean);

  const imagePart = {
    inlineData: {
      data: file.buffer.toString('base64'),
      mimeType: file.mimetype
    }
  };

  const prompt = `You are a professional salon AI consultant. Analyze only the uploaded hair area, face outline, and customer choices. Do not change or recommend changing face shape, skin, body, pose, clothing, or background. Return strict JSON only with these keys: recommendedStyle, detectedFaceShape, detectedHairType, confidence, reason, salonNotes, careTips, suitability.

Customer choices:
- Desired style: ${body.hairstyle || 'AI Best Match'}
- Selected hair type: ${body.hairType || 'Auto Detect'}
- Hair color: ${body.hairColor || 'Natural'}
- Selected face shape: ${body.faceShape || 'Auto Detect'}
- Gender style: ${body.genderPreference || 'Auto'}
- Target length: ${body.hairLength || 'Medium'}
- Occasion: ${body.occasion || 'Daily salon look'}
- Extra requirement: ${body.requirements || 'No extra requirement'}

Rules:
- If style is AI Best Match, choose the most suitable hairstyle from current hair volume, visible hairline, face outline, and customer requirement.
- Prefer practical salon styles that can be achieved on real hair.
- confidence must be a number from 0 to 100.
- careTips must be an array of 3 short strings.`;

  let lastError;

  for (const modelName of modelNames) {
    try {
      const model = gemini.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: 'application/json' }
      });
      const result = await model.generateContent([prompt, imagePart]);
      const text = result.response.text();

      return {
        ...fallback,
        ...jsonFallback(text, fallback),
        aiProvider: 'gemini',
        modelUsed: modelName
      };
    } catch (error) {
      lastError = error;
      const message = error?.message || '';
      const canTryNextModel = message.includes('404') || message.includes('not found') || message.includes('not supported');
      const quotaExceeded = message.includes('429') || message.includes('Too Many Requests') || message.includes('Quota exceeded');

      if (quotaExceeded) {
        return {
          ...fallback,
          aiProvider: 'fallback',
          quotaExceeded: true,
          setupMessage: 'Gemini quota exceeded right now. Showing local salon prediction fallback; retry later or add billing/quota in Google AI Studio.'
        };
      }

      if (!canTryNextModel) throw error;
    }
  }

  return {
    ...fallback,
    aiProvider: 'fallback',
    setupMessage: `Gemini model unavailable. Set GEMINI_MODEL in .env to a model that supports generateContent. Last error: ${lastError?.message || 'Unknown error'}`
  };
};

const editHairstyleImage = async (file, body, prediction) => {
  if (!openai) {
    return {
      imageUrl: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      imageEdited: false,
      imageProvider: 'original-photo',
      imageSetupMessage: 'Add OPENAI_API_KEY in .env to generate an edited hairstyle image.'
    };
  }

  const imageFile = await toFile(file.buffer, file.originalname || 'customer-photo.png', {
    type: file.mimetype
  });

  const prompt = `Create a realistic salon hairstyle makeover from this exact customer photo.
STRICT IDENTITY LOCK: preserve the exact same face, face shape, jawline, forehead shape, eyes, nose, lips, skin tone, expression, age, body, clothes, pose and background. Change only scalp hair and visible hair strands.
Make the result photorealistic, natural and salon-ready, not cartoon and not a different person. Do not reshape the face, do not beautify facial features, do not alter body/clothes/background.
Recommended hairstyle: ${prediction.recommendedStyle || body.hairstyle || 'AI Best Match'}.
Hair color: ${body.hairColor || 'Natural'}.
Hair type target: ${prediction.detectedHairType || body.hairType || 'natural'}.
Target length: ${body.hairLength || 'Medium'}.
Gender style: ${body.genderPreference || 'Auto'}.
Occasion: ${body.occasion || 'Daily salon look'}.
Extra requirement: ${body.requirements || 'natural premium salon look'}.
Identity preservation: ${body.keepIdentity === 'yes' ? 'very high' : 'high'}.`;

  try {
    const result = await withTimeout(openai.images.edit({
      model: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1',
      image: imageFile,
      prompt,
      size: process.env.OPENAI_IMAGE_SIZE || '1024x1024'
    }), Number(process.env.IMAGE_EDIT_TIMEOUT_MS || 60000), 'Image edit timed out. Showing prediction without edited image.');

    const imageBase64 = result.data?.[0]?.b64_json;
    if (!imageBase64) {
      throw new Error('Image AI did not return an edited image.');
    }

    return {
      imageUrl: `data:image/png;base64,${imageBase64}`,
      imageEdited: true,
      imageProvider: 'openai'
    };
  } catch (error) {
    const message = error?.message || '';
    const billingOrQuota = message.includes('Billing hard limit')
      || message.includes('billing')
      || message.includes('quota')
      || message.includes('429')
      || message.includes('insufficient_quota')
      || message.includes('timed out');

    if (!billingOrQuota) throw error;

    return {
      imageUrl: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      imageEdited: false,
      imageProvider: 'original-photo',
      imageSetupMessage: 'OpenAI image billing/quota limit reached. Prediction is shown, but edited hairstyle image needs billing/quota enabled.'
    };
  }
};


const assistantSessions = new Map();

const assistantFallbackReply = (message) => {
  const q = String(message || '').toLowerCase();

  if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
    return 'Salon price depends on service, hair length and stylist level. For a safe estimate: basic haircut starts around budget range, styling/color/treatment costs more after consultation. Tell me the service name and hair length, I will estimate better.';
  }

  if (q.includes('hair fall') || q.includes('hairfall')) {
    return 'For hair fall, first check dandruff, stress, diet, sleep, harsh products and heat styling. Use mild shampoo, avoid tight hairstyles, improve protein/iron intake, and book a scalp consultation if shedding is heavy for more than 4-6 weeks.';
  }

  if (q.includes('bridal')) {
    return 'Bridal package usually includes makeup, hairstyle, saree/dupatta draping, trial options and add-ons for pre-bridal skin/hair care. Share wedding date, venue time and preferred look, I can suggest a package plan.';
  }

  if (q.includes('booking') || q.includes('appointment')) {
    return 'For booking, choose service, preferred date/time, stylist preference and contact number. Peak slots fill faster, so weekends and bridal services should be booked early.';
  }

  if (q.includes('hairstyle') || q.includes('hair style') || q.includes('haircut')) {
    return 'For hairstyle prediction, upload a clear front-facing photo in AI Hairstyle Try-On. A good recommendation depends on face outline, current hair volume, hair type, length target and maintenance preference.';
  }

  return 'I can help with salon services, hairstyle advice, skin/hair care, bookings, offers, prices, and general questions. Ask with a little detail like your hair type, face shape, budget or occasion for a more accurate answer.';
};

const sanitizeAssistantReply = (reply) => {
  const text = String(reply || '').replace(/\r/g, '').trim();
  const cleaned = text
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.trim())
    .filter((line) => !/[\u0B80-\u0BFF]/.test(line))
    .filter((line) => !/would you like me to book|i can book|book an appointment for you/i.test(line))
    .join('\n')
    .replace(/[\u0B80-\u0BFF]+/g, '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, '-')
    .trim();

  if (!cleaned) {
    return 'I can help with that. Please share one more detail so I can give a precise answer.';
  }

  return cleaned;
};
const askLocalAssistant = async (message, history = []) => {
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  const model = process.env.OLLAMA_ASSISTANT_MODEL || process.env.OLLAMA_MODEL || 'llava';
  const context = history
    .slice(-6)
    .map((item) => `${item.role === 'user' ? 'Customer' : 'Assistant'}: ${item.content}`)
    .join('\n');

  const prompt = `You are Kovai Salon AI Assistant, a professional English-only assistant for a salon portal.

Rules you must follow:
- Reply only in English. Do not use Tamil words, Tamil script, or Tanglish.
- Answer any user question as helpfully and accurately as possible.
- If the question is about salon, hair, skin, beauty, pricing, booking, offers, or hairstyle, give practical salon-ready guidance.
- If the question is general knowledge, answer directly and clearly.
- If the answer is uncertain, say what is uncertain and give the safest next step.
- For medical, legal, financial, or emergency topics, give general information only and recommend a qualified professional.
- Do not invent exact salon prices, availability, addresses, phone numbers, or offers unless the user provided them.
- Keep answers concise: 3 to 7 short sentences unless the user asks for details.
- Be polite, confident, and useful. Avoid filler.

Recent conversation:
${context || 'No previous messages.'}

Customer question: ${message}

Assistant answer in English only:`;

  const response = await withTimeout(fetch(`${ollamaUrl}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false
    })
  }), Number(process.env.ASSISTANT_TIMEOUT_MS || 45000), 'Local assistant took too long.');

  if (!response.ok) {
    throw new Error(`Local assistant failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return {
    reply: sanitizeAssistantReply(data.response?.trim() || assistantFallbackReply(message)),
    provider: 'ollama-local',
    model
  };
};
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AI hairstyle backend is running. Use /api/health or /api/generate-hairstyle.',
    healthUrl: '/api/health'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'AI hairstyle backend running',
    providers: {
      prediction: process.env.LOCAL_AI_PROVIDER === 'ollama' || Boolean(process.env.GEMINI_API_KEY),
      localVision: process.env.LOCAL_AI_PROVIDER === 'ollama',
      imageEdit: Boolean(process.env.OPENAI_API_KEY),
      assistant: true
    }
  });
});


app.post('/api/ai-assistant', async (req, res) => {
  try {
    const { message, sessionId } = req.body || {};

    if (!message || !String(message).trim()) {
      return res.status(400).json({
        success: false,
        reply: 'Please type a question first.'
      });
    }

    try {
      const cleanMessage = String(message).trim();
      const history = assistantSessions.get(sessionId || 'default') || [];
      const answer = await askLocalAssistant(cleanMessage, history);
      return res.json({
        success: true,
        reply: answer.reply,
        provider: answer.provider,
        model: answer.model,
        sessionId
      });
    } catch (error) {
      return res.json({
        success: true,
        reply: assistantFallbackReply(message),
        provider: 'fallback',
        setupMessage: error.message
      });
    }
  } catch (error) {
    console.error('AI assistant error:', error);
    res.status(500).json({
      success: false,
      reply: 'Assistant failed. Please try again.'
    });
  }
});
app.post('/api/generate-hairstyle', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is required.' });
    }

    const prediction = await predictHairstyle(req.file, req.body);
    const imageResult = await editHairstyleImage(req.file, req.body, prediction);

    res.json({
      success: true,
      ...imageResult,
      prediction,
      metadata: {
        appliedStyle: prediction.recommendedStyle || req.body.hairstyle,
        appliedType: prediction.detectedHairType || req.body.hairType,
        appliedColor: req.body.hairColor,
        faceShape: prediction.detectedFaceShape || req.body.faceShape,
        occasion: req.body.occasion,
        confidence: prediction.confidence
      }
    });
  } catch (error) {
    console.error('AI hairstyle error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'AI hairstyle generation failed.'
    });
  }
});

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found: ' + req.originalUrl });
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError || error.message === 'Only image files are allowed.') {
    return res.status(400).json({ success: false, message: error.message });
  }
  next(error);
});

const port = process.env.BACKEND_PORT || 5000;
app.listen(port, () => {
  console.log(`AI hairstyle backend running on http://localhost:${port}`);
});














