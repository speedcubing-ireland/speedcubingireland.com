import { useEffect } from 'react';
import Redirecting from '../../components/redirects/Redirecting';
import { CURRENT_COMP_REVALIDATE_TIME } from '../../utils/constants';
import { getCurrentCompetition } from '../../utils/wca-api';
import { getWCALiveCompetitionId } from '../../utils/wca-live';

const INTEGRATED_LIVE_RESULTS_COMPETITIONS = new Set([
  'MayoCubing2026',
  'ReLaoistheCubers2026',
]);

async function getRedirectUrl(): Promise<string> {
  const currentComp = await getCurrentCompetition();

  if (currentComp && INTEGRATED_LIVE_RESULTS_COMPETITIONS.has(currentComp.id)) {
    return `https://www.worldcubeassociation.org/competitions/${currentComp.id}/live`;
  }

  let redirect = 'https://live.worldcubeassociation.org/';
  if (currentComp) {
    const wcaLiveId = await getWCALiveCompetitionId(currentComp.name);
    if (wcaLiveId) redirect += `competitions/${wcaLiveId}`;
  }
  return redirect;
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

export function WcaLive() {
  useEffect(() => {
    getRedirectUrl().then((currentComp) => {
      if (window) window.location.href = currentComp;
    });
  }, []);

  return (
    <Redirecting />
  );
}

export default WcaLive;
