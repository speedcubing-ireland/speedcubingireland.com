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

export function useLightDarkOption<T>(light: T, dark: T): T {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && isThemeDark(resolvedTheme);

  useEffect(() => setMounted(true), []);

  return mounted && isDark ? dark : light;
}
