import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { SearchCompetitions } from '../utils/wca-api';

export async function getStaticProps() {
  const comps = await SearchCompetitions({
    country_iso2: 'IE',
    // start: FormatDate(new Date()),
    // sort: ['-start_date'].join(','),
  });

  return {
    props: {
      comps,
    },
    revalidate: 10,
  };
}

export default function Home({
  comps,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Speedcubing Ireland</title>
        <meta name="description" content="The home of speedcubing in Ireland" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">
          Welcome to Speedcubing Ireland
        </h1>
        {comps.map((comp) => <p key={comp.id}>{comp.name}</p>)}
      </main>
    </>
  );
}
