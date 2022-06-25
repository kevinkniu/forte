import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import BottomNav from './components/BottomNav';

export default function Home() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;

  useEffect(() => {
    const initializeUser = async () => {
      const response = await fetch(`/api/users/${sessionObj?.id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();

      if (!result.length) {
        await fetch('/api/users/createUser', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            id: sessionObj?.id,
            name: sessionObj?.name,
            email: sessionObj?.email,
            profPic: sessionObj?.image,
            genres: [],
            songs: [],
            posts: [],
          }),
        });
        initializeUser();
        return;
      }
      const user = result[0]._delegate._document.data.value.mapValue.fields;
      console.log(user);
    };
    initializeUser();
  }, [sessionObj]);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a home page.
        </h1>
      </main>

      <BottomNav />

    </div>
  );
}
