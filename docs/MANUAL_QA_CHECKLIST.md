# MyGlobalTrips Manual QA Checklist

## Functional Tools

- [ ] Homepage hero, search bar, package filters, carousel, testimonials, trust metrics, footer.
- [ ] Trip Recommender valid inputs return 3-5 destination cards.
- [ ] Trip Recommender invalid/off-path preferences return popular fallback cards.
- [ ] Trip Recommender query string restores/shareable preferences.
- [ ] WhatsApp popup opens, dismisses, auto-expands once per session, and includes trip preferences after quiz completion.
- [ ] ARIA returns FAQ answers and persists session history after refresh.
- [ ] Caption Generator accepts JPG, PNG, WEBP under 5MB.
- [ ] Caption Generator rejects unsupported files and shows an error state.
- [ ] Internal Quote Generator unlocks, generates HTML, allows edits, and handles SMTP errors.
- [ ] Itinerary Builder returns exact, fallback, and closest-duration notices.
- [ ] Itinerary Share copies a URL and PDF button opens print flow.
- [ ] Dubai Planner returns ordered attractions, AED cost, tips, and notes.
- [ ] Visa Checklist returns visa badge, documents, packing list, notices, advisory, and print flow.

## Error States

- [ ] Backend offline shows user-friendly frontend error messages.
- [ ] Validation errors return `{ success: false, message }`.
- [ ] Rate limit on `/api/caption` returns a friendly error.
- [ ] SMTP missing returns a clear quote-send error.
- [ ] OpenAI missing uses fallback captions without exposing keys.

## Accessibility

- [ ] All buttons and inputs are keyboard reachable.
- [ ] Focus rings are visible.
- [ ] Touch targets are at least 44x44px where practical.
- [ ] Text contrast meets WCAG AA on navy/gold surfaces.
- [ ] Images have meaningful alt text where content-bearing.

## Deployment

- [ ] Frontend `.env` contains `VITE_API_BASE_URL`.
- [ ] Backend `.env` contains CORS, OpenAI, SMTP, and public base URL settings.
- [ ] `npm run build` passes.
- [ ] PM2 starts backend successfully.
- [ ] HTTPS is active in production.
- [ ] `robots.txt` and `sitemap.xml` are reachable.
