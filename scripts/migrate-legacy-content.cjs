const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceFiles = {
  attractions: 'C:/Users/Arjun/Downloads/uae-attractions (3).html',
  experiences: 'C:/Users/Arjun/Downloads/premium-experiences (4).html',
  worldTours: 'C:/Users/Arjun/Downloads/world-tours-packages.html',
  cruises: 'C:/Users/Arjun/Downloads/cruise-packages (1).html',
};

const fallbackImages = {
  attractions: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  experiences: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80',
  worldTours: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
  cruises: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
};

function readSource(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Legacy source file not found: ${file}`);
  }

  return fs.readFileSync(file, 'utf8');
}

function decodeEntities(text) {
  return String(text || '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '-')
    .replace(/&ndash;/g, '-')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function cleanText(value) {
  return decodeEntities(value)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/â€”|—|–/g, ' - ')
    .replace(/Â·|·/g, ' - ')
    .replace(/Â°/g, ' degrees')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugify(value) {
  return cleanText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function firstMatch(block, patterns) {
  for (const pattern of patterns) {
    const match = block.match(pattern);
    if (match) return cleanText(match[1]);
  }

  return '';
}

function allMatches(block, pattern) {
  return [...block.matchAll(pattern)].map((match) => cleanText(match[1])).filter(Boolean);
}

function extractImage(block, type) {
  const match = block.match(/background-image\s*:\s*url\(['"]?([^'")]+)['"]?\)/i);
  return match?.[1]?.trim() || fallbackImages[type];
}

function extractPrice(block) {
  const strong = firstMatch(block, [/<strong>\s*(AED\s*[\d,]+[^<]*)<\/strong>/i]);
  if (strong) return strong.replace(/\s+/g, ' ');

  const fallback = cleanText(block).match(/AED\s*[\d,]+/i);
  return fallback ? fallback[0].toUpperCase() : 'On request';
}

function extractPriceValue(price) {
  const match = String(price).replace(/,/g, '').match(/AED\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

function extractRating(block) {
  const rating = firstMatch(block, [
    /<span class="(?:rating-score|r-score|rscore|score)">([^<]+)<\/span>/i,
    /<span class="(?:rating-score|r-score|rscore)">([^<]+)<\/span>/i,
  ]);

  return rating || '';
}

function extractDuration(text) {
  const duration = cleanText(text).match(/(?:\d+(?:\.\d+)?(?:\s*-\s*\d+(?:\.\d+)?)?\s*(?:mins?|minutes?|hours?|hrs?|days?|nights?))|(?:half day|full day)/i);
  return duration ? duration[0].replace(/\s+/g, ' ') : '';
}

function nearestSection(html, index) {
  const before = html.slice(0, index);
  const sections = [...before.matchAll(/<section[^>]*id="([^"]+)"[^>]*>/gi)];
  const h2s = [...before.matchAll(/<h2 class="section-title[^"]*">([\s\S]*?)<\/h2>/gi)];
  const id = sections.at(-1)?.[1] || '';
  const title = cleanText(h2s.at(-1)?.[1] || id);
  return { id, title };
}

function cardChunks(html, marker) {
  const regex =
    marker === 'card'
      ? /<div class="card(?:\s[^"]*)?"/gi
      : new RegExp(`<div class="${marker}[^"]*"`, 'gi');
  const starts = [...html.matchAll(regex)].map((match) => match.index).filter((index) => typeof index === 'number');

  return starts.map((start, index) => ({
    start,
    block: html.slice(start, starts[index + 1] || html.length),
  }));
}

function uniq(values, limit = 12) {
  const seen = new Set();
  const cleaned = [];

  for (const value of values.map(cleanText).filter(Boolean)) {
    const key = value.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      cleaned.push(value);
    }
  }

  return cleaned.slice(0, limit);
}

function dedupe(records) {
  const map = new Map();

  for (const record of records) {
    if (!record.title || !record.slug) continue;
    if (!map.has(record.slug)) map.set(record.slug, record);
  }

  return [...map.values()];
}

