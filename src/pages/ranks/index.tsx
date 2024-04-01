import type {
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import { db, users } from '@/lib/db';
import { getPersons } from '@/lib/wca-api';
import RankTable, { PersonEventData } from '@/components/ranks/rank-table';

const userIds = [
  '2012BEAH01',
  '2022HAIN04',
  '2021DOHE02',
  '2019NATS02',
  '2023DOWL01',
  '2019TYRR01',
  '2019MCMO01',
  '2019CARE02',
  '2017KELL08',
  '2021OFLA01',
  '2017OTOO03',
  '2023KNOX02',
  '2022KURJ01',
  '2017WAYN01',
  '2022TULL02',
  '2018CONN04',
  '2022VAWD01',
  '2023BAIL04',
  '2023MOOR03',
  '2023LEPA01',
  '2018LEAD01',
  '2022EDGE01',
  '2020BYRN03',
  '2022HARA04',
  '2017MADD04',
  '2019FROG01',
  '2019FURL04',
  '2022CORR06',
  '2019QUIN11',
  '2022ANDZ01',
  '2020BERM02',
  '2017CRAV01',
  '2021SCHU02',
  '2019POWE08',
  '2018ANAS01',
  '2021OCON01',
  '2021MULR01',
  '2023OSHE02',
  '2023ORMO02',
  '2023KELL23',
  '2023TYRR01',
  '2023MARA10',
];

export const getStaticProps: GetStaticProps = (async () => {
  const ids = await db.select({ wcaId: users.wcaId }).from(users).execute();
  const combinedIds = [...new Set([...ids, ...userIds.map((wcaId) => ({ wcaId }))])];

  const persons = await getPersons(combinedIds.map(({ wcaId }: any) => wcaId));

  const data: PersonEventData[] = persons
    .filter((p) => p.personal_records[333])
    .map((p) => ({
      name: p.person.name,
      wcaId: p.person.wca_id,
      country: p.person.country_iso2,
      single: p.personal_records[333].single?.best || 0,
      average: p.personal_records[333].average?.best || 0,
      fullAverage: p.personal_records[333].average?.best || 0,
    } satisfies PersonEventData));

  return {
    props: {
      competitorData: data,
    },
    revalidate: 60 * 60 * 24,
  };
}) satisfies GetStaticProps;

export default function Page({
  competitorData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Head>
        <title>County Rankings | Speedcubing Ireland</title>
        <meta
          name="description"
          content="This is the unofficial county rankings for Ireland, based on results with in the WCA database and user submitted counties."
        />
      </Head>
      <div className="bg-base-100">
        <article className="prose max-w-prose mx-auto p-8">
          <h1>County Rankings</h1>
          <p>
            These are the unofficial county rankings based on competitor submitted locations.
            It uses results from official competitions which have been sanctioned by the WCA
          </p>
        </article>
        <RankTable data={competitorData} />
      </div>
    </Layout>
  );
}
