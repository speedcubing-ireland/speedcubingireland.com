import { WCA_API_URL } from '../constants';
import { Competition } from './types';

function getCurrentDate() {
  if (process.env.NODE_ENV === 'development') {
    // return new Date('2022-11-05');
  }
  return new Date();
}

// WCA dates (start_date/end_date) are date-only strings parsed as UTC midnight,
// so "today" must also be computed in UTC to avoid off-by-one errors in other timezones.
function getTodayUTC(): Date {
  const now = getCurrentDate();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
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

const NI_COUNTIES = [
  'County Antrim',
  'County Armagh',
  'County Down',
  'County Fermanagh',
  'County Londonderry',
  'County Tyrone',
];

const NI_COUNTY_PARTS = new Set(
  NI_COUNTIES.flatMap((county) => {
    const countyLower = county.toLowerCase();
    return [countyLower, countyLower.replace(/^county\s+/, '')];
  }),
);

function isNorthernIrelandCity(city: string): boolean {
  return city
    .toLowerCase()
    .split(',')
    .map((part) => part.trim())
    .some((part) => NI_COUNTY_PARTS.has(part));
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

  const niComps = ukComps.filter((comp) => isNorthernIrelandCity(comp.city));

  const today = getTodayUTC();

  return [...comps, ...niComps].filter((comp) => {
    if (!comp) return false;
    const compDate = new Date(comp.end_date);
    return compDate >= today;
  }).sort((a, b) => Date.parse(b.start_date) - Date.parse(a.start_date));
}

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_DAYS_BEFORE_START = 4;

// The date from which the comp links point at an upcoming competition:
// MAX_DAYS_BEFORE_START days before it starts, but never earlier than the
// Monday of the week it starts in. This lets people who scan the printed QR
// code a few days early land on the right competition, without a comp on the
// following weekend taking over the links from this weekend's comp.
export function getLinkActivationDate(startDate: string): Date {
  const start = new Date(startDate);
  const daysSinceMonday = (start.getUTCDay() + 6) % 7;
  const monday = new Date(start.getTime() - daysSinceMonday * DAY_MS);
  const earliest = new Date(start.getTime() - MAX_DAYS_BEFORE_START * DAY_MS);
  return earliest > monday ? earliest : monday;
}

// The competition the comp links should point at: a running competition if
// there is one, otherwise the soonest upcoming one whose links are active.
export async function getCurrentCompetition(): Promise<Competition | undefined> {
  const today = getTodayUTC();

  // Sorted by start_date descending, so the first match is the latest started.
  const comps = await getCompsFromNow();

  const running = comps.find((comp) => new Date(comp.start_date) <= today);
  if (running) return running;

  const upcoming = comps
    .filter((comp) => getLinkActivationDate(comp.start_date) <= today)
    .sort((a, b) => Date.parse(a.start_date) - Date.parse(b.start_date));
  return upcoming[0];
}
