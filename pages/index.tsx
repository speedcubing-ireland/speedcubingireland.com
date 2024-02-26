import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Hero, { HeroComp } from '../components/home/Hero';
import Socials from '../components/home/Socials';
import { getCompsFromNow } from '../utils/wca-api';
import Layout from '../components/layout/Layout';
import { CURRENT_COMP_REVALIDATE_TIME } from '../utils/constants';
import Sponsors from '../components/home/Sponsors';
import Stats from '../components/home/Stats';
import Divider from '../components/home/Divider';
import Products from '../components/home/Products';
import {
  shopify,
  session,
  simplifyShopifyProduct,
  SimplifiedProduct,
} from '../utils/shopify';
import { Competition } from '../utils/wca-api/types';

function sortComps(comps: Competition[]): HeroComp[] {
  const heroComps: HeroComp[] = [];

  let actualCompCount = 0;
  for (let i = 0; actualCompCount < Math.min(comps.length, 4); i += 1) {
    if (i >= comps.length) break;
    const comp = comps[i];
    actualCompCount += 1;
    if (!comp.name.includes('Saturday') && !comp.name.includes('Sunday')) {
      heroComps.push({
        id: comp.id,
        name: comp.name,
        registration_open: comp.registration_open,
        registration_close: comp.registration_close,
        start_date: comp.start_date,
        end_date: comp.end_date,
        city: comp.city,
        series: false,
      });
    } else {
      const name = comp.name.replace('Saturday ', '');
      const nextComp = comps[i += 1];

      heroComps.push({
        name,
        registration_open: comp.registration_open,
        registration_close: nextComp.registration_close,
        start_date: comp.start_date,
        end_date: nextComp.end_date,
        city: comp.city,
        series: true,
      });
    }
  }

  return heroComps;
}

export const getStaticProps: GetStaticProps = async () => {
  const comps = await getCompsFromNow();

  const heroComps = sortComps(comps.reverse());

  let simplifiedProducts: SimplifiedProduct[] = [];
  const shopifyProducts = session && shopify && await shopify.rest.Product.all({ session });
  if (shopifyProducts) {
    simplifiedProducts = shopifyProducts.data
      .filter((product) => product.status === 'active')
      .filter((product) => product.tags?.includes('website'))
      .map(simplifyShopifyProduct);
  }

  return {
    props: {
      comps: heroComps,
      products: simplifiedProducts,
    },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
};

export default function Home({
  comps,
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>Speedcubing Ireland</title>
        <meta name="description" content="Speedcubing Ireland aims to support the growth of the Irish speedcubing community by provide information about cubing and organising WCA competitions." />
      </Head>
      <Hero comps={comps} />
      <Stats />
      <Divider />
      <Sponsors />
      <Socials />
      <Products products={products} />
    </Layout>
  );
}
