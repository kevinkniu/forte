import Head from 'next/head';
import { Button, Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Container, List, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import queryUserData from '../api/users/getUserData';
import queryUserEvents from '../api/events/getUserEvents';
import trackListStyles from '../../styles/TrackList.module.css';

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

      {/* <Grid container sx={{ backgroundColor: '#673ab7' }}>
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
 */}

      <Container sx={{ marginBottom: '58px', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '0' }}>
        <Grid container sx={{ backgroundColor: '#673ab7' }}>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" paddingTop="5px" paddingBottom="5px">
            <Avatar
              src={userProf.result[0].profPic || '/userholder.png'}
              alt="Profile picture"
              sx={{ width: 160, height: 160 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', padding: '8px 0 0 0', margin: '0' }}>
          <Typography variant="h4">
            {userProf.result[0].name}
          </Typography>
        </Grid>






        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} textAlign="center">
              <Button> Add Friend </Button>
              <Button> Message </Button>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', padding: '0 10px 10px 10px' }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                Genres
              </Typography>
              <Grid sx={{ clear: 'both' }} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="space-around" flexWrap="wrap" flexDirection="row" padding="0 5px 5px 10px">
              {
                userProf.result[0].genres.map((genre, index) => (
                  <Chip key={index} label={genre} color="info" sx={{ marginBottom: '10px', marginRight: '10px', backgroundColor: colors[index], color: 'white' }} />
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="subtitle1" sx={{ margin: '5px' }}>
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

                  <List position="relative">
                    {
                      userProf.result[0].songs.map((song, index) => (
                        <ListItem className={trackListStyles.trackListEntry} key={index}>
                          <img
                            src={song.album.images[0].url}
                            alt="album-cover"
                          />
                          <div className={trackListStyles.trackListEntryInfo}>
                            <Typography noWrap sx={{ width: '230px' }}>{song.name}</Typography>
                            <Typography component="span">{song.artists[0].name}</Typography>
                          </div>
                        </ListItem>
                      ))
                    }
                  </List>
                )
            }
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="subtitle1" sx={{ margin: '5px' }}>
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
                  <List position="relative">
                    {
                      userEvents.map((event, index) => (
                        <ListItem
                          button
                          className={trackListStyles.trackListEntry}
                          key={index}
                        >
                          <img
                            src={event[1].photos[0] || '/userholder.png'}
                            alt="event"
                          />
                          <div className={trackListStyles.trackListEntryInfo}>
                            <Typography noWrap>{event[1].eventName}</Typography>
                            <Typography component="span" sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '230px' }}>{event[1].details}</Typography>
                          </div>
                        </ListItem>
                      ))
                    }
                  </List>
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
