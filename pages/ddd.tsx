import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { WCA_LIVE_API_URL } from '../utils/constants';
import Layout from '../components/layout/Layout';

const GET_RESULTS_QUERY = /* GraphQL */ (`
  query Competition($id: ID!) {
    competition(id: $id) {
      shortName
      competitionEvents {
        rounds {
          results {
            ...roundResult
          }
        }
      }
    }
  }
  fragment roundResult on Result {
    attempts {
      result
    }
    person {
      name,
      id,
    }
  }
`);

type Data = {
  data: {
    competition: {
      shortName: string;
      competitionEvents: [{
        rounds: [{
          results: [{
            attempts: [{
              result: number;
            }];
            person: {
              name: string;
              id: string;
            };
          }];
        }];
      }];
    }
  }
};

type Result = {
  id: string;
  solves: number;
  dnf: number;
};

export async function getResults(): Promise<{
  results: { [key: string]: Result };
  compName: string;
}> {
  const variables = {
    id: 6914,
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GET_RESULTS_QUERY, variables }),
  };

  const req = await fetch(WCA_LIVE_API_URL, options);
  const res = await req.json() as Data;

  const results: { [key: string]: Result } = {};
  console.log(res);
  res.data.competition.competitionEvents.forEach((event) => {
    event.rounds.forEach((round) => {
      round.results.forEach((result) => {
        const { name } = result.person;
        if (!results[name]) {
          results[name] = {
            id: result.person.id,
            solves: 0,
            dnf: 0,
          };
        }

        result.attempts.forEach((attempt) => {
          if (attempt.result === -1) {
            results[name].dnf += 1;
          } else if (attempt.result > 0) {
            results[name].solves += 1;
          }
        });
      });
    });
  });

  const compName = res.data.competition.shortName;
  return {
    results,
    compName,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const { results, compName } = await getResults();

  return {
    props: {
      results,
      compName,
    },
    revalidate: 600,
  };
};

function ResultsTable({ results }: { results: (Result & { name: string })[] }) {
  return (
    <div className="overflow-x-auto sm:p-8">
      <table className="table table-compact md:table-normal w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Solves</th>
            <th>DNFs</th>
            <th>DNF Rate</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, idx) => {
            const {
              name, solves, dnf,
            } = item;
            const romanName = name.replace(/\(.*\)/, '').trim();
            const dnfRate = Math.round((dnf / (solves + dnf)) * 1000) / 10;
            return (
              <tr key={name} className="hover">
                <th>{idx + 1}</th>
                <td>{romanName}</td>
                <td>{solves}</td>
                <td>{dnf}</td>
                <td>
                  {dnfRate}
                  %
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Solves</th>
            <th>DNFs</th>
            <th>DNF Rate</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default function DNFTracker({
  results,
  compName,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const data = Object.keys(results).map((name) => ({
    name,
    ...results[name],
  }));

  // Sort data such that: DNFs ascending, solves descending
  const sorted = data.sort((a, b) => {
    if (a.dnf !== b.dnf) {
      return a.dnf - b.dnf;
    }

    return b.solves - a.solves;
  });

  return (
    <Layout>
      <Head>
        <title>DNF Tracker - Speedcubing Ireland</title>
      </Head>
      <div className="bg-base-100">
        <div className="prose max-w-prose mx-auto p-8">
          <h2 className="text-secondary">{compName}</h2>
          <h1>Live DNF Tracker</h1>
          <p>
            This table shows live data fetched from WCA live showing
            the number of solves and DNFs achieved by each competitor.
            It is ranked by least DNFs, then most solves.
            Please note this page only refreshes every 5 minutes.
          </p>
        </div>
        {sorted.length > 0 && <ResultsTable results={sorted} />}
        {sorted.length === 0 && (
          <div className="prose max-w-prose mx-auto p-8">
            <h2>✨ No results found ✨</h2>
          </div>
        )}
      </div>
    </Layout>
  );
}
