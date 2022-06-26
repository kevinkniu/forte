import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import BottomNav from './components/BottomNav';
import InputBox from './components/InputBox';
import { AppContext } from './_app';

export default function Home() {
  const { data: getSession } = useSession();
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const sessionObj = getSession?.user;
  const [drawer, setDrawer] = useState(false);

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
      setCurrentUser(user);
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
          This is the home page.
        </h1>
        <div align="center">
          <div>
            <Box sx={{ display: 'flex', mx: 5, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Avatar src={sessionObj?.image} alt="N/A" />
              <Box
                sx={{ ml: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 5 }}
                onClick={() => { setDrawer(true); }}
              >
                What&#39;s on your mind?
              </Box>
            </Box>
            <Drawer
              anchor="top"
              open={drawer}
              onClose={() => { setDrawer(false); }}
            >
              <div>
                <InputBox />
              </div>
            </Drawer>
          </div>

          Posts Here
        </div>

      </main>

      <BottomNav />

    </div>
  );
}
