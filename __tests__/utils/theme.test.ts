import { describe, it, expect } from 'vitest';
import { isThemeDark, themeData } from '../../utils/theme';

describe('isThemeDark', () => {
  it('returns true for "dark" theme', () => {
    expect(isThemeDark('speedcubing-dark')).toBe(true);
  });

  it('returns false for "light" theme', () => {
    expect(isThemeDark('speedcubing')).toBe(false);
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
    'speedcubing-dark',
  ];

  const lightThemes = [
    'speedcubing',
  ];

  it('has 2 themes', () => {
    expect(themeData).toHaveLength(2);
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
    themeData.forEach((theme) => expect(isThemeDark(theme.name)).toBe(theme.dark));
  });
});
