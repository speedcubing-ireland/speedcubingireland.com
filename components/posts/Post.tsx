import Layout from '../layout/Layout';

export default function Post({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="bg-base-100">
        <article className="prose max-w-prose mx-auto p-8">
          {children}
        </article>
      </div>
    </Layout>
  );
}
