import Head from 'next/head';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import BottomNav from './components/BottomNav';

export default function Home() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>
      </main>

      <BottomNav />

    </div>
  );
}
