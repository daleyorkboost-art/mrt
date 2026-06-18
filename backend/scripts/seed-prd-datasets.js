const fs = require('fs');
const path = require('path');

const dataDir = path.resolve(__dirname, '../src/data');

const destinations = [
  ['dubai', 'Dubai', 'UAE', ['luxury', 'shopping', 'desert', 'city']],
  ['maldives', 'Maldives', 'Maldives', ['luxury', 'beach', 'wellness', 'romantic']],
  ['bali', 'Bali', 'Indonesia', ['wellness', 'culture', 'beach', 'nature']],
  ['paris', 'Paris', 'France', ['romantic', 'culture', 'food', 'luxury']],
  ['japan', 'Japan Golden Route', 'Japan', ['culture', 'food', 'adventure', 'family']],
  ['switzerland', 'Swiss Alps', 'Switzerland', ['nature', 'adventure', 'luxury', 'wellness']],
  ['singapore', 'Singapore', 'Singapore', ['family', 'city', 'food', 'shopping']],
  ['thailand', 'Thailand Island Luxe', 'Thailand', ['beach', 'food', 'wellness', 'adventure']],
  ['turkey', 'Istanbul and Cappadocia', 'Turkey', ['culture', 'history', 'romantic', 'adventure']],
  ['italy', 'Rome and Amalfi', 'Italy', ['culture', 'food', 'romantic', 'luxury']],
];

const images = [
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
  'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
];

const groups = ['solo', 'couple', 'family', 'group', 'friends', 'family with kids', 'group of friends'];
const budgets = ['budget', 'mid-range', 'premium', 'ultra luxury', '$1k-$3k', '$3k-$6k', '$6k-$10k', '$10k+'];

const trips = Array.from({ length: 50 }, (_, index) => {
  const base = destinations[index % destinations.length];
  const styleSeed = base[3];
  const budget = budgets[index % budgets.length];
  return {
    id: `${base[0]}-${index + 1}`,
    destination: `${base[1]} ${index % 5 === 0 ? 'Signature' : index % 5 === 1 ? 'Premium' : index % 5 === 2 ? 'Family' : index % 5 === 3 ? 'Romance' : 'Explorer'} Escape`,
    country: base[2],
    styles: [...new Set([...styleSeed, index % 2 === 0 ? 'relaxation' : 'adventure', index % 3 === 0 ? 'honeymoon' : 'cultural'])],
    groups: [groups[index % groups.length], groups[(index + 2) % groups.length], 'couple'],
    budgets: [budget, index % 2 === 0 ? 'premium' : 'mid-range'],
    image: images[index % images.length],
    highlights: [
      'Curated 4-star and 5-star stays',
      'Private transfers and guided experiences',
      `${base[1]} insider dining and local access`,
    ],
    packageName: `${base[1]} ${index + 3}-Night Curated Package`,
    duration: `${3 + (index % 8)} nights`,
    popularity: 100 - index,
  };
});

const itineraryTemplates = Array.from({ length: 30 }, (_, index) => {
  const base = destinations[index % destinations.length];
  const duration = 2 + (index % 13);
  const travellerType = ['solo', 'couple', 'family', 'group'][index % 4];
  const interests = [...base[3], ['nightlife', 'shopping', 'wellness', 'history', 'food'][index % 5]];
  return {
    id: `${base[0]}-${duration}-${travellerType}-${index}`,
    destination: base[1].split(' ')[0],
    duration,
    duration_nights: duration,
    travellerType,
    traveller_type: [travellerType],
    interests,
    days: Array.from({ length: Math.min(duration, 7) }, (_, dayIndex) => ({
      day: dayIndex + 1,
      day_number: dayIndex + 1,
      title: `${base[1]} Day ${dayIndex + 1}`,
      morning: {
        activity: `Private ${base[1]} orientation`,
        description: 'Start with a paced premium experience and local guide briefing.',
        duration_hrs: 2,
        cost_note: 'Included in guided package',
      },
      afternoon: {
        activity: `${interests[dayIndex % interests.length]} experience`,
        description: 'Curated activity selected from the traveller interest profile.',
        duration_hrs: 3,
        cost_note: 'Varies by supplier tier',
      },
      evening: {
        activity: 'Signature dinner or relaxed local evening',
        description: 'Premium dinner recommendation with transfer-friendly timing.',
        duration_hrs: 2,
        cost_note: 'Dining paid directly unless packaged',
      },
      tip: 'Keep one flexible buffer block for weather, traffic, or private supplier timing.',
      activities: [
        `Morning: Private ${base[1]} orientation`,
        `Afternoon: ${interests[dayIndex % interests.length]} experience`,
        'Evening: Signature dinner or relaxed local evening',
      ],
    })),
  };
});

