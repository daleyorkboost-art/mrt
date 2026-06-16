const http = require('http');
const app = require('../src/app');

const server = app.listen(0, async () => {
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await postJson(`${baseUrl}/api/recommend`, {
      style: 'luxury',
      group: 'couple',
      budget: 'premium',
      wish: 'desert',
    });

    await postJson(`${baseUrl}/api/itinerary`, {
      destination: 'Dubai',
      nights: 4,
      travellerType: 'couple',
      interests: ['fine dining', 'culture', 'desert'],
    });

    await postJson(`${baseUrl}/api/visa`, {
      passport: 'Indian',
      destination: 'UAE',
      month: 'August 2026',
    });

    await postJson(`${baseUrl}/api/faq`, {
      query: 'What visa documents do I need?',
    });

    console.log('Smoke tests passed');
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

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
        response.on('end', () => {
          const parsed = JSON.parse(data);
          if (response.statusCode >= 400 || parsed.success !== true) {
            return reject(new Error(`Request failed ${url}: ${data}`));
          }
          return resolve(parsed);
        });
      },
    );

    request.on('error', reject);
    request.write(payload);
    request.end();
  });
}
