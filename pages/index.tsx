/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { InferGetStaticPropsType } from 'next';
import Hero from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import { getCompsFromNow } from '../utils/wca-api';
import Layout from '../components/layout/Layout';
import { CURRENT_COMP_REVALIDATE_TIME } from '../utils/constants';
import Sponsors from '../components/home/Sponsors';

export async function getStaticProps() {
  const comps = await getCompsFromNow();
  return {
    props: {
      comps: comps.reverse().slice(0, 4),
    },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
}

export default function Home({
  comps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero comps={comps} />
      <Sponsors />
      <Newsletter />
    </Layout>
  );
}
