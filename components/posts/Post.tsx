import Head from 'next/head';
import Layout from '../layout/Layout';

export default function Post({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <Layout>
      <Head>
        <title>{`${title} - speedcubing.cat`}</title>
      </Head>
      <div className="bg-base-100">
        <article className="prose max-w-prose mx-auto p-8">
          {children}
        </article>
      </div>
    </Layout>
  );
}
