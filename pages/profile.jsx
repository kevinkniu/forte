import Head from 'next/head';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Stack } from '@mui/material';
import { useContext } from 'react';
import Router from 'next/router';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';

export default function mainProfile() {
  const { currentUser } = useContext(AppContext);

  console.log(currentUser);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is the main profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>

        <Box mb={2} sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', height: '700px', overflow: 'hidden', overflowY: 'scroll' }}>
          <Grid item sx={{ border: '1px solid black' }} spacing={1}>
            <Grid item sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                src={`${currentUser?.profPic.stringValue}`}
                alt="Profile picture"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ margin: '5px' }}>
                {currentUser?.name.stringValue}
              </Typography>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                Genres
              </Typography>
              <Stack direction="row" spacing={1} sx={{ margin: '5px' }}>
                <Chip label="EDM" color="info" />
                <Chip label="POP" color="info" />
              </Stack>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                Friends
              </Typography>
              <Grid container xs={12} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={1}>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">Esmy Xu</Typography>
                </Grid>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">John Ong</Typography>
                </Grid>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">Kevin Niu</Typography>
                </Grid>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">Neill Johnson</Typography>
                </Grid>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">Spencer Han</Typography>
                </Grid>
                <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80 }}
                    image="/userholder.png"
                    alt="friend profile picture"
                  />
                  <Typography variant="body2">Hansol Ji</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}> Liked Songs </Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                <Card sx={{ display: 'flex', margin: '5px' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image="/cover.png"
                    alt="album cover"
                  />
                  <CardContent>
                    <Typography component="div" variant="h6">
                      HUMBLE
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      Kendrick Lamar
                    </Typography>
                  </CardContent>
                </Card>
                <Card sx={{ display: 'flex', margin: '5px' }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image="/cover.png"
                    alt="album cover"
                  />
                  <CardContent>
                    <Typography component="div" variant="h6">
                      HUMBLE
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                      Kendrick Lamar
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                Events
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </main>
      <BottomNav />
    </div>
  );
}

