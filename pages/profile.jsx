import Head from 'next/head';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Avatar, Chip, Stack, Button, Dialog, TextField } from '@mui/material';
import { useContext, useState } from 'react';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';
import getToken from './api/spotify/getToken';
import getAllGenres from './api/spotify/getAllGenres';
import updateUserGenre from './api/users/updateUserGenre';

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

export default function mainProfile({ genreProp }) {
  const { currentUser } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [genreList, setGenres] = useState(genreProp);

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        {
          console.log(genreList)
        }
        <h1 align="center">
          This is the main profile page.
        </h1>
        <div align="center">
          <button type="submit" onClick={() => { signOut({ redirect: true, callbackUrl: '/' }); }}>Sign Out</button>
        </div>

        <Box sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', height: 'auto', overflow: 'hidden', overflowY: 'scroll', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item sx={{ border: '1px solid black' }}>
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
              <Grid item sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                  Genres
                </Typography>
                <Button onClick={() => handleOpen()}>+</Button>
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
                  <TextField label="search genre" variant="filled" />
                  {
                      genreList.genres.map((genre, index) => (
                        <Grid display="flex">
                          <Grid display="flex" justifyContent="space-between">
                            <Typography key={index}>{genre}</Typography>
                            <Button size="small" onClick={() => updateUserGenre(currentUser, genre)}>+</Button>
                          </Grid>
                        </Grid>
                      ))
                  }
                </Dialog>
              </Grid>
              <Stack direction="row" spacing={1} sx={{ margin: '5px' }}>
                {
                  currentUser.genres.arrayValue.values.map((genre, index) => (
                    <Chip key={index} label={genre.stringValue} color="info" />
                  ))
                }
              </Stack>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Grid item sx={{ display: 'flex' }}>
                <Typography variant="subtitle1" sx={{ margin: '5px' }}>
                  Friends
                </Typography>
              </Grid>
              <Grid container xs={12} sx={{ border: '1px solid black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                  friendData.map((friend) => (
                    <Link key={friend.id} href={`/profile/${friend.id}`}>
                      <Grid item xs={4} sx={{ border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <Grid item sx={{ paddingLeft: '20px' }}>
                          <CardMedia
                            component="img"
                            sx={{ width: 80 }}
                            image={friend.profPic}
                            alt="friend profile picture"
                          />
                          <Typography variant="body2">{friend.name}</Typography>
                        </Grid>
                      </Grid>
                    </Link>
                  ))
                }
              </Grid>
            </Grid>
            <Grid item sx={{ border: '1px solid black' }}>
              <Typography variant="subtitle1" sx={{ margin: '5px' }}> Liked Songs </Typography>
              <Grid item sx={{ border: '1px solid black' }}>
                {
                  favSongs.map((song) => (
                    <Card key={song.id} sx={{ display: 'flex', margin: '5px' }}>
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

export async function getServerSideProps() {
  const tokenProp = await getToken();
  const genreProp = await getAllGenres(tokenProp);
  return { props: { genreProp } };
}