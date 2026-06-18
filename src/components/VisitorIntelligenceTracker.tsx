import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackReturnVisit, trackSignal } from '../services/visitorIntelligence';

export function VisitorIntelligenceTracker() {
  const location = useLocation();

  useEffect(() => {
    trackReturnVisit();
  }, []);

  useEffect(() => {
    trackSignal({
      type: 'page_view',
      category: 'destination_interest',
      label: document.title,
      metadata: { path: location.pathname },
    });

    const thresholds = new Set([25, 50, 75, 100]);
    const sent = new Set<number>();

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));

      thresholds.forEach((threshold) => {
        if (depth >= threshold && !sent.has(threshold)) {
          sent.add(threshold);
          trackSignal({
            type: 'scroll_depth',
            category: 'destination_interest',
            label: `${threshold}% scroll depth`,
            value: threshold,
            metadata: { path: location.pathname },
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  return null;
}
