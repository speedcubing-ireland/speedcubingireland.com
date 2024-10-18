import { useEffect } from 'react';
import Redirecting from '../../components/redirects/Redirecting';

export async function getStaticProps() {
  const redirect = 'https://buy.stripe.com/28o2albL3gAX5Ve9AF';

  return {
    redirect: {
      permanent: true,
      destination: redirect,
    },
  };
}

export function WcaLive() {
  useEffect(() => {
    if (window) window.location.href = 'https://buy.stripe.com/28o2albL3gAX5Ve9AF';
  }, []);

  return (
    <Redirecting />
  );
}

export default WcaLive;
