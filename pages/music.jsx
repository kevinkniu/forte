import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
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
        <h1>
          This is a music page.
        </h1>
      </main>

      <BottomNav />

    </div>
  );
}
