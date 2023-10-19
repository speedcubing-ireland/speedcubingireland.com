import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  title?: string | undefined;
  children?: JSX.Element | JSX.Element[] | undefined;
}

function Layout({ title, children }: LayoutProps) {
  const pageTitle = title ? `${title} | speedcubing.cat` : 'speedcubing.cat';

  // TODO: add proper meta tags
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}

export default Layout;
