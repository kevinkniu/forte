import Head from 'next/head';
import Router from 'next/router';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button, Grid, Typography, Card, CardContent, Avatar, Chip, Container, List, ListItem } from '@mui/material';
import { useState, useEffect } from 'react';
import BottomNav from '../components/BottomNav';
import queryUserData from '../api/users/getUserData';
import queryUserEvents from '../api/events/getUserEvents';
import trackListStyles from '../../styles/TrackList.module.css';
import getRoomId from '../../utils/getRoomId';

export default function userProfile({ result }) {
  const [userProf, setUserProf] = useState(result);
  const [userEvents, setUserEvents] = useState([]);
  const [myInfo, setMyInfo] = useState([]);
  const [userSongs, setUserSongs] = useState([]);

  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [added, setAdded] = useState(false);

  const goToFriendMessage = async (friend) => {
    const roomId = await getRoomId(myInfo, friend);
    Router.push(`/messages/${roomId}`);
  };

  async function getMyInfo() {
    const myResult = await queryUserData(sessionObj.id);
    setMyInfo(myResult[0]);
    const tempSongs = userProf.result[0].songs.reverse();
    setUserSongs(tempSongs.slice(0, 5));
  }

  const sendFriendReq = async () => {
    await fetch('/api/users/sendFriendReq', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: added,
        targetUserID: userProf.result[0].id,
        myUserID: sessionObj.id,
      }),
    });
    setAdded(!added);
  };

  const colors = ['#A32CC4', '#0acc0a', '#710193', '#009150', '#AF69EF', '#32CD32', '#3DB489', '#2E8B57', '#B65FCF', '#BE93D4', 'A45EE5', '9E7BB5', '#A32CC4', '#0acc0a', '#710193', '#009150', '#AF69EF', '#32CD32', '#3DB489', '#2E8B57', '#B65FCF', '#BE93D4', 'A45EE5', '9E7BB5'];

  async function getEvents() {
    const data = await queryUserEvents(userProf.result[0].events);
    setUserEvents(data);
  }

  useEffect(() => {
    getEvents();
    getMyInfo();
  }, []);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>
      <Container sx={{ marginBottom: '58px', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '0' }}>
        <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" marginBottom="-100px" flexDirection="column">
          <img src="/background.jpg" width="412px" height="200px" alt="" />
          <Avatar
            src={userProf.result[0].profPic || '/userholder.png'}
            alt="Profile picture"
            sx={{ width: 160, height: 160, bottom: '100px', border: 'solid 5px white' }}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">
            {userProf.result[0].name}
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} display="flex" alignContent="center" justifyContent="space-around" margin="10px">
              <Button onClick={() => { sendFriendReq(); }} size="small" sx={{ color: added ? 'text.secondary' : '#673ab7', typography: 'body1' }}>{added ? 'Sent Request' : 'Add Friend'}</Button>
              <Button size="small" sx={{ color: '#673ab7', typography: 'body1' }} onClick={() => goToFriendMessage(userProf.result[0])}>Message</Button>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', margin: '35px 15px 0px 10px' }}>
              <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                Genres
              </Typography>
              <Grid sx={{ clear: 'both' }} />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-start" flexWrap="wrap" flexDirection="row" padding="0 5px 5px 10px">
              {
                userProf.result[0].genres.map((genre, index) => (
                  <Chip key={index} label={genre} color="info" sx={{ marginBottom: '10px', marginRight: '10px', backgroundColor: colors[index], color: 'white' }} />
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="subtitle1" sx={{ margin: '20px 15px -10px 10px' }}>
              Recently Liked Songs
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
                      userSongs.map((song, index) => (
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
            <Typography variant="subtitle1" sx={{ margin: '20px 15px -10px 10px' }}>
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
