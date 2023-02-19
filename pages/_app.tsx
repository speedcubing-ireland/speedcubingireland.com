import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider, useTheme } from 'next-themes';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect } from 'react';
import { themeData } from '../utils/theme';

config.autoAddCss = false;

const themes = themeData.map((theme) => theme.name);

function ThemeController() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!window) return () => {};

    const listener = (e: KeyboardEvent) => {
      if ((!e.metaKey && !e.ctrlKey) || !theme) return;

      let increment = 0;
      if (e.key === '[') {
        increment = -1;
      } else if (e.key === ']') {
        increment = 1;
      } else return;

      const themeIdx = themes.indexOf(theme);
      if (themeIdx === -1) return;

      const nextThemeIdx = (themes.length + themeIdx + increment) % themes.length;
      setTheme(themes[nextThemeIdx]);
    };

    window.addEventListener('keyup', listener);
    return () => window.removeEventListener('keyup', listener);
  }, [theme, setTheme]);
  return <div />;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="data-theme"
      themes={themes}
      disableTransitionOnChange
      defaultTheme="emerald"
      enableSystem={false}
    >
      <ThemeController />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
