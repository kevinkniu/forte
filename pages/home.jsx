import Head from 'next/head';
import { useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';
import Header from './components/HomeHeader';
import Posts from './components/Posts';

export default function Home() {
  const { data: getSession, status } = useSession();
  const { setCurrentUser } = useContext(AppContext);
  const sessionObj = getSession?.user;

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
    const initializeUser = async () => {
      console.log('sessionObj:', sessionObj);
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
            recent: [],
          }),
        });
        initializeUser();
        return;
      }
      const user = result[0]._delegate._document.data.value.mapValue.fields;
      setCurrentUser(user);
    };
    initializeUser();
  }, [status]);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <Header />

      <main>
        <Box sx={{ mb: 8 }}>
          <Posts />
        </Box>
      </main>

      <BottomNav />

    </div>
  );
}
