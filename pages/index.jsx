import Head from 'next/head';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import Router from 'next/router';

export default function Home() {
  const { getSession, status } = useSession();
  const sessionObj = getSession?.user;

  console.log('sessionObj:', sessionObj);
  console.log('status:', status);

  // this needs to be changed after spotify redirect URL is whitelisted
  if (status === 'unauthenticated') {
    Router.push('/home');
  } else {
    return (
      <div>
        <Head>
          <title>forte</title>
        </Head>

        <main>
          <button type="submit" onClick={() => { signIn(); }}>
            Sign In
          </button>
        </main>
      </div>
    );
  }
}
