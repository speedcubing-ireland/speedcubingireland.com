import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useLightDarkOption<T>(light: T, dark: T): T {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && resolvedTheme === 'dark';

  useEffect(() => setMounted(true), []);

  return mounted && isDark ? dark : light;
}
