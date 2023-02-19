import { GetStaticProps, InferGetStaticPropsType } from 'next';
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

  const shopifyProducts = await shopify.rest.Product.all({ session });
  const simplifiedProducts = shopifyProducts.map(simplifyShopifyProduct);

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
      <Hero comps={comps} />
      <Stats />
      <Divider />
      <Sponsors />
      <Socials />
      <Products products={products} />
    </Layout>
  );
}
