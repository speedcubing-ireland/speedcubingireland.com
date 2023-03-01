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

export const getStaticProps: GetStaticProps = async () => {
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

  let simplifiedProducts: SimplifiedProduct[] = [];
  const shopifyProducts = session && shopify && await shopify.rest.Product.all({ session });
  if (shopifyProducts) simplifiedProducts = shopifyProducts.map(simplifyShopifyProduct);

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
    <Layout home>
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
