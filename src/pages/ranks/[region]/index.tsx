import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import { counties } from '@/lib/constants';
import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { db, users } from '@/lib/db';
import { and, eq, isNotNull } from 'drizzle-orm';
import { getPersons } from '@/lib/wca-api';
import { SimplfyData } from '@/lib/ranks';

export const getStaticPaths = (async () => {
  const provinces = Object.keys(counties).map((province) => province.toLowerCase());
  const countiesList = Object.values(counties).flat().map((county) => county.toLowerCase());

  const regions = [...provinces, ...countiesList];

  return {
    paths: regions.map((region) => ({ params: { region } })),
    fallback: true,
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }: { params: { region: string } }) => {
  const { region } = params;

  const ids = await db
    .select()
    .from(users)
    .where(and(isNotNull(users.county), eq(users.visible, true)))
    .execute();

  let idsInRegion: string[];
  const province = Object.keys(counties).find((p) => p.toLowerCase() === region);
  if (province) {
    const countiesInProvince = counties[province].map((county) => county.toLowerCase());
    idsInRegion = ids
      .filter(({ county }) => countiesInProvince.includes(county!.toLowerCase()))
      .map(({ wcaId }) => wcaId);
  } else {
    idsInRegion = ids
      .filter(({ county }) => county!.toLowerCase() === region)
      .map(({ wcaId }) => wcaId);
  }

  const data = ids.length === 0 ? [] : await getPersons(idsInRegion);

  return {
    props: {
      region,
      data: SimplfyData(data, ids),
    },
    revalidate: 60 * 60 * 24,
  };
});

export default function Page({ region, data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const capitalizedRegion = region && region.split(' ').map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return (
    <Layout>
      <Head>
        <title>{`${capitalizedRegion} Rankings | Speedcubing Ireland`}</title>
        <meta
          name="description"
          content="This is the unofficial county rankings for Ireland, based on results with in the WCA database and user submitted counties."
        />
      </Head>
      <div className="bg-base-100">
        <article className="prose max-w-prose mx-auto p-8">
          <h1>{`${capitalizedRegion} Rankings`}</h1>
          <p>
            These are the unofficial county rankings based on competitor submitted locations.
            It uses results from official competitions which have been sanctioned by the WCA
          </p>
          <code>
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          </code>
        </article>
      </div>
    </Layout>
  );
}
