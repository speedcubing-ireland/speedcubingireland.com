import { CURRENT_COMP_REVALIDATE_TIME } from '../../utils/constants';
import { getCurrentCompetition } from '../../utils/wca-api';

export async function getStaticProps() {
  const currentComp = await getCurrentCompetition();

  let redirect: string;
  if (currentComp) {
    redirect = `https://www.competitiongroups.com/competitions/${currentComp.id}`;
  } else {
    redirect = 'https://www.competitiongroups.com';
  }

  return {
    redirect: {
      permanent: false,
      destination: redirect,
    },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
}

export function CompGroups() {
  return null;
}

export default CompGroups;
