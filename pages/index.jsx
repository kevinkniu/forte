import Head from 'next/head';
import { useSession, signIn, getProviders } from 'next-auth/react';
import Router from 'next/router';
import { Grid, Box } from '@mui/material';

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
            style={{ minHeight: '100vh' }}
          >
            <img src="/forte.png" alt="" />
            <Box mt={2}>
              <button type="submit" onClick={() => { signIn(providers.spotify.id, { callbackUrl: '/home' }); }}>
                Sign In with Spotify
              </button>
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