const categories = [
  ['Packages & Destinations', ['package', 'destination', 'tour', 'hotel']],
  ['Visa & Travel Documents', ['visa', 'passport', 'documents', 'insurance']],
  ['Cancellation & Refunds', ['cancel', 'refund', 'reschedule', 'policy']],
  ['Payments & Pricing', ['payment', 'price', 'budget', 'installment']],
  ['Booking Process', ['booking', 'confirm', 'quote', 'reservation']],
  ['General / Misc', ['support', 'contact', 'whatsapp', 'help']],
];

const faq = Array.from({ length: 72 }, (_, index) => {
  const category = categories[index % categories.length];
  return {
    id: `faq-${index + 1}`,
    keywords: [...category[1], `${category[1][0]}-${index + 1}`],
    category: category[0],
    answer: `For ${category[0].toLowerCase()}, MyGlobalTrips provides curated guidance through our travel desk. Share your destination, dates, traveller count, and preferences so our team can advise the right next step.`,
    follow_up_suggestions: ['Generate a quote', 'Chat on WhatsApp', 'Build an itinerary'],
  };
});

const passports = ['IN', 'US', 'GB', 'AE', 'SG', 'CA', 'AU', 'FR', 'DE', 'ZA'];
const visaDestinations = ['UAE', 'TH', 'JP', 'FR', 'CH', 'SG', 'ID', 'TR', 'MV', 'GB'];
const visa = Array.from({ length: 50 }, (_, index) => {
  const passport = passports[index % passports.length];
  const destination = visaDestinations[(index * 3) % visaDestinations.length];
  const type = index % 4 === 0 ? 'Visa-Free' : index % 4 === 1 ? 'Visa on Arrival' : index % 4 === 2 ? 'eVisa' : 'Embassy Visa Required';
  return {
    passport,
    destination,
    visa_type: type,
    validity_days: type === 'Embassy Visa Required' ? 30 : 90,
    required_documents: ['Passport with 6 months validity', 'Return ticket proof', 'Hotel booking', 'Travel insurance', 'Bank statement if requested'],
    estimated_fees_usd: String(type === 'Visa-Free' ? 0 : 45 + (index % 7) * 20),
    processing_time: type === 'Visa-Free' ? 'Not applicable' : `${3 + (index % 10)} working days`,
    month_specific_notes: {
      January: 'Peak travel season. Keep bookings confirmed early.',
      June: 'Check weather and seasonal advisories before packing.',
      August: 'Allow extra time for appointments during summer travel demand.',
      December: 'Holiday season demand can affect processing and hotel availability.',
    },
    packing_list: ['Document folder', 'Universal adapter', 'Weather-appropriate clothing', 'Medication kit', 'Travel insurance copy'],
    important_notices: ['Rules may change without notice', 'Always verify with official embassy or consulate', 'Carry printed and digital copies'],
  };
});

const attractionNames = [
  'Burj Khalifa Lounge',
  'Museum of the Future',
  'Dubai Frame',
  'Al Fahidi Heritage Walk',
  'Gold Souk Private Shopping',
  'Dubai Marina Yacht',
  'Jumeirah Beach Club',
  'Desert Conservation Drive',
  'Dubai Mall Aquarium',
  'Palm Jumeirah Viewpoint',
];

