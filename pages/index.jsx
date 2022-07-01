import Head from 'next/head';
import { useSession, signIn, getProviders } from 'next-auth/react';
import Router from 'next/router';
import { Grid, Box, Typography } from '@mui/material';

export default function Login({ providers }) {
  const { status } = useSession();

  if (status === 'authenticated') {
    Router.push('/home');
  } else {
    return (
      <div>
        <Head>
          <title>forte</title>
        </Head>

        <main>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundImage: `url(${'/forte.gif'})` }}
          >
            <img src="/forte.png" alt="" />
            <Box mt={2} onClick={() => { signIn(providers.spotify.id, { callbackUrl: '/home' }); }}>
              <Typography
                sx={{ fontWeight: 700, px: 2, py: 1, border: 1, borderRadius: 16 }}
              >
                Sign In with Spotify
              </Typography>
            </Box>
          </Grid>
        </main>
      </div>
    );
  }
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
