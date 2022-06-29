import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Stack, Button, Dialog, TextField, Container, ListItem, List, ListItemText, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';
import getToken from './api/spotify/getToken';
import getAllGenres from './api/spotify/getAllGenres';
import updateUserGenre from './api/users/updateUserGenre';
import deleteUserGenre from './api/users/deleteUserGenre';
import queryUserEvents from './api/events/getUserEvents';
import deleteUserEvent from './api/users/deleteUserEvent';
import deleteUserSong from './api/users/deleteUserSongs';
import queryUserSongs from './api/users/getUserSongs';

const friendData = [
  {
    id: '22paoydtvhtdv6w2xfoziovby',
    name: 'Esmy Xu',
    profPic: 'https://i.scdn.co/image/ab6775700000ee85a892735df8a1324f906d7a34',
  },
  {
    id: 'o001k7jmdq3wdg3hklndxjotq',
    name: 'Andy Luu',
    profPic: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-1/42317090_2330550456971517_4823046255326265344_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=MzkhNOjHUVQAX8vbFA8&_nc_ht=scontent-iad3-1.xx&edm=AP4hL3IEAAAA&oh=00_AT80ipfo_KZcpuRhnSFtIp41iYU5z16alzCAH3hFXDjKwg&oe=62DC19A7',
  },
  {
    id: 'resowner92',
    name: 'Neil Johnson',
    profPic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1485456691670202&height=300&width=300&ext=1658766891&hash=AeSq3Duc6nWchK4KAUg',
  },
  {
    id: '1214925054',
    name: 'Kevin Niu',
    profPic: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.18169-1/29357003_2001555779858728_3528641109814991101_n.jpg?stp=dst-jpg_p320x320&_nc_cat=106&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=Jp_hv-I_99IAX9Sc9ww&_nc_ht=scontent-iad3-1.xx&edm=AP4hL3IEAAAA&oh=00_AT-Y41NB8YToUz-F39q4ozlEYsAzKablTHK8ZFn1haRBZw&oe=62DE1D20',
  },
  {
    id: '31eo5ua2tpijr6lg56pqfnxdew5e',
    name: 'Spencer Han',
    profPic: '/favicon.ico',
  },
  {
    id: '226ssnz7grqphzhajvn2xfqxa',
    name: 'John Ong',
    profPic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=667637673271813&height=300&width=300&ext=1658762672&hash=AeSUiPcuzqISiuQf6Sc',
  },
];

export default function mainProfile({ genreProp }) {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [genres, setGenres] = useState(genreProp.genres);
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [songList, setSongList] = useState([]);

  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;

  async function getEvents() {
    const tempEvents = [];
    currentUser.events.arrayValue.values.map((event) => (
      tempEvents.push(event.stringValue)
    ));
    const data = await queryUserEvents(tempEvents);
    setEvents(data);
  }

  async function reRenderUser() {
    const response = await fetch(`/api/users/${sessionObj.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    const user = result[0]._delegate._document.data.value.mapValue.fields;
    setCurrentUser(user);
  }

  async function initialGenres() {
    const arr = [];
    currentUser.genres.arrayValue.values.map((item) => (
      arr.push(item.stringValue)
    ));
    const res = genres.filter((item) => !arr.includes(item));
    await setGenres(res);
  }

  async function handleDelete(genre) {
    await deleteUserGenre(sessionObj.id, genre);
    await reRenderUser();
    await initialGenres();
  }

  async function addGenre(genre) {
    await updateUserGenre(sessionObj.id, genre);
    setOpen(false);
    await reRenderUser();
    await initialGenres();
  }

  function handleOpen() {
    initialGenres();
    setOpen(true);
  }

  function handleClose() {
    initialGenres();
    setOpen(false);
  }

  async function onDelete(id, event) {
    await deleteUserEvent(id, event);
    const eventIndex = events.findIndex((eventData) => {
      const index = eventData.findIndex((singleEvent) => (
        singleEvent === event[0]
      ));
      if (index >= 0) {
        return true;
      }
      return false;
    });
    events.splice(eventIndex, 1);
    const newEventList = [...events];
    setEvents(newEventList);
  }

  async function deleteSong(song) {
    await deleteUserSong(sessionObj.id, song);
    const songIndex = songList.findIndex((songData) => songData.id === song.id);
    songList.splice(songIndex, 1);
    const newList = [...songList];
    setSongList(newList);
  }

  async function getSongs() {
    const userSongs = await queryUserSongs(sessionObj.id);
    setSongList(userSongs[0]);
  }

  useEffect(() => {
    getSongs();
  }, []);

  useEffect(() => {
    getEvents();
  }, [currentUser]);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>
      <Container sx={{ marginBottom: '58px' }}>
        <Grid container>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Avatar
              src={`${sessionObj.image}`}
              alt="Profile picture"
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h5" sx={{ margin: '5px' }}>
            {sessionObj.name}
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ margin: '5px', float: 'left' }}>
                Genres
              </Typography>
              <Button onClick={() => handleOpen()} sx={{ float: 'right' }}>+</Button>
              <Grid sx={{ clear: 'both' }} />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="flex-start" flexWrap="wrap" flexDirection="row">
              {
                currentUser.genres.arrayValue.values.map((genre, index) => (
                  <Chip key={index} label={genre.stringValue} color="info" onDelete={() => handleDelete(genre)} sx={{ marginBottom: '10px', marginRight: '10px' }} />
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h5" sx={{ margin: '5px' }}>
              Liked Songs
            </Typography>
            {
              songList.length === 0
                ? (
                  <Link href="/music">
                    <Card>
                      <CardContent>
                        <Typography component="div" variant="h6">
                          ADD SONGS
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                )
                : (
                  songList.map((song, index) => (
                    <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                      <Grid position="relative">
                        <Button onClick={() => deleteSong(song)} sx={{ position: 'absolute', top: '0', left: '-20px', padding: '0', margin: '0' }}>&times;</Button>
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
              events.length === 0
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
                  events.map((event, index) => (
                    <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                      <Grid position="relative">
                        <Button onClick={() => onDelete(sessionObj.id, event)} sx={{ position: 'absolute', top: '0', left: '-20px', padding: '0', margin: '0' }}>&times;</Button>
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
        <Dialog
          onClose={() => handleClose()}
          open={open}
          PaperProps={{
            style: {
              height: '500px',
              width: '300px',
            },
          }}
        >
          <TextField label="search genre" variant="filled" onChange={(e) => setSearch(e.target.value)} />
          <List>
            {
              genres.filter(((genre) => genre.includes(search))).map((filterGenre, index) => (
                <ListItem
                  key={index}
                  secondaryAction={(
                    <IconButton edge="end" aria-label="add" onClick={() => addGenre(filterGenre)}>
                      <AddIcon />
                    </IconButton>
                  )}>
                  <ListItemText>
                    <Typography>{filterGenre}</Typography>
                  </ListItemText>
                </ListItem>
              ))
            }
          </List>
        </Dialog>
      </Container>
      <BottomNav />
    </div>
  );
}

export async function getServerSideProps() {
  const tokenProp = await getToken();
  const genreProp = await getAllGenres(tokenProp);
  return { props: { genreProp } };
}
