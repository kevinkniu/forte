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
            sx={{ minHeight: '100vh', backgroundImage: `url(${'https://media1.giphy.com/media/Ho2ilhtVp8ymftWOMB/giphy.gif?cid=790b7611364eae3211c8afa5a0cc31f1cb4bb5aaca534d95&rid=giphy.gif&ct=g'})` }}
          >
            <img src="/forte.png" alt="" />
            <Box mt={2} onClick={() => { signIn(providers.spotify.id, { callbackUrl: '/home' }); }}>
              <Typography sx={{ fontWeight: 700 }}>Sign In with Spotify</Typography>
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

//backgroundImage: `url(${'https://i.gifer.com/g32L.gif'})`