/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { InferGetStaticPropsType } from 'next';
import Hero from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import { getCompsFromNow } from '../utils/wca-api';
import Layout from '../components/layout/Layout';

export async function getStaticProps() {
  const comps = await getCompsFromNow();
  return {
    props: {
      comps: comps.reverse().slice(0, 4),
    },
    revalidate: 10,
  };
}

export default function Home({
  comps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero comps={comps} />
      <Newsletter />
    </Layout>
  );
}
