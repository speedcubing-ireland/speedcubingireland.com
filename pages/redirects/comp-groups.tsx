import { useEffect } from 'react';
import Redirecting from '../../components/redirects/Redirecting';
import { CURRENT_COMP_REVALIDATE_TIME } from '../../utils/constants';
import { getCurrentCompetition } from '../../utils/wca-api';

async function getRedirectUrl(): Promise<string> {
  const currentComp = await getCurrentCompetition();
  if (currentComp) return `https://www.competitiongroups.com/competitions/${currentComp.id}`;
  return 'https://www.competitiongroups.com';
}

export async function getStaticProps() {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return {
      props: {},
      revalidate: 1,
    };
  }

  const redirect = await getRedirectUrl();

  return {
    redirect: {
      permanent: false,
      destination: redirect,
    },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
}

export function CompGroups() {
  useEffect(() => {
    getRedirectUrl().then((currentComp) => {
      if (window) window.location.href = currentComp;
    });
  }, []);

  return (
    <Redirecting />
  );
}

export default CompGroups;
