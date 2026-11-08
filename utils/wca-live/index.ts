import { WCA_LIVE_URL, WCA_URL } from '../constants';
import type { Competition } from '../wca-api/types';

// All Irish competitions use the WCA's integrated live results.
export function getLiveResultsUrl(competition?: Pick<Competition, 'id'>): string {
  if (!competition) return `${WCA_LIVE_URL}/`;
  return `${WCA_URL}/competitions/${encodeURIComponent(competition.id)}/live`;
}