const attractions = Array.from({ length: 30 }, (_, index) => ({
  id: `dubai-attraction-${index + 1}`,
  name: `${attractionNames[index % attractionNames.length]} ${index >= 10 ? Math.floor(index / 10) + 1 : ''}`.trim(),
  category: ['Iconic', 'Culture', 'Shopping', 'Beach', 'Dining', 'Desert'][index % 6],
  tags: ['luxury', index % 2 === 0 ? 'culture' : 'skyline', index % 3 === 0 ? 'desert' : 'shopping'],
  budget: ['budget', 'moderate', 'premium'][index % 3],
  time: ['half day', 'full day', 'evening'][index % 3],
  groups: ['solo', 'couple', 'family', 'corporate group', 'friends'],
  interests: ['thrills', 'culture', 'shopping', 'beaches', 'fine dining', 'nightlife', 'desert experience'].slice(index % 4, index % 4 + 3),
  costUsd: 35 + (index % 8) * 45,
  avg_cost_aed: 125 + (index % 8) * 150,
  duration_hrs: 1.5 + (index % 4),
  best_for: ['solo', 'couple', 'family', 'corporate group'],
  tip: 'Book timed access and keep transfer buffers between stops.',
  visit_order_weight: index + 1,
}));

const dubaiPlans = Array.from({ length: 18 }, (_, index) => {
  const time = ['half day', 'full day', 'evening'][index % 3];
  const budget = ['budget', 'moderate', 'premium'][index % 3];
  const group = ['solo', 'couple', 'family', 'corporate group', 'friends'][index % 5];
  const planIds = attractions.slice(index % 10, (index % 10) + (time === 'full day' ? 4 : 3)).map((item) => item.id);
  return {
    budget,
    budget_range: budget,
    time,
    time_slot: time,
    group,
    group_type: group,
    interests: ['culture', 'shopping', 'desert experience'],
    attractionIds: planIds,
    plan: planIds,
    total_est_cost_aed: planIds.reduce((sum, id) => sum + (attractions.find((item) => item.id === id)?.avg_cost_aed || 0), 0),
    notes: ['Optimized for transfer efficiency.', 'Confirm opening hours and private guide availability before final booking.'],
  };
});

const quoteTemplates = {};
for (const base of destinations.slice(0, 8)) {
  quoteTemplates[base[0]] = {};
  for (const budget of ['budget', 'mid-range', 'premium']) {
    quoteTemplates[base[0]][budget] = {
      subject: `Your Personalised ${base[1]} Travel Quote - MyGlobalTrips`,
      html: '<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0A1931;line-height:1.6"><div style="max-width:720px;margin:auto;border:1px solid #C9A84C;padding:28px"><h1 style="color:#0A1931">MyGlobalTrips Luxury Travel Proposal</h1><p>Dear {{name}},</p><p>Thank you for choosing MyGlobalTrips for your upcoming journey to <strong>{{destination}}</strong>.</p><p>Travel dates: <strong>{{dates}}</strong><br/>Travellers: <strong>{{travellers}}</strong><br/>Budget: <strong>{{budget}}</strong></p><p><strong>Special requests:</strong> {{requests}}</p><h2 style="color:#C9A84C">Included Highlights</h2><ul><li>Curated accommodation options</li><li>Private transfers</li><li>Experience planning</li><li>Visa checklist support</li><li>Dedicated concierge follow-up</li></ul><p>Next step: reply to this email or chat with us on WhatsApp to confirm hotel and flight preferences.</p><p>Warm regards,<br/>MyGlobalTrips Concierge</p></div></body></html>',
    };
  }
}
quoteTemplates.default = quoteTemplates.dubai.premium;

function writeJson(file, data) {
  fs.writeFileSync(path.join(dataDir, file), `${JSON.stringify(data, null, 2)}\n`);
}

writeJson('trips-dataset.json', trips);
writeJson('itinerary-data.json', itineraryTemplates);
writeJson('faq-data.json', faq);
writeJson('visa-data.json', visa);
writeJson('dubai-attractions.json', attractions);
writeJson('dubai-plans.json', dubaiPlans);
writeJson('quote-templates.json', quoteTemplates);

console.log('PRD starter datasets generated.');
