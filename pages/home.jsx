import Head from 'next/head';
import { useEffect, useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { AppBar, Box, Toolbar, Typography, Grid } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';
import Posts from './components/Posts';
import Events from './components/Events';
import Explore from './components/Explore';

export default function Home() {
  const { data: getSession, status } = useSession();
  const { setCurrentUser } = useContext(AppContext);
  const [view, setView] = useState('Events');
  const sessionObj = getSession?.user;

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
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
            profPic: sessionObj?.image || '/userholder.png',
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

      <Box>
        <AppBar position="static" sx={{ bgcolor: '#673ab7' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1, borderBottom: view === 'Explore' ? 1 : 0 }} onClick={() => { setView('Explore'); }}>
              Explore
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1, borderBottom: view === 'Posts' ? 1 : 0 }} onClick={() => { setView('Posts'); }}>
              Forum
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, px: 1, borderBottom: view === 'Events' ? 1 : 0 }} onClick={() => { setView('Events'); }}>
              Events
            </Typography>
            <Grid container justifyContent="flex-end">
              <ChatIcon color="inherit" sx={{ mx: 1 }} />
              <NotificationsIcon color="inherit" sx={{ mx: 1 }} />
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>

      <main>
        <Box sx={{ mb: 8 }}>
          {view === 'Explore' && (
            <Explore />
          )}
          {view === 'Posts' && (
            <Posts />
          )}
          {view === 'Events' && (
            <Events />
          )}

        </Box>
      </main>

      <BottomNav />

    </div>
  );
}
