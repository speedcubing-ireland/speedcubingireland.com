import { WCA_API_URL } from '../constants';
import { Competition } from './types';

function getCurrentDate() {
  if (process.env.NODE_ENV === 'development') {
    // return new Date('2022-11-05');
  }
  return new Date();
}

export function dateInDays(days: number): Date {
  return new Date(getCurrentDate().getTime() + days * 24 * 60 * 60 * 1000);
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function searchCompetitions(options: Record<string, string>): Promise<Competition[]> {
  const searchParams = new URLSearchParams(options);
  const reqUrl = `${WCA_API_URL}/competitions?${searchParams.toString()}`;
  const res = await fetch(reqUrl);
  if (!res.ok) return [];
  return res.json();
}

export async function getCompsFromNow(): Promise<Competition[]> {
  const comps = await searchCompetitions({
    country_iso2: 'IE',
    start: formatDate(dateInDays(-4)),
    sort: ['start_date'].join(','),
  });

  const ukComps = await searchCompetitions({
    country_iso2: 'GB',
    start: formatDate(dateInDays(-4)),
    sort: ['start_date'].join(','),
  });

  const niComps = ukComps.filter((comp) => comp.city.includes('County'));

  const today = getCurrentDate();
  today.setHours(0, 0, 0, 0);

  return [...comps, ...niComps].filter((comp) => {
    const compDate = new Date(comp.end_date);
    return compDate >= today;
  }).sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));
}

export async function getCurrentCompetition(): Promise<Competition | undefined> {
  const today = getCurrentDate();
  today.setHours(0, 0, 0, 0);

  const comps = await getCompsFromNow();

  const filtered = comps.filter((comp) => new Date(comp.start_date) <= today);
  return filtered.length === 0 ? undefined : filtered[0];
}
