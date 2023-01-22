import { InferGetStaticPropsType } from 'next';
import Hero, { HeroComp } from '../components/home/Hero';
import Newsletter from '../components/home/Newsletter';
import { getCompsFromNow } from '../utils/wca-api';
import Layout from '../components/layout/Layout';
import { CURRENT_COMP_REVALIDATE_TIME } from '../utils/constants';
import Sponsors from '../components/home/Sponsors';
import Stats from '../components/home/Stats';
import Divider from '../components/home/Divider';

export async function getStaticProps() {
  const comps = await getCompsFromNow();

  const heroComps: HeroComp[] = comps.reverse().slice(0, 4).map((comp) => ({
    id: comp.id,
    name: comp.name,
    registration_open: comp.registration_open,
    registration_close: comp.registration_close,
    start_date: comp.start_date,
    end_date: comp.end_date,
    city: comp.city,
  }));

  return {
    props: {
      comps: heroComps,
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
      <Stats />
      <Divider />
      <Sponsors />
      <Newsletter />
    </Layout>
  );
}
