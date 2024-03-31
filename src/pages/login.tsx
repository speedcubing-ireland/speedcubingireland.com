import { validateRequest } from '@/lib/auth';

import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import Link from 'next/link';

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{}>> {
  const { user } = await validateRequest(context.req, context.res);
  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {},
  };
}

export default function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <Link href="/api/login/wca">Sign in with WCA</Link>
    </>
  );
}
