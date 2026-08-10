import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeData {
  name: string;
  dark: boolean;
}

export const themeData: ThemeData[] = [
  {
    name: 'speedcubing',
    dark: false,
  },
  {
    name: 'speedcubing-dark',
    dark: true,
  },
];

export function isThemeDark(theme: string | undefined) {
  if (!theme) return false;
  const data = themeData.find((d) => d.name === theme);

  return data && data.dark;
}

const TYPING_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT'];

// The theme shortcut is a bare "T" keypress, so it must not fire while the user
// is typing into a form control (e.g. the contact form).
export function isTypingTarget(target: EventTarget | null): boolean {
  const element = target as HTMLElement | null;
  if (!element) return false;
  if (element.isContentEditable) return true;

  return TYPING_TAG_NAMES.includes(element.tagName);
}

export function useLightDarkOption<T>(light: T, dark: T): T {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && isThemeDark(resolvedTheme);

  useEffect(() => setMounted(true), []);

  return mounted && isDark ? dark : light;
}
