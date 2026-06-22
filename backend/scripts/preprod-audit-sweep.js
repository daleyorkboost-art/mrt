const http = require('http');
const app = require('../src/app');
const { env } = require('../src/config/env');
const { generateQuoteEmail } = require('../src/services/quoteService');

function listen(server) {
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`));
  });
}

function close(server) {
  return new Promise((resolve) => server.close(resolve));
}

async function postJson(baseUrl, path, body, headers = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);

  return {
    status: response.status,
    success: payload?.success,
    message: payload?.message,
    dataKeys: payload?.data ? Object.keys(payload.data) : [],
  };
}

async function main() {
  const server = http.createServer(app);
  const baseUrl = await listen(server);
  const results = [];

  try {
    results.push({ name: 'GET /health', status: (await fetch(`${baseUrl}/health`)).status });
    results.push({
      name: 'POST /api/recommend valid',
      ...(await postJson(baseUrl, '/api/recommend', {
        style: 'luxury',
        group: 'couple',
        budget: 'premium',
        wish: 'Dubai',
      })),
    });
    results.push({
      name: 'POST /api/recommend invalid',
      ...(await postJson(baseUrl, '/api/recommend', { style: '', group: '', budget: '' })),
    });
    results.push({
      name: 'POST /api/itinerary valid',
      ...(await postJson(baseUrl, '/api/itinerary', {
        destination: 'Dubai',
        nights: 3,
        travellerType: 'couple',
        interests: ['luxury', 'culture', 'shopping'],
      })),
    });
    results.push({
      name: 'POST /api/itinerary invalid',
      ...(await postJson(baseUrl, '/api/itinerary', {
        destination: 'Dubai',
        nights: 0,
        travellerType: '',
        interests: [],
      })),
    });
    results.push({
      name: 'POST /api/dubai-plan valid',
      ...(await postJson(baseUrl, '/api/dubai-plan', {
        budget: 'premium',
        time: 'full-day',
        group: 'family',
        interests: ['culture', 'views'],
      })),
    });
    results.push({
      name: 'POST /api/dubai-plan invalid',
      ...(await postJson(baseUrl, '/api/dubai-plan', { budget: '', time: '', group: '', interests: ['x'] })),
    });
    results.push({
      name: 'POST /api/visa valid',
      ...(await postJson(baseUrl, '/api/visa', { passport: 'India', destination: 'UAE', month: 'December' })),
    });
    results.push({
      name: 'POST /api/visa unknown',
      ...(await postJson(baseUrl, '/api/visa', { passport: 'Atlantis', destination: 'Moon', month: 'January' })),
    });
    results.push({
      name: 'POST /api/faq known',
      ...(await postJson(baseUrl, '/api/faq', { query: 'How do I contact WhatsApp for Dubai packages?' })),
    });
    results.push({
      name: 'POST /api/faq invalid',
      ...(await postJson(baseUrl, '/api/faq', { query: 'x' })),
    });
    results.push({
      name: 'POST /api/quote-email locked',
      ...(await postJson(baseUrl, '/api/quote-email', {
        travellerName: 'Riya Sharma',
        destination: 'Dubai',
        dates: '12-18 Sep 2026',
        travellerCount: '2 adults',
        budget: 'premium',
        email: 'riya@example.com',
      })),
    });

    const auth = await postJson(baseUrl, '/api/internal-auth', {
      password: env.internalQuotePassword || 'test-internal-password',
    });
    results.push({ name: 'POST /api/internal-auth', ...auth });

    const authPayload = await fetch(`${baseUrl}/api/internal-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: env.internalQuotePassword || 'test-internal-password' }),
    }).then((response) => response.json());

    const token = authPayload?.data?.token;
    results.push({
      name: 'POST /api/quote-email authorized',
      ...(await postJson(
        baseUrl,
        '/api/quote-email',
        {
          travellerName: 'Riya Sharma',
          destination: 'Dubai',
          dates: '12-18 Sep 2026',
          travellerCount: '2 adults',
          budget: 'premium',
          email: 'riya@example.com',
          phone: '+971 58 556 6036',
          specialRequests: 'Anniversary trip',
        },
        { Authorization: `Bearer ${token}` },
      )),
    });

    const badUpload = new FormData();
    badUpload.append('style', 'luxury');
    badUpload.append('mood', 'dreamy');
    badUpload.append('image', new Blob(['not-image'], { type: 'text/plain' }), 'bad.txt');
    const badUploadResponse = await fetch(`${baseUrl}/api/caption`, { method: 'POST', body: badUpload });
    const badUploadPayload = await badUploadResponse.json().catch(() => null);
    results.push({
      name: 'POST /api/caption rejects bad upload',
      status: badUploadResponse.status,
      success: badUploadPayload?.success,
      message: badUploadPayload?.message,
    });

    const escaped = generateQuoteEmail({
      travellerName: '<script>x</script>',
      destination: 'Dubai',
      dates: 'Soon',
      travellerCount: '2',
      budget: 'premium',
      specialRequests: '<b>VIP</b>',
    });
    results.push({
      name: 'Quote HTML escaping',
      passed: !escaped.html.includes('<script>') && escaped.html.includes('&lt;b&gt;VIP&lt;/b&gt;'),
    });
  } finally {
    await close(server);
  }

  console.log(JSON.stringify(results, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
