const fs = require('fs');
const { env } = require('../config/env');
const { ApiError } = require('../utils/ApiError');

function isValidImageSignature(file) {
  const buffer = fs.readFileSync(file.path);
  const hex = buffer.subarray(0, 12).toString('hex');

  if (file.mimetype === 'image/png') return hex.startsWith('89504e470d0a1a0a');
  if (file.mimetype === 'image/jpeg') return hex.startsWith('ffd8ff');
  if (file.mimetype === 'image/webp') return buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP';

  return false;
}

function fallbackCaptions(style, mood) {
  return {
    captions: [
      `${mood} views, ${style} state of mind.`,
      `Some journeys deserve a passport stamp and a slow golden-hour pause.`,
      `Out of office, into the kind of travel story worth remembering.`,
    ],
    hashtags: [
      '#MyGlobalTrips',
      '#LuxuryTravel',
      '#TravelGoals',
      '#WanderMore',
      '#PremiumTravel',
      '#VacationMode',
      '#TravelInStyle',
      '#GlobalEscapes',
      '#DreamTrip',
      '#PassportReady',
      '#TravelConcierge',
      '#ExploreTheWorld',
    ],
  };
}

function parseCaptionJson(content, style, mood) {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallbackCaptions(style, mood);
    const parsed = JSON.parse(jsonMatch[0]);

    return {
      captions: Array.isArray(parsed.captions) ? parsed.captions.slice(0, 3) : fallbackCaptions(style, mood).captions,
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags.slice(0, 12) : fallbackCaptions(style, mood).hashtags,
    };
  } catch (error) {
    return fallbackCaptions(style, mood);
  }
}

async function generateWithGemini(input, file, imageBase64) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.geminiTimeoutMs);
  const model = env.geminiVisionModel.replace(/^models\//, '');
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(env.geminiApiKey)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `You are a travel social media expert. Generate exactly 3 Instagram captions and 12 hashtags for this image. Style: ${input.style}. Mood: ${input.mood}. Return strict JSON with keys captions and hashtags.`,
              },
              {
                inline_data: {
                  mime_type: file.mimetype,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: 'application/json',
        },
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new ApiError(payload.error?.message || 'Gemini caption generation failed', response.status);
    }

    return payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n') || '';
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new ApiError('Gemini caption generation timed out. Please try again.', 504);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function generateCaption(input, file) {
  if (!file) {
    throw new ApiError('Image upload is required', 400);
  }

  if (!isValidImageSignature(file)) {
    fs.unlink(file.path, () => {});
    throw new ApiError('Uploaded file content does not match an allowed image type', 400);
  }

  const imageUrl = `${env.publicBaseUrl}/uploads/${file.filename}`;

  if (!env.geminiApiKey) {
    return {
      ...fallbackCaptions(input.style, input.mood),
      imageUrl,
      model: 'local-fallback',
    };
  }

  const imageBase64 = fs.readFileSync(file.path, 'base64');
  const content = await generateWithGemini(input, file, imageBase64);

  return {
    ...parseCaptionJson(content, input.style, input.mood),
    imageUrl,
    model: env.geminiVisionModel.replace(/^models\//, ''),
  };
}

module.exports = { generateCaption };
