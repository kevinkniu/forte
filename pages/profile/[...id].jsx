import Head from 'next/head';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Box, Button, Grid, Typography, Card, CardContent, CardMedia, Avatar, Stack, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import queryUserData from '../api/users/getUserData';
import queryUserEvents from '../api/events/getUserEvents';

export default function userProfile({ result }) {
  const [userProf, setUserProf] = useState(result);
  const [userEvents, setUserEvents] = useState([]);

  async function getEvents() {
    const data = await queryUserEvents(userProf.result[0].events);
    setUserEvents(data);
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>
      <main>
        {
          console.log(userProf)
        }
        <Box sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', height: 'auto', overflow: 'hidden', overflowY: 'scroll', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item sx={{ border: '1px solid black' }}>
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
                  userProf.result[0].genres.map((genre, index) => (
                    <Chip key={index} label={genre} color="info" />
                  ))
                }
              </Stack>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}> Liked Songs </Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                {
                  userProf.result[0].songs.map((song, index) => (
                    <Card key={index} sx={{ display: 'flex', margin: '5px' }}>
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
              {
                userEvents.map((event, index) => (
                  <Grid key={index}>
                    <Card sx={{ display: 'flex', margin: '5px' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 100 }}
                        image={event.photos[0] || '/userholder.png'}
                        alt="album cover"
                      />
                      <CardContent>
                        <Typography component="div" variant="h6">
                          {event.eventName}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {event.details}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {event.location}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Box>
      </main>
      <BottomNav />
    </div>
  );
}

export async function getServerSideProps(context) {
  const result = await queryUserData(context.query.id[0]);
  return { props: { result: { result } } };
}
