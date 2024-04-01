import Layout from '@/components/layout/Layout';
import { validateRequest } from '@/lib/auth';
import { User } from 'lucia';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import WCALogo from '@/public/logos/wca-logo-small.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faPen, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { getPersonComps } from '@/lib/wca-api';
import { counties } from '@/lib/constants';
import { Fragment, useState } from 'react';

function Login() {
  return (
    <>
      <h2>Login or Sign Up!</h2>
      <p>
        To be listed within the rankings you need to connect your WCA account.
        You can do this with the button below.
        Please also login in order to change your account settings.
      </p>
      <Link
        href="/api/login/wca"
        className="btn gap-2"
      >
        <WCALogo className="h-6 w-6" />
        Login with WCA
      </Link>
    </>
  );
}

function TitleParts() {
  return (
    <>
      <h2>Account Settings</h2>
      <p>
        Please note that in order for you to be listed in the rankings,
        you need to have competed officially in a WCA competition
        within Ireland or Northern Ireland.
      </p>
      <p>
        Results on the rankings page may take a couple of minutes to update
        after changes have been submitted on this page.
      </p>
    </>
  );
}

function Account({ account, hasComp }: {
  account: User, hasComp: boolean
}) {
  const router = useRouter();
  const [county, setCounty] = useState(account.county ?? '');
  const [visible, setVisible] = useState(account.visible ?? true);

  if (!hasComp) {
    return (
      <>
        <TitleParts />
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Cannot find results from Irish or NI competition.</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TitleParts />
      <h3>{`Settings for ${account.wcaId}`}</h3>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">County</span>
        </label>
        <select
          className={`select select-sm select-bordered ${county === '' ? 'select-error' : ''}`}
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        >
          <option disabled value="">Select County</option>
          {Object.entries(counties).map(([key, value]) => (
            <Fragment key={key}>
              <option disabled>{key}</option>
              {value.map((countyOption) => (
                <option value={countyOption} key={countyOption}>{countyOption}</option>
              ))}
            </Fragment>
          ))}
        </select>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Visibility</span>
        </label>
        <select className="select select-sm select-bordered" value={visible.toString()} onChange={(e) => setVisible(e.target.value === 'true')}>
          <option value="true">Show me in the rankings</option>
          <option value="false">Hide me from the rankings</option>
        </select>
      </div>
      <div className="flex justify-start gap-2 py-4">
        <Link
          href={`/api/account/${county === '' ? 'none' : county}/${visible}`}
          className="btn gap-2"
          type="submit"
        >
          <FontAwesomeIcon icon={faPen} />
          Update
        </Link>
        <button
          type="submit"
          className="btn gap-2"
          onClick={() => {
            fetch('/api/logout', {
              method: 'POST',
            }).then(() => {
              router.reload();
            });
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </>
  );
}

export const getServerSideProps = (async (context: GetServerSidePropsContext) => {
  const { user } = await validateRequest(context.req, context.res);

  if (!user) {
    return {
      props: {
        user: '',
        beenToComp: false,
      },
    };
  }

  let { beenToComp } = user;
  if (!beenToComp) {
    const comps = await getPersonComps(user!.wcaId);
    beenToComp = comps.some((comp) => comp.country_iso2 === 'IE'
      || (comp.country_iso2 === 'GB' && comp.city.includes('County')));
  }

  return {
    props: {
      user,
      beenToComp,
    },
  };
}) satisfies GetServerSideProps<{ user: '' } | {
  user: User;
  beenToComp: boolean;
}>;

export default function Page({
  user: serverUser,
  beenToComp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = serverUser === '' ? null : serverUser;

  return (
    <Layout>
      <Head>
        <title>County Rankings | Speedcubing Ireland</title>
        <meta
          name="description"
          content="This is the unofficial county rankings for Ireland, based on results with in the WCA database and user submitted counties."
        />
      </Head>
      <article className="prose max-w-prose mx-auto p-8">
        <h1>County Rankings</h1>
        {user ? <Account account={user!} hasComp={beenToComp} /> : <Login />}
        <p>
          <Link href="/ranks" className="gap-2">
            <FontAwesomeIcon icon={faCaretLeft} className="h-4 w-4" />
            Return to Rankings
          </Link>
        </p>
      </article>
    </Layout>
  );
}
