# MyGlobalTrips Production Checklist

- [ ] Frontend `npm run lint`, `npm test`, and `npm run build` pass.
- [ ] Backend `npm run lint`, `npm test`, and `npm run smoke` pass.
- [ ] `npm audit --omit=dev` returns no high or critical vulnerabilities for frontend and backend.
- [ ] `GEMINI_API_KEY` is configured on the backend server.
- [ ] SMTP credentials are configured on the backend server.
- [ ] Internal quote password and auth secret are configured.
- [ ] CORS is restricted to the production frontend domain.
- [ ] WhatsApp number is `+971 58 556 6036`.
- [ ] Public contact email is `info@myglobaltrips.com`.
- [ ] PM2 process starts and restarts cleanly.
- [ ] 404 route displays correctly.
- [ ] Manual mobile, tablet, and desktop responsive QA is completed.
- [ ] Lighthouse production audit is above 90 for Performance, SEO, Accessibility, and Best Practices.
