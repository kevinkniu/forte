import Head from 'next/head';
import { Button, Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import queryUserData from '../api/users/getUserData';
import queryUserEvents from '../api/events/getUserEvents';

export default function userProfile({ result }) {
  const [userProf, setUserProf] = useState(result);
  const [userEvents, setUserEvents] = useState([]);

  const colors = ['#5F3DC4', '#66A80F', '#D6336C', '#37b24d', '#FCC419', '#E8590C', '#3B5BDB', '#f03e3e', '#9c36b5', '#0ca678'];

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

      <Grid container sx={{ backgroundColor: '#673ab7' }}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" paddingTop="5px" paddingBottom="5px">
          <Avatar
            src={`${userProf.result[0].profPic}`}
            alt="Profile picture"
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Typography variant="h5" sx={{ margin: '5px' }}>
          {userProf.result[0].name}
        </Typography>
      </Grid>
      <Container sx={{ marginBottom: '58px' }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} textAlign="center">
              <Button> Add Friend </Button>
              <Button> Message </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ margin: '5px', float: 'left' }}>
                Genres
              </Typography>
              <Grid sx={{ clear: 'both' }} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start" flexWrap="wrap" flexDirection="row">
              {
                userProf.result[0].genres.map((genre, index) => (
                  <Chip key={index} label={genre} color="info" sx={{ marginBottom: '10px', marginRight: '10px', backgroundColor: colors[index], color: 'white' }} />
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h5" sx={{ margin: '5px' }}>
              Liked Songs
            </Typography>
            {
              userProf.result[0].songs.length === 0
                ? (
                  <Card>
                    <CardContent>
                      <Typography component="div" variant="h6">
                        NO SONGS
                      </Typography>
                    </CardContent>
                  </Card>
                )
                : (
                  userProf.result[0].songs.map((song, index) => (
                    <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                      <Grid position="relative">
                        <CardMedia
                          component="img"
                          sx={{ width: 100 }}
                          image={song.album.images[0].url}
                          alt="album cover"
                        />
                      </Grid>

                      <CardContent>
                        <Typography component="div" variant="h6">
                          {song.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {song.artists[0].name}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )
            }
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h5" sx={{ margin: '5px' }}>
              Events
            </Typography>
            {
              userEvents.length === 0
                ? (
                  <Card>
                    <CardContent>
                      <Typography component="div" variant="h6">
                        NO EVENTS
                      </Typography>
                    </CardContent>
                  </Card>
                )
                : (
                  userEvents.map((event, index) => (
                    <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                      <Grid position="relative">
                        <CardMedia
                          component="img"
                          sx={{ width: 100, height: 100 }}
                          image={event[1].photos[0] || '/userholder.png'}
                          alt="album cover"
                        />
                      </Grid>

                      <CardContent sx={{ padding: '0 0 0 16px' }}>
                        <Typography component="div" variant="h6">
                          {event[1].eventName}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {event[1].details}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                          {event[1].location}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )
            }
          </Grid>
        </Grid>
      </Container>
      <BottomNav />
    </div>
  );
}

export async function getServerSideProps(context) {
  const result = await queryUserData(context.query.id[0]);
  return { props: { result: { result } } };
}
