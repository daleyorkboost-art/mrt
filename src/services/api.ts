const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload.data;
}

async function postJson<T>(path: string, body: unknown, headers: Record<string, string> = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  });

  return parseResponse<T>(response);
}

async function postForm<T>(path: string, formData: FormData): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    body: formData,
  });

  return parseResponse<T>(response);
}

export type TripRecommendation = {
  id: string;
  destination: string;
  image: string;
  highlights: string[];
  popularity: number;
  score: number;
  fallback?: boolean;
};

export type ItineraryDay = {
  day: number;
  day_number?: number;
  title: string;
  activities: string[];
  morning?: { activity: string; description: string; duration_hrs: number; cost_note: string };
  afternoon?: { activity: string; description: string; duration_hrs: number; cost_note: string };
  evening?: { activity: string; description: string; duration_hrs: number; cost_note: string };
  tip?: string;
};

export type ItineraryResponse = {
  notice: string;
  itinerary: {
    id: string;
    destination: string;
    duration: number;
    travellerType: string;
    interests: string[];
    days: ItineraryDay[];
  };
};

export type DubaiAttraction = {
  id: string;
  name: string;
  budget: string;
  time: string;
  groups: string[];
  interests: string[];
  costUsd: number;
  avg_cost_aed?: number;
  duration_hrs?: number;
  tip?: string;
  score?: number;
};

export type DubaiPlanResponse = {
  attractions: DubaiAttraction[];
  estimatedCost: number;
  estimatedCostAed?: number;
  notes: string[];
};

export type VisaResponse = {
  visa_type: string;
  validity_days: number;
  required_documents: string[];
  estimated_fees_usd: number;
  processing_time: string;
  month_specific_notes: string;
  packing_list: string[];
  important_notices: string[];
};

export type FaqResponse = {
  answer: string;
  follow_up_suggestions: string[];
  category?: string;
};

export type QuoteEmailResponse = {
  subject: string;
  html: string;
};

export type SendEmailResponse = {
  delivered: boolean;
  messageId: string;
  accepted: string[];
  rejected: string[];
};

export type CaptionResponse = {
  captions: string[];
  hashtags: string[];
  imageUrl: string;
  model?: string;
};

export type InternalAuthResponse = {
  token: string;
  expiresInSeconds: number;
};

export type VisitorSignalResponse = {
  signal: {
    id: string;
    type: string;
    category: string;
    label: string;
    createdAt: string;
  };
};

export const api = {
  recommend(body: { style: string; group: string; budget: string; wish: string }) {
    return postJson<{ results: TripRecommendation[] }>('/api/recommend', body);
  },
  itinerary(body: { destination: string; nights: number; travellerType: string; interests: string[] }) {
    return postJson<ItineraryResponse>('/api/itinerary', body);
  },
  dubaiPlan(body: { budget: string; time: string; group: string; interests: string[] }) {
    return postJson<DubaiPlanResponse>('/api/dubai-plan', body);
  },
  visa(body: { passport: string; destination: string; month: string }) {
    return postJson<VisaResponse>('/api/visa', body);
  },
  faq(body: { query: string }) {
    return postJson<FaqResponse>('/api/faq', body);
  },
  internalAuth(body: { password: string }) {
    return postJson<InternalAuthResponse>('/api/internal-auth', body);
  },
  quoteEmail(body: {
    travellerName: string;
    destination: string;
    dates: string;
    travellerCount: string;
    budget: string;
    specialRequests: string;
    email: string;
    phone: string;
  }, token: string) {
    return postJson<QuoteEmailResponse>('/api/quote-email', body, {
      Authorization: `Bearer ${token}`,
    });
  },
  sendEmail(body: { to: string; subject: string; html: string }, token: string) {
    return postJson<SendEmailResponse>('/api/send-email', body, {
      Authorization: `Bearer ${token}`,
    });
  },
  caption(formData: FormData) {
    return postForm<CaptionResponse>('/api/caption', formData);
  },
  visitorSignal(body: {
    type: string;
    category: string;
    label: string;
    page: string;
    visitorId: string;
    sessionId: string;
    value?: number;
    metadata?: Record<string, unknown>;
  }) {
    return postJson<VisitorSignalResponse>('/api/visitor-signal', body);
  },
};
