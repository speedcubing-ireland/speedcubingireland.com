import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const themeData = [
  {
    name: 'light',
    dark: false,
  },
  {
    name: 'dark',
    dark: true,
  },
  {
    name: 'cupcake',
    dark: false,
  },
  {
    name: 'bumblebee',
    dark: false,
  },
  {
    name: 'emerald',
    dark: false,
  },
  {
    name: 'corporate',
    dark: false,
  },
  {
    name: 'synthwave',
    dark: true,
  },
  {
    name: 'retro',
    dark: false,
  },
  {
    name: 'cyberpunk',
    dark: false,
  },
  {
    name: 'valentine',
    dark: false,
  },
  {
    name: 'halloween',
    dark: true,
  },
  {
    name: 'garden',
    dark: false,
  },
  {
    name: 'forest',
    dark: true,
  },
  {
    name: 'aqua',
    dark: true,
  },
  {
    name: 'lofi',
    dark: false,
  },
  {
    name: 'pastel',
    dark: false,
  },
  {
    name: 'fantasy',
    dark: false,
  },
  {
    name: 'wireframe',
    dark: false,
  },
  {
    name: 'black',
    dark: true,
  },
  {
    name: 'luxury',
    dark: true,
  },
  {
    name: 'dracula',
    dark: true,
  },
  {
    name: 'cmyk',
    dark: false,
  },
  {
    name: 'autumn',
    dark: false,
  },
  {
    name: 'business',
    dark: true,
  },
  {
    name: 'acid',
    dark: false,
  },
  {
    name: 'lemonade',
    dark: false,
  },
  {
    name: 'night',
    dark: true,
  },
  {
    name: 'coffee',
    dark: true,
  },
  {
    name: 'winter',
    dark: false,
  },
];

export function isThemeDark(theme: string | undefined) {
  if (!theme) return false;
  const data = themeData.find((d) => d.name === theme);

  return data && data.dark;
}

export function useLightDarkOption<T>(light: T, dark: T): T {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && isThemeDark(resolvedTheme);

  useEffect(() => setMounted(true), []);

  return mounted && isDark ? dark : light;
}
