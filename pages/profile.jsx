import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

export default function Home() {
  const { getSession, status } = useSession();
  const sessionObj = getSession?.user;

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <Header />

      <main>
        <h1>
          This is a profile page.
        </h1>
      </main>

      <BottomNav />

    </div>
  )
}
