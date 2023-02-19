import { readdirSync, readFileSync } from 'fs';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import path from 'path';
import Layout from '../../components/layout/Layout';

const postsPath = path.join(process.cwd(), '/posts/');

export const getStaticPaths: GetStaticPaths = async () => {
  const files = readdirSync(postsPath);
  const slugs: string[] = [];
  files.forEach((file) => {
    if (file.endsWith('.mdx')) {
      slugs.push(file.substring(0, file.length - 4));
    }
  });

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const content = await readFileSync(`${postsPath + params!.slug}.mdx`, 'utf8');
  const mdxSource = await serialize(content);
  return {
    props: {
      mdxSource,
    },
  };
};

export default function Post({ mdxSource }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div className="bg-base-100">
        <article className="prose max-w-prose mx-auto p-8">
          <MDXRemote {...mdxSource} />
        </article>
      </div>
    </Layout>
  );
}
