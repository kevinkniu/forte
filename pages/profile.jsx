import Head from 'next/head';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Box, Button, Grid, Typography, Card, CardContent } from '@mui/material';
import { useContext } from 'react';
import Router from 'next/router';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';

export default function Profile() {
  const { currentUser } = useContext(AppContext);

  console.log(currentUser);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>

        <Box container sx={{ border: '1px solid black' }}>
          <Grid item xs={12} sx={{ border: '1px solid black' }}>
            <Grid item sx={{ border: '1px solid black' }}>
              <img
                src={`${currentUser?.profPic.stringValue}`}
                alt="Profile"
                width={200}
                height={200}
              />
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography>
                {currentUser?.name.stringValue}
              </Typography>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Button> Add Friend </Button>
              <Button> Message </Button>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography> Genres</Typography>
              <Button> EDM  </Button>
              <Button> KPOP </Button>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography> Recently listened to</Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                <Card sx={{ display: 'flex' }}>
                  <CardContent>
                    <Typography component="div" variant="h6">
                      HUMBLE
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Kendrick Lamar
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </main>
      <BottomNav />
    </div>
  );
}