function parseAttractions(html) {
  return dedupe(
    cardChunks(html, 'card').map(({ start, block }) => {
      const section = nearestSection(html, start);
      const title = firstMatch(block, [/<div class="card-name">([\s\S]*?)<\/div>/i]);
      const description = firstMatch(block, [/<div class="card-tagline">([\s\S]*?)<\/div>/i]);
      const meta = allMatches(block, /<span class="meta-item">([\s\S]*?)<\/span>/gi);
      const badges = allMatches(block, /<span class="badge[^"]*">([\s\S]*?)<\/span>/gi);
      const category = firstMatch(block, [/<div class="card-category">([\s\S]*?)<\/div>/i]) || section.title;
      const location = meta.find((item) => !/am|pm|hour|mins?|daily/i.test(item)) || section.title || 'UAE';
      const price = extractPrice(block);

      return {
        id: slugify(title),
        title,
        slug: slugify(title),
        description,
        category,
        destination: location,
        price,
        priceValueAed: extractPriceValue(price),
        duration: extractDuration(meta.join(' ') || description),
        rating: extractRating(block),
        highlights: uniq([...badges, ...meta]),
        badges,
        tags: uniq([category, section.title, ...badges, ...meta], 10),
        image: extractImage(block, 'attractions'),
        source: 'uae-attractions.html',
      };
    }),
  );
}

function parseExperiences(html) {
  return dedupe(
    cardChunks(html, 'card').map(({ start, block }) => {
      const section = nearestSection(html, start);
      const title = firstMatch(block, [/<div class="c-name">([\s\S]*?)<\/div>/i]);
      const description = firstMatch(block, [/<div class="c-tagline">([\s\S]*?)<\/div>/i]);
      const specs = allMatches(block, /<span class="spec">([\s\S]*?)<\/span>/gi);
      const badges = allMatches(block, /<span class="badge[^"]*">([\s\S]*?)<\/span>/gi);
      const category = firstMatch(block, [/<div class="c-cat">([\s\S]*?)<\/div>/i]) || section.title;
      const price = extractPrice(block);

      return {
        id: slugify(title),
        title,
        slug: slugify(title),
        description,
        category,
        destination: 'UAE',
        price,
        priceValueAed: extractPriceValue(price),
        duration: extractDuration(specs.join(' ') || description),
        rating: extractRating(block),
        highlights: uniq(specs, 10),
        badges,
        vipFeatures: uniq([...badges, ...specs], 10),
        tags: uniq([category, section.title, ...badges], 10),
        image: extractImage(block, 'experiences'),
        source: 'premium-experiences.html',
      };
    }),
  );
}

function parseWorldTours(html) {
  return dedupe(
    cardChunks(html, 'pkg-card').map(({ start, block }) => {
      const section = nearestSection(html, start);
      const title = firstMatch(block, [/<div class="pkg-name">([\s\S]*?)<\/div>/i]);
      const description = firstMatch(block, [/<div class="pkg-tagline">([\s\S]*?)<\/div>/i]);
      const highlights = allMatches(block, /<span class="highlight">([\s\S]*?)<\/span>/gi);
      const meta = allMatches(block, /<span class="pkg-meta-item">([\s\S]*?)<\/span>/gi);
      const badges = allMatches(block, /<span class="badge[^"]*">([\s\S]*?)<\/span>/gi);
      const region = firstMatch(block, [/<div class="pkg-region">([\s\S]*?)<\/div>/i]) || section.title;
      const destination = title.split(' - ')[0] || title;
      const price = extractPrice(block);

      return {
        id: slugify(title),
        title,
        slug: slugify(title),
        description,
        category: section.id || 'world-tours',
        destination,
        region,
        price,
        priceValueAed: extractPriceValue(price),
        duration: extractDuration(meta.join(' ') || description),
        rating: extractRating(block),
        highlights: uniq(highlights, 12),
        badges,
        tags: uniq([...badges, ...highlights, region], 12),
        image: extractImage(block, 'worldTours'),
        metadata: {
          travelWindow: meta.find((item) => /jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|season/i.test(item)) || '',
          travellerTypes: meta.find((item) => /couples|families|groups|honeymoon|solo/i.test(item)) || '',
        },
        source: 'world-tours-packages.html',
      };
    }),
  );
}

