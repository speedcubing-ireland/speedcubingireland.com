import { describe, it, expect } from 'vitest';
import { getLiveResultsUrl } from '../../utils/wca-live';

describe('getLiveResultsUrl', () => {
  it('returns the integrated live results page for the current competition', () => {
    expect(getLiveResultsUrl({ id: 'ThurlesTippTurning2026' }))
      .toBe('https://www.worldcubeassociation.org/competitions/ThurlesTippTurning2026/live');
  });

  it.each(['MayoCubing2026', 'ReLaoistheCubers2026', 'DublinOpen2027'])(
    'uses integrated live results for any competition (%s)',
    (id) => {
      expect(getLiveResultsUrl({ id }))
        .toBe(`https://www.worldcubeassociation.org/competitions/${id}/live`);
    },
  );

  it('falls back to the WCA Live homepage when no competition is running', () => {
    expect(getLiveResultsUrl(undefined)).toBe('https://live.worldcubeassociation.org/');
  });
});
