import {
  describe, it, expect, afterEach,
} from 'vitest';
import { formatCompDates, HeroComp } from '../../components/home/Hero';

function createMockHeroComp(overrides: Partial<HeroComp> & { series?: boolean } = {}): HeroComp {
  const { series = false, ...rest } = overrides;

  if (series) {
    return {
      name: 'Test Competition 2024',
      registration_open: '2024-01-01',
      registration_close: '2024-03-01',
      start_date: '2024-03-20',
      end_date: '2024-03-21',
      city: 'Dublin',
      series: true,
      ...rest,
    } as HeroComp;
  }

  return {
    id: 'TestComp2024',
    name: 'Test Competition 2024',
    registration_open: '2024-01-01',
    registration_close: '2024-03-01',
    start_date: '2024-03-20',
    end_date: '2024-03-21',
    city: 'Dublin',
    series: false,
    ...rest,
  } as HeroComp;
}

describe('formatCompDates', () => {
  it('formats single day event', () => {
    const comp = createMockHeroComp({
      start_date: '2024-03-15',
      end_date: '2024-03-15',
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Mar 15, 2024');
  });

  it('formats multi-day event in same month', () => {
    const comp = createMockHeroComp({
      start_date: '2024-03-15',
      end_date: '2024-03-17',
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Mar 15 - 17, 2024');
  });

  it('formats multi-day event across different months', () => {
    const comp = createMockHeroComp({
      start_date: '2024-03-31',
      end_date: '2024-04-01',
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Mar 31 - Apr 1, 2024');
  });

  it('formats event across year boundary', () => {
    const comp = createMockHeroComp({
      start_date: '2023-12-31',
      end_date: '2024-01-01',
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Dec 31, 2023 - Jan 1, 2024');
  });

  it('formats series event with ampersand separator', () => {
    const comp = createMockHeroComp({
      start_date: '2024-03-15',
      end_date: '2024-03-22',
      series: true,
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Mar 15 & 22, 2024');
  });

  it('formats series event across different months', () => {
    const comp = createMockHeroComp({
      start_date: '2024-03-30',
      end_date: '2024-04-06',
      series: true,
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Mar 30 & Apr 6, 2024');
  });

  it('formats series event across year boundary', () => {
    const comp = createMockHeroComp({
      start_date: '2023-12-30',
      end_date: '2024-01-06',
      series: true,
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Dec 30, 2023 & Jan 6, 2024');
  });

  it('formats September dates using "Sep" regardless of environment locale', () => {
    const comp = createMockHeroComp({
      start_date: '2026-09-05',
      end_date: '2026-09-06',
    });

    const result = formatCompDates(comp);

    expect(result).toBe('Sep 5 - 6, 2026');
    expect(result).not.toContain('Sept');
  });

  describe('timezone independence', () => {
    const originalTz = process.env.TZ;

    afterEach(() => {
      // Assigning undefined would leave TZ as the string 'undefined', which
      // silently puts the rest of the worker on GMT instead of the local zone.
      if (originalTz === undefined) {
        delete process.env.TZ;
      } else {
        process.env.TZ = originalTz;
      }
    });

    // A timezone behind UTC, one ahead of it, and UTC itself. Dates arrive as
    // plain YYYY-MM-DD and parse as UTC midnight, so reading them locally would
    // shift the day and make the server (UTC) and client render differently.
    it.each([
      ['UTC'],
      ['America/Los_Angeles'],
      ['Pacific/Auckland'],
    ])('formats identically in %s', (timeZone) => {
      process.env.TZ = timeZone;

      // Guard against a vacuous test: confirm the timezone change took effect.
      expect(Intl.DateTimeFormat().resolvedOptions().timeZone).toBe(timeZone);

      const singleDay = createMockHeroComp({
        start_date: '2026-09-05',
        end_date: '2026-09-05',
      });
      const acrossYears = createMockHeroComp({
        start_date: '2023-12-31',
        end_date: '2024-01-01',
      });

      expect(formatCompDates(singleDay)).toBe('Sep 5, 2026');
      expect(formatCompDates(acrossYears)).toBe('Dec 31, 2023 - Jan 1, 2024');
    });
  });
});