function parseCruises(html) {
  return dedupe(
    cardChunks(html, 'card').map(({ start, block }) => {
      const section = nearestSection(html, start);
      const title = firstMatch(block, [/<div class="c-name">([\s\S]*?)<\/div>/i]);
      const description = firstMatch(block, [/<div class="c-tagline">([\s\S]*?)<\/div>/i]);
      const highlights = allMatches(block, /<span class="c-hi">([\s\S]*?)<\/span>/gi);
      const specs = allMatches(block, /<span class="spec">([\s\S]*?)<\/span>/gi);
      const badges = allMatches(block, /<span class="badge[^"]*">([\s\S]*?)<\/span>/gi);
      const cruiseLine = firstMatch(block, [/<div class="c-line-name">([\s\S]*?)<\/div>/i, /<div class="c-line">([\s\S]*?)<\/div>/i]);
      const price = extractPrice(block);

      return {
        id: slugify(title),
        title,
        slug: slugify(title),
        description,
        category: section.id || 'cruises',
        cruiseLine,
        destination: section.title || 'Cruise',
        price,
        priceValueAed: extractPriceValue(price),
        duration: extractDuration([title, specs.join(' '), description].join(' ')),
        rating: extractRating(block),
        highlights: uniq([...highlights, ...specs], 12),
        badges,
        tags: uniq([section.title, cruiseLine, ...badges, ...highlights], 12),
        image: extractImage(block, 'cruises'),
        source: 'cruise-packages.html',
      };
    }),
  );
}

function budgetFromPrice(priceValueAed) {
  if (!priceValueAed) return 'premium';
  if (priceValueAed <= 500) return 'budget';
  if (priceValueAed <= 2500) return 'moderate';
  return 'premium';
}

function durationHours(duration) {
  const value = String(duration || '').match(/(\d+(?:\.\d+)?)/);
  if (!value) return 3;
  const number = Number(value[1]);
  if (/min/i.test(duration)) return Math.max(1, Math.round(number / 60));
  if (/night|day/i.test(duration)) return Math.max(4, Math.round(number * 8));
  return Math.max(1, Math.round(number));
}

function toDubaiPlannerRecord(item, type) {
  const budget = budgetFromPrice(item.priceValueAed);
  const interests = uniq([item.category, ...(item.tags || []), ...(item.badges || [])], 8).map((value) => value.toLowerCase());

  return {
    id: item.slug,
    name: item.title,
    category: item.category,
    description: item.description,
    budget,
    time: durationHours(item.duration) > 5 ? 'full-day' : 'half-day',
    groups: ['couple', 'family', 'friends', 'solo'],
    interests,
    costUsd: item.priceValueAed ? Math.round(item.priceValueAed / 3.67) : 0,
    avg_cost_aed: item.priceValueAed || 0,
    duration_hrs: durationHours(item.duration),
    tip: item.highlights?.[0] || 'Confirm availability before final booking.',
    tags: item.tags || [],
    image: item.image,
    source: item.source,
    contentType: type,
  };
}

function toTripRecord(item, type, popularityBase) {
  const rating = Number(item.rating) || 4.6;
  return {
    id: item.slug,
    destination: item.title,
    styles: uniq(['luxury', 'culture', 'adventure', ...(item.tags || [])], 8).map((tag) => tag.toLowerCase()),
    groups: ['couple', 'family', 'friends', 'solo'],
    budgets: [budgetFromPrice(item.priceValueAed), 'premium'],
    image: item.image,
    highlights: uniq(item.highlights?.length ? item.highlights : item.tags || [], 8),
    popularity: Math.min(99, Math.round(rating * 18) + popularityBase),
    category: item.category,
    price: item.price,
    duration: item.duration,
    source: item.source,
    contentType: type,
  };
}

