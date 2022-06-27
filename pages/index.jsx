import Head from 'next/head';
import { useSession, signIn } from 'next-auth/react';
import Router from 'next/router';
import { Grid, Box } from '@mui/material';

export default function Login() {
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
            <h1>Welcome to forte.</h1>
            <Box mt={2}>
              <button type="submit" onClick={() => { signIn(); }}>
                Sign In
              </button>
            </Box>
          </Grid>
        </main>
      </div>
    );
  }
}
