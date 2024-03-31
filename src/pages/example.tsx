import { useRouter } from 'next/router';
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';
import type { User } from 'lucia';
import { validateRequest } from '@/lib/auth';

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<
GetServerSidePropsResult<{
  user: User;
}>
> {
  const { user } = await validateRequest(context.req, context.res);
  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      user,
    },
  };
}

export default function Page({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  return (
    <>
      <h1>
        Hi,
        {user.name}
        !
      </h1>
      <code><pre>{JSON.stringify(user, null, 2)}</pre></code>
      <form
        method="post"
        action="/api/logout"
        onSubmit={async (e) => {
          e.preventDefault();
          const formElement = e.target as HTMLFormElement;
          await fetch(formElement.action, {
            method: formElement.method,
          });
          router.push('/login');
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </>
  );
}
