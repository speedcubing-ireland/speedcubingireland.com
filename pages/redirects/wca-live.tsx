import { CURRENT_COMP_REVALIDATE_TIME } from '../../utils/constants';
import { getCurrentCompetition } from '../../utils/wca-api';
import { getWCALiveCompetitionId } from '../../utils/wca-live';

export async function getStaticProps() {
  const currentComp = await getCurrentCompetition();

  let redirect = 'https://live.worldcubeassociation.org/';
  if (currentComp) {
    const wcaLiveId = await getWCALiveCompetitionId(currentComp.name);
    if (wcaLiveId) redirect += `competitions/${wcaLiveId}`;
  }

  return {
    redirect: {
      permanent: false,
      destination: redirect,
    },
    revalidate: CURRENT_COMP_REVALIDATE_TIME,
  };
}

export function WcaLive() {
  return null;
}

export default WcaLive;
