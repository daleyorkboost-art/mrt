# MyGlobalTrips Deployment Guide

## Required Environment

Frontend:

```bash
VITE_API_BASE_URL=https://api.myglobaltrips.com
VITE_WHATSAPP_NUMBER=971585566036
VITE_SITE_URL=https://www.myglobaltrips.com
```

Backend:

```bash
NODE_ENV=production
PORT=5000
CORS_ORIGIN=https://www.myglobaltrips.com
PUBLIC_BASE_URL=https://api.myglobaltrips.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
REQUEST_TIMEOUT_MS=30000
UPLOAD_DIR=uploads
INTERNAL_QUOTE_PASSWORD=<secure internal password>
INTERNAL_AUTH_SECRET=<strong random secret>
GEMINI_API_KEY=<gemini api key>
GEMINI_VISION_MODEL=gemini-2.5-flash
GEMINI_TIMEOUT_MS=30000
SMTP_HOST=<smtp host>
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<smtp username>
SMTP_PASS=<smtp password>
SMTP_FROM=MyGlobalTrips <info@myglobaltrips.com>
```

## Build

```bash
npm install
npm run lint
npm test
npm run build
```

## Backend

```bash
cd backend
npm install --omit=dev
npm run lint
npm test
npm run smoke
pm2 start ecosystem.config.cjs
pm2 save
```

## Release Checks

- Frontend build output is served over HTTPS.
- Backend runs behind HTTPS/reverse proxy.
- `CORS_ORIGIN` is restricted to the production domain.
- Gemini and SMTP credentials are configured in the server environment only.
- `/health` returns a healthy response.
- `robots.txt` and `sitemap.xml` are deployed with the frontend.
