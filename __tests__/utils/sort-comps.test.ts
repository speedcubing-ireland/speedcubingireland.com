import { describe, it, expect } from 'vitest';
import { sortComps } from '../../pages/index';
import { Competition } from '../../utils/wca-api/types';

describe('sortComps', () => {
  it('returns empty array for empty input', () => {
    const result = sortComps([]);
    expect(result).toEqual([]);
  });

  it('returns single regular competition with series: false and id', () => {
    const comps = [createMockCompetition({ id: 'DublinOpen2024', name: 'Dublin Open 2024' })];

    const result = sortComps(comps);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'DublinOpen2024',
      name: 'Dublin Open 2024',
      registration_open: '2024-01-01',
      registration_close: '2024-03-01',
      start_date: '2024-03-20',
      end_date: '2024-03-21',
      city: 'Dublin',
      series: false,
    });
  });

  it('processes maximum 4 competitions even with larger input', () => {
    const comps = [
      createMockCompetition({ id: 'Comp1', name: 'Competition 1' }),
      createMockCompetition({ id: 'Comp2', name: 'Competition 2' }),
      createMockCompetition({ id: 'Comp3', name: 'Competition 3' }),
      createMockCompetition({ id: 'Comp4', name: 'Competition 4' }),
      createMockCompetition({ id: 'Comp5', name: 'Competition 5' }),
      createMockCompetition({ id: 'Comp6', name: 'Competition 6' }),
    ];

    const result = sortComps(comps);

    expect(result).toHaveLength(4);
    expect(result.map((c) => c.name)).toEqual([
      'Competition 1',
      'Competition 2',
      'Competition 3',
      'Competition 4',
    ]);
  });

  it('combines Saturday/Sunday pair into single HeroComp with series: true', () => {
    const comps = [
      createMockCompetition({
        id: 'DublinSat2024',
        name: 'Dublin Open Saturday 2024',
        start_date: '2024-03-16',
        end_date: '2024-03-16',
        registration_open: '2024-01-01',
        registration_close: '2024-03-10',
      }),
      createMockCompetition({
        id: 'DublinSun2024',
        name: 'Dublin Open Sunday 2024',
        start_date: '2024-03-17',
        end_date: '2024-03-17',
        registration_open: '2024-01-05',
        registration_close: '2024-03-12',
      }),
    ];

    const result = sortComps(comps);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      name: 'Dublin Open 2024',
      registration_open: '2024-01-01',
      registration_close: '2024-03-12',
      start_date: '2024-03-16',
      end_date: '2024-03-17',
      city: 'Dublin',
      series: true,
    });
  });

  it('formats series name by removing "Saturday " from name', () => {
    const comps = [
      createMockCompetition({ name: 'Cork Cubing Saturday 2024' }),
      createMockCompetition({ name: 'Cork Cubing Sunday 2024' }),
    ];

    const result = sortComps(comps);

    expect(result[0].name).toBe('Cork Cubing 2024');
  });

  it('handles mixed regular and series competitions correctly', () => {
    const comps = [
      createMockCompetition({ id: 'RegularComp', name: 'Galway Open 2024' }),
      createMockCompetition({ name: 'Dublin Saturday 2024', start_date: '2024-03-23' }),
      createMockCompetition({ name: 'Dublin Sunday 2024', start_date: '2024-03-24' }),
      createMockCompetition({ id: 'AnotherRegular', name: 'Cork Open 2024' }),
    ];

    const result = sortComps(comps);

    expect(result).toHaveLength(3);
    expect(result[0].name).toBe('Galway Open 2024');
    expect(result[0].series).toBe(false);
    expect(result[1].name).toBe('Dublin 2024');
    expect(result[1].series).toBe(true);
    expect(result[2].name).toBe('Cork Open 2024');
    expect(result[2].series).toBe(false);
  });

  it('limits to 4 actual competitions when series are involved', () => {
    const comps = [
      createMockCompetition({ name: 'Series1 Saturday 2024' }),
      createMockCompetition({ name: 'Series1 Sunday 2024' }),
      createMockCompetition({ name: 'Series2 Saturday 2024' }),
      createMockCompetition({ name: 'Series2 Sunday 2024' }),
      createMockCompetition({ id: 'Comp3', name: 'Competition 3' }),
      createMockCompetition({ id: 'Comp4', name: 'Competition 4' }),
      createMockCompetition({ id: 'Comp5', name: 'Competition 5' }),
    ];

    const result = sortComps(comps);

    // 4 actual comp slots: Series1, Series2, Comp3, Comp4
    expect(result).toHaveLength(4);
    expect(result[0].name).toBe('Series1 2024');
    expect(result[1].name).toBe('Series2 2024');
    expect(result[2].name).toBe('Competition 3');
    expect(result[3].name).toBe('Competition 4');
  });

  it('handles Saturday at end of array without Sunday pair', () => {
    // Edge case: Saturday comp at end without a Sunday pair
    // The function increments i and accesses comps[i+1] which will be undefined
    const comps = [
      createMockCompetition({ id: 'Regular', name: 'Regular Comp 2024' }),
      createMockCompetition({ id: 'Orphan', name: 'Orphan Saturday 2024' }),
    ];

    // This documents current behavior - nextComp will be undefined
    // which means nextComp.registration_close and nextComp.end_date will throw
    expect(() => sortComps(comps)).toThrow();
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
