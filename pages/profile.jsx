import Head from 'next/head';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Button, Dialog, TextField, Container, ListItem, List, ListItemText, IconButton, CardActionArea, Box, CardActions, Popover } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useEffect, useState } from 'react';
import MapIcon from '@mui/icons-material/Map';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
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
import queryUserData from './api/users/getUserData';

export default function mainProfile({ genreProp }) {
  const { currentUser, setCurrentUser, setValue } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [genres, setGenres] = useState(genreProp.genres);
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [songList, setSongList] = useState([]);
  const [eventModal, setEventModal] = useState({ eventDetail: {}, eventID: '' });
  const [eventPhoto, setEventPhoto] = useState('');
  const [popOverAnchor, setPopOverAnchor] = useState(null);
  const openPop = Boolean(popOverAnchor);
  const [removePopAnchor, setRemovePopAnchor] = useState(null);
  const openRemovePop = Boolean(removePopAnchor);
  const [itemToRemove, setItemToRemove] = useState({ item: null, type: '' });
  const [friendArray, setFriendArray] = useState([]);
  const [searchName, setSearchName] = useState('');

  const colors = ['#5F3DC4', '#66A80F', '#D6336C', '#37b24d', '#FCC419', '#E8590C', '#3B5BDB', '#f03e3e', '#9c36b5', '#0ca678'];

  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;

  const sendEventReq = async (friend, eventIdToSend, isAdded) => {
    await fetch('/api/users/sendEventReq', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: !isAdded,
        userID: sessionObj.id,
        targetUser: friend,
        eventID: eventIdToSend,
      }),
    });
    const friendToFind = friendArray.find((targetFriend) => targetFriend.id === friend.id);
    friendToFind.added = !isAdded;
    const friendIndex = friendArray.findIndex((targetFriend) => targetFriend.id === friend.id);

    if (friendIndex >= 0) {
      friendArray[friendIndex] = friendToFind;
      const newFriendList = [...friendArray];
      setFriendArray([...newFriendList]);
    }
  };

  async function getEvents() {
    const tempEvents = [];
    currentUser?.events.arrayValue.values.map((event) => (
      tempEvents.push(event.stringValue)
    ));
    const data = await queryUserEvents(tempEvents);
    setEvents(data);
  }

  async function reRenderUser() {
    setValue(3);
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

  function handleEventOpen(eventObj) {
    setEventPhoto(eventObj.eventDetail.photos[0]);
    setEventModal(eventObj);
    setEventOpen(true);
  }

  function handleEventClose() {
    setEventOpen(false);
  }

  function handlePopClose() {
    setPopOverAnchor(null);
  }

  function handlePopClick(event) {
    setPopOverAnchor(event.currentTarget);
  }

  function handleRemoveClose() {
    setRemovePopAnchor(null);
  }

  function handleRemoveClick(event, item, type) {
    event.stopPropagation();
    setItemToRemove({ item, type });
    setRemovePopAnchor(event.currentTarget);
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
    setItemToRemove({ item: null, type: '' });
    setRemovePopAnchor(null);
  }

  async function deleteSong(song) {
    await deleteUserSong(sessionObj.id, song);
    const songIndex = songList.findIndex((songData) => songData.id === song.id);
    songList.splice(songIndex, 1);
    const newList = [...songList];
    setSongList(newList);
    setItemToRemove({ item: null, type: '' });
    setRemovePopAnchor(null);
  }

  async function getSongs() {
    const userSongs = await queryUserSongs(sessionObj.id);
    console.log(userSongs[0]);
    const tempArray = userSongs[0].reverse();
    setSongList(tempArray);
  }

  async function getFriendNames() {
    const friendPromises = [];
    const friendresults = [];
    currentUser?.friends.arrayValue.values.forEach((user) => {
      friendPromises.push(queryUserData(user.stringValue));
    });
    await Promise.all(friendPromises)
      .then((result) => {
        result.forEach((friendData) => {
          friendresults.push({
            id: friendData[0].id,
            name: friendData[0].name,
            events: friendData[0].events,
            eventReq: friendData[0].eventRequests,
          });
        });
      });
    setFriendArray([...friendresults]);
  }

  useEffect(() => {
    if (!currentUser) {
      if (status !== 'authenticated') {
        return;
      }
      reRenderUser();
      getFriendNames();
      getSongs();
    } else {
      reRenderUser();
      getFriendNames();
      getSongs();
    }
  }, [status]);

  useEffect(() => {
    getEvents();
  }, [currentUser]);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <Container sx={{ marginBottom: '58px', display: 'flex', flexDirection: 'column', overflow: 'auto', padding: '0' }}>
        <Grid container sx={{ backgroundColor: '#673ab7' }}>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" paddingTop="5px" paddingBottom="5px">
            <Avatar
              src={sessionObj?.image || '/userholder.png'}
              alt="Profile picture"
              sx={{ width: 160, height: 160 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', padding: '8px 0 0 0', margin: '0' }}>
          <Typography variant="h4">
            {sessionObj?.name}
          </Typography>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', padding: '0 10px 10px 10px' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px', display: 'flex', justifyContent: 'flex-start' }}>
                Genres
              </Typography>
              <AddIcon onClick={() => handleOpen()} sx={{ display: 'flex', justifyContent: 'flex-start' }} />
              <Grid sx={{ clear: 'both' }} />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-around" flexWrap="wrap" flexDirection="row" padding="0 5px 5px 10px">
              {currentUser && (
                currentUser.genres.arrayValue.values.map((genre, index) => (
                  <Chip key={index} label={genre.stringValue} onDelete={() => handleDelete(genre)} sx={{ marginBottom: '10px', marginRight: '10px', backgroundColor: colors[index], color: 'white' }} />
                )))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6} sx={{ overflow: 'auto', maxHeight: '760px' }}>
            <Typography variant="subtitle1" sx={{ margin: '5px' }}>
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
                        <CardMedia
                          component="img"
                          sx={{ width: 100 }}
                          image={song.album.images[0].url}
                          alt="album cover"
                        />
                      </Grid>
                      <CardActionArea position="relative">
                        <MoreVertIcon onClick={(e) => handleRemoveClick(e, song, 'song')} sx={{ position: 'absolute', top: '0', right: '0', padding: '0' }} />
                        <CardContent>
                          <Typography component="div" variant="h6">
                            {song.name}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {song.artists[0].name}
                          </Typography>
                        </CardContent>

                      </CardActionArea>
                    </Card>
                  ))
                )
            }
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6} sx={{ overflow: 'auto', maxHeight: '760px' }}>
            <Typography variant="subtitle1" sx={{ margin: '5px' }}>
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
                    <Card key={index} sx={{ display: 'flex', flexDirection: 'row', margin: '5px', pointer: 'cursor' }}>
                      <Grid position="relative">
                        <CardMedia
                          component="img"
                          sx={{ width: 100, height: 100 }}
                          image={event[1].photos[0] || '/userholder.png'}
                          alt="album cover"
                        />
                      </Grid>
                      <CardActionArea onClick={() => handleEventOpen({ eventDetail: event[1], eventID: event[0] })} position="relative">
                        <MoreVertIcon onClick={(e) => handleRemoveClick(e, event, 'event')} sx={{ position: 'absolute', top: '0', right: '0', padding: '0' }} />
                        <CardContent sx={{ padding: '0 0 0 16px' }}>
                          <Typography component="div" variant="h6" sx={{ width: '90%' }}>
                            {event[1].eventName}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '230px' }}>
                            {event[1].details}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div">
                            {event[1].location}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  ))
                )
            }
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <IconButton onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>
            <LogoutIcon fontSize="large" sx={{ color: 'red' }} />
          </IconButton>
        </Grid>

        <Dialog
          onClose={() => handleEventClose()}
          open={eventOpen}
          PaperProps={{
            style: {
              width: '350px',
              alignItems: 'center',
            },
          }}
        >

          <Card sx={{ mx: 3, my: 1, width: 350, margin: '0' }}>
            <CardMedia
              component="img"
              height="200"
              image={eventPhoto || '/userholder.png'}
              alt="N/A"
            />
            <CardContent sx={{ pb: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Avatar
                  src={`${eventModal.eventDetail.profPic}`}
                  alt="Profile picture"
                  sx={{ width: 50, height: 50 }}
                />
                <Typography gutterBottom variant="h6" component="div" sx={{ my: 0 }}>
                  {eventModal.eventDetail.userName}
                </Typography>
                <CardActions>
                  <Button onClick={(e) => handlePopClick(e)}>Invite</Button>
                </CardActions>
              </Box>
              <Typography variant="h4">{eventModal.eventDetail.eventName}</Typography>
              <Grid container>
                <Grid item xs={1}>
                  <Typography variant="span" color="text.secondary"><MapIcon /></Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="subtitles2" color="text.secondary">
                    {eventModal.eventDetail.location}
                  </Typography>
                </Grid>
              </Grid>

              <Typography sx={{ overflowWrap: 'anywhere' }}>{eventModal.eventDetail.details}</Typography>
            </CardContent>
          </Card>
        </Dialog>

        <Popover
          id="removePopover"
          open={openRemovePop}
          anchorEl={removePopAnchor}
          onClose={() => handleRemoveClose()}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <List>
            <ListItem>
              {
                itemToRemove.type === 'song'
                  ? (
                    <ListItemText>
                      <Button color="secondary" onClick={() => deleteSong(itemToRemove.item)}>remove</Button>
                    </ListItemText>
                  )
                  : (
                    <ListItemText>
                      <Button color="secondary" onClick={() => onDelete(sessionObj.id, itemToRemove.item)}>remove</Button>
                    </ListItemText>
                  )
              }
            </ListItem>
          </List>
        </Popover>

        <Popover
          id="friendPopover"
          open={openPop}
          anchorEl={popOverAnchor}
          onClose={() => handlePopClose()}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Grid container sx={{ width: '300px', height: '260px', overflow: 'scroll' }}>
            <Grid item>
              <TextField sx={{ width: '300px' }} onChange={(e) => setSearchName(e.target.value.toLowerCase())}>Search</TextField>
            </Grid>
            <Grid item xs={12}>
              <List>
                {
                  friendArray.filter(((friend) => friend.name.toLowerCase().includes(searchName)
                    && (friend.events.findIndex((eventId) => eventId === eventModal.eventID) === -1
                      && friend.eventReq.findIndex((eventId) => eventId
                        === eventModal.eventID) === -1)
                  ))
                    .map((singleFriend) => (
                      <ListItem key={singleFriend.id}>
                        <Grid container>
                          <Grid item xs={4} paddingTop="7px">
                            <Typography>{singleFriend.name}</Typography>
                          </Grid>
                          <Grid item xs={8} textAlign="right">
                            <Button onClick={() => { sendEventReq(singleFriend, eventModal.eventID, singleFriend.added); }} size="small" sx={{ color: (singleFriend.added) ? 'text.secondary' : '#673ab7', typography: 'body1' }}>{singleFriend.added ? 'Invited' : 'Invite'}</Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    ))
                }
              </List>
            </Grid>
          </Grid>
        </Popover>

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
                  )}
                >
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
