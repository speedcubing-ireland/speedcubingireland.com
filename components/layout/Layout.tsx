import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';

interface LayoutProps {
  title?: string | undefined;
  children?: JSX.Element | JSX.Element[] | undefined;
}

function Layout({ title, children }: LayoutProps) {
  const pageTitle = title ? `${title} | Speedcubing Ireland` : 'Speedcubing Ireland';

  // TODO: add proper meta tags
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <div className="flex-1" />
        <Footer />
      </main>
    </>
  );
}

export default Layout;
