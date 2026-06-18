const assert = require('node:assert/strict');
const test = require('node:test');
const http = require('http');
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

function postJson(url, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const request = http.request(
      url,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
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
