import Head from 'next/head';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia, Avatar, Stack, Chip } from '@mui/material';
import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import queryUserData from '../api/users/getUserData';

const favSongs = [
  {
    id: 1,
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: '/weekndCover.png',
  },
  {
    id: 2,
    name: 'HUMBLE',
    artist: 'Kendrick Lamar',
    cover: '/cover.png',
  },
  {
    id: 3,
    name: 'Feel Something',
    artist: 'Illenium, Excision',
    cover: '/illeniumCover.png',
  },
];

export default function userProfile({ result }) {
  const [userProf, setUserProf] = useState(result);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a users profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>
        <Box
          mb={2}
          sx={{ border: '1px solid black',
            display: 'flex',
            flexDirection: 'column',
            height: '700px',
            overflow: 'hidden',
            overflowY: 'scroll',
          }}
        >
          <Grid item sx={{ border: '1px solid black' }} spacing={1}>
            <Grid item sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                src={`${userProf.result[0].profPic}`}
                alt="Profile picture"
                sx={{ width: 150, height: 150 }}
              />
            </Grid>
            <Grid item sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ margin: '5px' }}>
                {userProf.result[0].name}
              </Typography>
            </Grid>
            <Grid item sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button variant="contained" sx={{ marginRight: '15px' }}> Add Friend </Button>
              <Button variant="contained" sx={{ marginLeft: '15px' }}> Message </Button>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                Genres
              </Typography>
              <Stack direction="row" spacing={1} sx={{ margin: '5px' }}>
                {
                  userProf.result[0].genres.map((genre) => (
                    <Chip label={genre} color="info" />
                  ))
                }
              </Stack>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}> Liked Songs </Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                {
                  favSongs.map((song) => (
                    <Card sx={{ display: 'flex', margin: '5px' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        image={song.cover}
                        alt="album cover"
                      />
                      <CardContent>
                        <Typography component="div" variant="h6">
                          {song.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {song.artist}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                }
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

export async function getServerSideProps(context) {
  const result = await queryUserData(context);
  return { props: { result: { result } } };
}
