import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getWCALiveCompetitionId } from '../../utils/wca-live';

describe('getWCALiveCompetitionId', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns ID on exact name match', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          competitions: [
            { id: '123', name: 'Dublin Open 2024' },
          ],
        },
      }),
    });

    const result = await getWCALiveCompetitionId('Dublin Open 2024');

    expect(result).toBe('123');
  });

  it('returns undefined when only partial match exists', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          competitions: [
            { id: '123', name: 'Dublin Open 2024' },
            { id: '456', name: 'Dublin Open 2023' },
          ],
        },
      }),
    });

    const result = await getWCALiveCompetitionId('Dublin');

    expect(result).toBeUndefined();
  });

  it('returns correct ID when multiple results with exact match', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          competitions: [
            { id: '123', name: 'Dublin Open 2023' },
            { id: '456', name: 'Dublin Open 2024' },
            { id: '789', name: 'Dublin Championship 2024' },
          ],
        },
      }),
    });

    const result = await getWCALiveCompetitionId('Dublin Open 2024');

    expect(result).toBe('456');
  });

  it('returns undefined on API error', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getWCALiveCompetitionId('Dublin Open 2024');

    expect(result).toBeUndefined();
  });

  it('returns undefined when results are empty', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: {
          competitions: [],
        },
      }),
    });

    const result = await getWCALiveCompetitionId('Nonexistent Competition');

    expect(result).toBeUndefined();
  });

  it('sends correct GraphQL query to API', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        data: { competitions: [] },
      }),
    });

    await getWCALiveCompetitionId('Test Competition');

    expect(fetch).toHaveBeenCalledWith(
      'https://live.worldcubeassociation.org/api',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('"filter":"Test Competition"'),
      })
    );
  });
});
