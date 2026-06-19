const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('http');

process.env.INTERNAL_QUOTE_PASSWORD = process.env.INTERNAL_QUOTE_PASSWORD || 'test-internal-password';
process.env.INTERNAL_AUTH_SECRET = process.env.INTERNAL_AUTH_SECRET || 'test-internal-auth-secret';

const app = require('../src/app');

function withServer(run) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, async () => {
      try {
        await run(`http://127.0.0.1:${server.address().port}`);
        resolve();
      } catch (error) {
        reject(error);
      } finally {
        server.close();
      }
    });
  });
}

function postJson(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const request = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          ...headers,
        },
      },
      (response) => {
        let data = '';
        response.on('data', (chunk) => {
          data += chunk;
        });
        response.on('end', () => resolve({ statusCode: response.statusCode, body: JSON.parse(data) }));
      },
    );

    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}

test('recommend endpoint returns destinations', async () => {
  await withServer(async (baseUrl) => {
    const response = await postJson(`${baseUrl}/api/recommend`, {
      style: 'luxury',
      group: 'couple',
      budget: 'premium',
      wish: 'Dubai',
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.data.results.length >= 3);
  });
});

test('quote endpoints require internal authorization', async () => {
  await withServer(async (baseUrl) => {
    const locked = await postJson(`${baseUrl}/api/quote-email`, {
      travellerName: 'Riya Sharma',
      destination: 'Dubai',
      dates: '12-18 September 2026',
      travellerCount: '2 adults',
      budget: 'premium',
      email: 'riya@example.com',
      phone: '+971 58 556 6036',
    });

    assert.equal(locked.statusCode, 401);
    assert.equal(locked.body.success, false);

    const auth = await postJson(`${baseUrl}/api/internal-auth`, {
      password: 'test-internal-password',
    });

    assert.equal(auth.statusCode, 200);
    assert.equal(auth.body.success, true);
    assert.ok(auth.body.data.token);

    const unlocked = await postJson(
      `${baseUrl}/api/quote-email`,
      {
        travellerName: 'Riya Sharma',
        destination: 'Dubai',
        dates: '12-18 September 2026',
        travellerCount: '2 adults',
        budget: 'premium',
        email: 'riya@example.com',
        phone: '+971 58 556 6036',
      },
      { Authorization: `Bearer ${auth.body.data.token}` },
    );

    assert.equal(unlocked.statusCode, 200);
    assert.equal(unlocked.body.success, true);
  });
});

test('validation errors return standard error shape', async () => {
  await withServer(async (baseUrl) => {
    const response = await postJson(`${baseUrl}/api/itinerary`, {
      destination: 'Dubai',
      nights: 0,
      travellerType: '',
      interests: [],
    });

    assert.equal(response.statusCode, 422);
    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Validation failed');
  });
});
