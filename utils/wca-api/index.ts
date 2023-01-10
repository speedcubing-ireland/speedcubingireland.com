import { Competition } from './types';

const { WCA_API_URL } = process.env;

export function FormatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export async function SearchCompetitions(options: Record<string, string>): Promise<Competition[]> {
  const searchParams = new URLSearchParams(options);
  const reqUrl = `${WCA_API_URL}/competitions?${searchParams.toString()}`;
  const res = await fetch(reqUrl);
  return res.json();
}
