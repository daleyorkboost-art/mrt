import { describe, expect, it, vi } from 'vitest';
import { api } from './api';

describe('api client', () => {
  it('posts recommender payloads to the backend', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { results: [] } }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await api.recommend({ style: 'luxury', group: 'couple', budget: 'premium', wish: 'Dubai' });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/api/recommend',
      expect.objectContaining({ method: 'POST' }),
    );
  });
});
