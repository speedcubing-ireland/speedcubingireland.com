import Head from 'next/head';

export default function Home() {
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
      </main>
    </>
  );
}
