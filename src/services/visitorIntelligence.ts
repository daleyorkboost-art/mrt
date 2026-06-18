import { api } from './api';

type SignalType = 'page_view' | 'hover' | 'scroll_depth' | 'tool_engagement' | 'micro_conversion' | 'return_visit';
type SignalCategory = 'destination_interest' | 'tool_engagement' | 'micro_conversion' | 'return_visit';

type SignalPayload = {
  type: SignalType;
  category: SignalCategory;
  label: string;
  page?: string;
  value?: number;
  metadata?: Record<string, unknown>;
};

const visitorKey = 'mgt-visitor-id';
const sessionKey = 'mgt-session-id';
const visitCountKey = 'mgt-visit-count';

function ensureId(key: string) {
  const existing = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
  if (existing) return existing;

  const id = `${key}_${crypto.randomUUID()}`;
  if (key === visitorKey) {
    window.localStorage.setItem(key, id);
  } else {
    window.sessionStorage.setItem(key, id);
  }
  return id;
}

export function trackSignal(payload: SignalPayload) {
  const visitorId = ensureId(visitorKey);
  const sessionId = ensureId(sessionKey);

  void api.visitorSignal({
    ...payload,
    page: payload.page || window.location.pathname,
    visitorId,
    sessionId,
  }).catch(() => {
    // Analytics must never break the traveller experience.
  });
}

export function trackReturnVisit() {
  const visits = Number(window.localStorage.getItem(visitCountKey) || '0') + 1;
  window.localStorage.setItem(visitCountKey, String(visits));

  if (visits >= 2) {
    trackSignal({
      type: 'return_visit',
      category: 'return_visit',
      label: `${visits} visits`,
      value: visits,
      metadata: { visitCount: visits },
    });
  }
}

export function trackToolEngagement(label: string, metadata?: Record<string, unknown>) {
  trackSignal({
    type: 'tool_engagement',
    category: 'tool_engagement',
    label,
    metadata,
  });
}

export function trackMicroConversion(label: string, metadata?: Record<string, unknown>) {
  trackSignal({
    type: 'micro_conversion',
    category: 'micro_conversion',
    label,
    metadata,
  });
}

export function trackDestinationInterest(label: string, metadata?: Record<string, unknown>) {
  trackSignal({
    type: 'hover',
    category: 'destination_interest',
    label,
    metadata,
  });
}
