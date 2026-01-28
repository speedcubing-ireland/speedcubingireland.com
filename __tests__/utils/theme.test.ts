import { describe, it, expect } from 'vitest';
import { isThemeDark, themeData } from '../../utils/theme';

describe('isThemeDark', () => {
  it('returns true for "dark" theme', () => {
    expect(isThemeDark('dark')).toBe(true);
  });

  it('returns false for "light" theme', () => {
    expect(isThemeDark('light')).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isThemeDark(undefined)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isThemeDark('')).toBe(false);
  });

  it('returns falsy for unknown theme', () => {
    expect(isThemeDark('nonexistent-theme')).toBeFalsy();
  });
});

describe('themeData', () => {
  const darkThemes = [
    'dark',
    'synthwave',
    'halloween',
    'forest',
    'aqua',
    'black',
    'luxury',
    'dracula',
    'business',
    'night',
    'coffee',
  ];

  const lightThemes = [
    'light',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'retro',
    'cyberpunk',
    'valentine',
    'garden',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'cmyk',
    'autumn',
    'acid',
    'lemonade',
    'winter',
  ];

  it('has 29 themes', () => {
    expect(themeData).toHaveLength(29);
  });

  it.each(darkThemes)('marks %s as dark', (themeName) => {
    const theme = themeData.find((t) => t.name === themeName);
    expect(theme).toBeDefined();
    expect(theme?.dark).toBe(true);
  });

  it.each(lightThemes)('marks %s as light', (themeName) => {
    const theme = themeData.find((t) => t.name === themeName);
    expect(theme).toBeDefined();
    expect(theme?.dark).toBe(false);
  });

  it('isThemeDark returns correct value for all themes', () => {
    for (const theme of themeData) {
      expect(isThemeDark(theme.name)).toBe(theme.dark);
    }
  });
});
