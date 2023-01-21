import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { ThemeProvider } from 'next-themes';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

const themeRemaps = {
  light: 'emerald',
  dark: 'forest',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="data-theme" value={themeRemaps}>
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  );
}
