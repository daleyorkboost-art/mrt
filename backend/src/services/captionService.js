const fs = require('fs');
const { createOpenAIClient } = require('../config/openai');
const { env } = require('../config/env');
const { ApiError } = require('../utils/ApiError');

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

async function generateCaption(input, file) {
  if (!file) {
    throw new ApiError('Image upload is required', 400);
  }

  const imageUrl = `${env.publicBaseUrl}/uploads/${file.filename}`;
  const openai = createOpenAIClient();

  if (!openai) {
    return {
      ...fallbackCaptions(input.style, input.mood),
      imageUrl,
      model: 'mock-fallback',
    };
  }

  const imageBase64 = fs.readFileSync(file.path, 'base64');
  const response = await openai.chat.completions.create({
    model: env.openaiVisionModel,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You are a travel social media expert. Generate exactly 3 Instagram captions and 12 hashtags for this image. Style: ${input.style}. Mood: ${input.mood}. Return strict JSON with keys captions and hashtags.`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${file.mimetype};base64,${imageBase64}`,
            },
          },
        ],
      },
    ],
    temperature: 0.8,
  });

  const content = response.choices?.[0]?.message?.content || '';

  return {
    ...parseCaptionJson(content, input.style, input.mood),
    imageUrl,
    model: env.openaiVisionModel,
  };
}

module.exports = { generateCaption };
