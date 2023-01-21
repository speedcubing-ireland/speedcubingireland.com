import { WCA_LIVE_API_URL } from '../constants';

const SEARCH_BY_NAME_QUERY = /* GraphQL */ (`
  query Competitions($filter: String!) {
    competitions(filter: $filter, limit: 10) {
      id
      name
    }
  }
`);

export async function getWCALiveCompetitionId(name: string): Promise<string | undefined> {
  const variables = {
    filter: name,
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: SEARCH_BY_NAME_QUERY, variables }),
  };

  const req = await fetch(WCA_LIVE_API_URL, options);
  if (!req.ok) return undefined;

  const res = await req.json();
  const comps = res.data.competitions;
  return comps.find((comp: any) => comp.name === name)?.id;
}
