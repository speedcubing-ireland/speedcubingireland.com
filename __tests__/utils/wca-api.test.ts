import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { dateInDays, formatDate, searchCompetitions, getCompsFromNow, getCurrentCompetition } from '../../utils/wca-api';
import { Competition } from '../../utils/wca-api/types';

describe('dateInDays', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns current date for 0 days', () => {
    const result = dateInDays(0);
    expect(result.toISOString().split('T')[0]).toBe('2024-03-15');
  });

  it('returns future date for positive days', () => {
    const result = dateInDays(7);
    expect(result.toISOString().split('T')[0]).toBe('2024-03-22');
  });

  it('returns past date for negative days', () => {
    const result = dateInDays(-4);
    expect(result.toISOString().split('T')[0]).toBe('2024-03-11');
  });
});

describe('formatDate', () => {
  it('formats date as YYYY-MM-DD', () => {
    const date = new Date('2024-03-15T12:00:00Z');
    expect(formatDate(date)).toBe('2024-03-15');
  });

  it('formats single-digit month and day with leading zeros', () => {
    const date = new Date('2024-01-05T00:00:00Z');
    expect(formatDate(date)).toBe('2024-01-05');
  });
});

describe('searchCompetitions', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('calls API with correct params', async () => {
    const mockComps: Competition[] = [
      createMockCompetition({ id: 'TestComp2024', name: 'Test Competition 2024' }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockComps),
    });

    const result = await searchCompetitions({
      country_iso2: 'IE',
      start: '2024-03-11',
    });

    expect(fetch).toHaveBeenCalledWith(
      'https://www.worldcubeassociation.org/api/v0/competitions?country_iso2=IE&start=2024-03-11'
    );
    expect(result).toEqual(mockComps);
  });

  it('returns empty array on error', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await searchCompetitions({ country_iso2: 'IE' });

    expect(result).toEqual([]);
  });
});

describe('getCompsFromNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00Z'));
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('fetches IE and GB comps and filters Northern Ireland', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'DublinOpen2024',
        name: 'Dublin Open 2024',
        city: 'Dublin',
        start_date: '2024-03-20',
        end_date: '2024-03-21',
      }),
    ];

    const gbComps: Competition[] = [
      createMockCompetition({
        id: 'BelfastOpen2024',
        name: 'Belfast Open 2024',
        city: 'Belfast, County Antrim',
        country_iso2: 'GB',
        start_date: '2024-03-25',
        end_date: '2024-03-26',
      }),
      createMockCompetition({
        id: 'LondonOpen2024',
        name: 'London Open 2024',
        city: 'London',
        country_iso2: 'GB',
        start_date: '2024-03-22',
        end_date: '2024-03-23',
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      if (url.includes('country_iso2=GB')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(gbComps),
        });
      }
      return Promise.resolve({ ok: false });
    });

    const result = await getCompsFromNow();

    // Should include Dublin (IE) and Belfast (NI - has "County" in city)
    // Should NOT include London (GB, no "County")
    expect(result).toHaveLength(2);
    expect(result.map((c) => c.id)).toContain('DublinOpen2024');
    expect(result.map((c) => c.id)).toContain('BelfastOpen2024');
    expect(result.map((c) => c.id)).not.toContain('LondonOpen2024');
  });

  it('filters out ended competitions', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'PastComp2024',
        name: 'Past Competition',
        city: 'Dublin',
        start_date: '2024-03-01',
        end_date: '2024-03-02', // Ended before today (March 15)
      }),
      createMockCompetition({
        id: 'FutureComp2024',
        name: 'Future Competition',
        city: 'Cork',
        start_date: '2024-03-20',
        end_date: '2024-03-21',
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const result = await getCompsFromNow();

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('FutureComp2024');
  });

  it('sorts by start_date descending', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'EarlyComp',
        city: 'Dublin',
        start_date: '2024-03-20',
        end_date: '2024-03-21',
      }),
      createMockCompetition({
        id: 'LateComp',
        city: 'Cork',
        start_date: '2024-04-15',
        end_date: '2024-04-16',
      }),
      createMockCompetition({
        id: 'MiddleComp',
        city: 'Galway',
        start_date: '2024-03-25',
        end_date: '2024-03-26',
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const result = await getCompsFromNow();

    expect(result[0].id).toBe('LateComp');
    expect(result[1].id).toBe('MiddleComp');
    expect(result[2].id).toBe('EarlyComp');
  });
});

describe('getCurrentCompetition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T12:00:00Z'));
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('returns undefined when no current competition', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'FutureComp',
        city: 'Dublin',
        start_date: '2024-03-20', // Future
        end_date: '2024-03-21',
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const result = await getCurrentCompetition();

    expect(result).toBeUndefined();
  });

  it('returns competition when start_date is today', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'TodayComp',
        name: 'Today Competition',
        city: 'Dublin',
        start_date: '2024-03-15', // Today
        end_date: '2024-03-16',
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const result = await getCurrentCompetition();

    expect(result).toBeDefined();
    expect(result?.id).toBe('TodayComp');
  });

  it('returns competition when start_date is in the past but end_date is today or future', async () => {
    const ieComps: Competition[] = [
      createMockCompetition({
        id: 'OngoingComp',
        name: 'Ongoing Competition',
        city: 'Dublin',
        start_date: '2024-03-14', // Yesterday
        end_date: '2024-03-16', // Tomorrow
      }),
    ];

    (fetch as ReturnType<typeof vi.fn>).mockImplementation((url: string) => {
      if (url.includes('country_iso2=IE')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(ieComps),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });

    const result = await getCurrentCompetition();

    expect(result).toBeDefined();
    expect(result?.id).toBe('OngoingComp');
  });
});

function createMockCompetition(overrides: Partial<Competition> = {}): Competition {
  return {
    id: 'TestComp2024',
    name: 'Test Competition 2024',
    registration_open: '2024-01-01',
    registration_close: '2024-03-01',
    announced_at: '2024-01-01',
    start_date: '2024-03-20',
    end_date: '2024-03-21',
    competitor_limit: 100,
    cancelled_at: null,
    url: 'https://www.worldcubeassociation.org/competitions/TestComp2024',
    website: 'https://testcomp.com',
    short_name: 'Test 2024',
    city: 'Dublin',
    venue_address: '123 Test Street',
    venue_details: 'Main Hall',
    latitude_degrees: 53.3498,
    longitude_degrees: -6.2603,
    country_iso2: 'IE',
    event_ids: ['333', '222', '444'],
    delegates: null,
    trainee_delegates: null,
    organizers: null,
    class: 'competition',
    ...overrides,
  };
}
