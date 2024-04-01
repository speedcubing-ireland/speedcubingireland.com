import { User } from 'lucia';
import { Events, MultiplePerson } from '@/lib/wca-api/types';

type SimpleRankData = {
  name: string;
  wcaId: string;
  county: string;
  events: Record<Events, RankData>;
};

type RankData = {
  single: Number | null;
  average: Number | null;
};

export function SimplfyData(data: MultiplePerson[], users: User[]): SimpleRankData[] {
  return data.map((person) => {
    const matchingUser = users.find((user) => user.wcaId === person.person.wca_id);
    if (!matchingUser || !matchingUser.county) return null;
    return ({
      name: person.person.name,
      wcaId: person.person.wca_id,
      county: matchingUser.county,
      events: Object.entries(person.personal_records).map(([event, records]) => ({
        [event]: {
          single: records.single?.best ?? null,
          average: records.average?.best ?? null,
        } satisfies RankData,
      })).reduce((acc, val) => Object.assign(acc, val), {}) as Record<Events, RankData>,
    }) satisfies SimpleRankData;
  }).filter((person) => person !== null) as SimpleRankData[];
}