function writeJson(relativePath, value) {
  const filePath = path.join(rootDir, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function mergeById(existing, incoming) {
  const map = new Map();
  for (const item of existing) map.set(item.id, item);
  for (const item of incoming) map.set(item.id, { ...map.get(item.id), ...item });
  return [...map.values()];
}

function generateFrontendContent(records) {
  const allPackages = [
    ...records.worldTours.map((item) => ({ title: item.title, location: item.region || item.destination, price: item.price, days: item.duration || 'Flexible', image: item.image, tags: item.highlights.slice(0, 3) })),
    ...records.cruises.map((item) => ({ title: item.title, location: item.destination || 'Cruise Packages', price: item.price, days: item.duration || 'Cruise itinerary', image: item.image, tags: item.highlights.slice(0, 3) })),
    ...records.attractions.map((item) => ({ title: item.title, location: item.destination || 'UAE', price: item.price, days: item.duration || 'Flexible', image: item.image, tags: item.tags.slice(0, 3) })),
    ...records.experiences.map((item) => ({ title: item.title, location: item.destination || 'UAE', price: item.price, days: item.duration || 'Flexible', image: item.image, tags: item.tags.slice(0, 3) })),
  ].filter((item) => item.title && item.image);

  const destinations = [];
  const seen = new Set();
  for (const item of [...records.worldTours, ...records.cruises, ...records.attractions]) {
    const name = cleanText((item.destination || item.title).split(' - ')[0]);
    const key = name.toLowerCase();
    if (!name || seen.has(key)) continue;
    seen.add(key);
    destinations.push({
      name,
      country: item.region || item.category || 'Premium Travel',
      rating: item.rating || '4.8',
      image: item.image,
    });
    if (destinations.length >= 24) break;
  }

  const source = `import type { Destination, Package } from './mockData';\n\nexport const legacyPackages: Package[] = ${JSON.stringify(allPackages, null, 2)};\n\nexport const legacyDestinations: Destination[] = ${JSON.stringify(destinations, null, 2)};\n`;
  fs.writeFileSync(path.join(rootDir, 'src/data/legacyContent.ts'), source);

  return { packageCount: allPackages.length, destinationCount: destinations.length };
}

function connectHomepageData() {
  const filePath = path.join(rootDir, 'src/data/mockData.ts');
  let source = fs.readFileSync(filePath, 'utf8');

  if (!source.includes("./legacyContent")) {
    source = source.replace(
      "import type { LucideIcon } from 'lucide-react';",
      "import type { LucideIcon } from 'lucide-react';\nimport { legacyDestinations, legacyPackages } from './legacyContent';",
    );
  }

  const packageStart = source.indexOf('export const packages: Package[] = [');
  const destinationStart = source.indexOf('export const destinations: Destination[] = [');

  if (source.includes('export const packages: Package[] = legacyPackages;') && source.includes('export const destinations: Destination[] = legacyDestinations;')) {
    fs.writeFileSync(filePath, source);
    return;
  }

  if (packageStart === -1 || destinationStart === -1) {
    throw new Error('Could not find homepage package/destination array markers.');
  }

  source = `${source.slice(0, packageStart)}export const packages: Package[] = legacyPackages;\n\n${source.slice(destinationStart)}`;

  const newDestinationStart = source.indexOf('export const destinations: Destination[] = [');
  const howItWorksStart = source.indexOf('export const howItWorks: Feature[] = [');

  if (newDestinationStart === -1 || howItWorksStart === -1) {
    throw new Error('Could not find homepage destination/howItWorks array markers.');
  }

  source = `${source.slice(0, newDestinationStart)}export const destinations: Destination[] = legacyDestinations;\n\n${source.slice(howItWorksStart)}`;

  fs.writeFileSync(filePath, source);
}

function main() {
  const html = Object.fromEntries(Object.entries(sourceFiles).map(([key, file]) => [key, readSource(file)]));
  const records = {
    attractions: parseAttractions(html.attractions),
    experiences: parseExperiences(html.experiences),
    worldTours: parseWorldTours(html.worldTours),
    cruises: parseCruises(html.cruises),
  };

  writeJson('data/attractions.json', records.attractions);
  writeJson('data/experiences.json', records.experiences);
  writeJson('data/worldTours.json', records.worldTours);
  writeJson('data/cruises.json', records.cruises);

  writeJson('backend/src/data/content-attractions.json', records.attractions);
  writeJson('backend/src/data/content-experiences.json', records.experiences);
  writeJson('backend/src/data/content-world-tours.json', records.worldTours);
  writeJson('backend/src/data/content-cruises.json', records.cruises);

  const plannerRecords = [
    ...records.attractions.map((item) => toDubaiPlannerRecord(item, 'attraction')),
    ...records.experiences.map((item) => toDubaiPlannerRecord(item, 'experience')),
  ];
  const existingAttractions = JSON.parse(fs.readFileSync(path.join(rootDir, 'backend/src/data/dubai-attractions.json'), 'utf8'));
  writeJson('backend/src/data/dubai-attractions.json', mergeById(existingAttractions, plannerRecords));

  const tripRecords = [
    ...records.worldTours.map((item) => toTripRecord(item, 'world-tour', 6)),
    ...records.cruises.map((item) => toTripRecord(item, 'cruise', 4)),
  ];
  const existingTrips = JSON.parse(fs.readFileSync(path.join(rootDir, 'backend/src/data/trips-dataset.json'), 'utf8'));
  writeJson('backend/src/data/trips-dataset.json', mergeById(existingTrips, tripRecords));

  const frontend = generateFrontendContent(records);
  connectHomepageData();
  const report = [
    '# Legacy Content Migration Report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- UAE attractions imported: ${records.attractions.length}`,
    `- Premium experiences imported: ${records.experiences.length}`,
    `- World tours imported: ${records.worldTours.length}`,
    `- Cruise packages imported: ${records.cruises.length}`,
    `- Frontend package cards generated: ${frontend.packageCount}`,
    `- Frontend destination cards generated: ${frontend.destinationCount}`,
    '',
    '## Files Updated',
    '',
    '- data/attractions.json',
    '- data/experiences.json',
    '- data/worldTours.json',
    '- data/cruises.json',
    '- backend/src/data/content-attractions.json',
    '- backend/src/data/content-experiences.json',
    '- backend/src/data/content-world-tours.json',
    '- backend/src/data/content-cruises.json',
    '- backend/src/data/dubai-attractions.json',
    '- backend/src/data/trips-dataset.json',
    '- src/data/legacyContent.ts',
    '- src/data/mockData.ts',
    '- scripts/migrate-legacy-content.cjs',
    '',
    '## Validation',
    '',
    '- Duplicate slugs removed during import.',
    '- Records with empty titles were skipped.',
    '- Missing images were replaced only with category-level legacy-safe fallback images.',
    '- Prices, ratings, durations, badges, highlights, categories, and metadata were normalized where present in the source HTML.',
    '',
    '## Remaining Manual Tasks',
    '',
    '- The current app has no dedicated Packages page, Destinations page, search results page, package detail page, booking flow, CMS, admin panel, or database schema. Content has been connected to the existing homepage package/destination data and compatible backend JSON datasets only.',
    '- If the business wants every imported item to have a dedicated detail URL, a new approved product scope is required.',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(rootDir, 'migration-report.md'), report);

  console.log(JSON.stringify({
    attractions: records.attractions.length,
    experiences: records.experiences.length,
    worldTours: records.worldTours.length,
    cruises: records.cruises.length,
    frontend,
  }, null, 2));
}

main();
