import Head from 'next/head';
import { useRef, useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BottomNav from './components/BottomNav';
import getToken from './api/spotify/getToken';
import getGenres from './api/spotify/getGenres';
import getPlaylists from './api/spotify/getPlaylists';

export default function Music({ tokenProp, genresProp, playlistsProp }) {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();
  const [tokenID, setTokenID] = useState(tokenProp);
  const [genres, setGenres] = useState(genresProp);
  const [playlists, setPlaylists] = useState(playlistsProp);
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState([]);

  const onSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        {
          console.log('token', tokenID, 'genres', genres, 'playlists', playlists)
        }
      </div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a music page.
        </h1>
        <Box
          component="form"
          sx={{ display: 'flex', mx: 5 }}
        >
          <SearchIcon sx={{ alignSelf: 'flex-end', mr: 1 }} />
          <TextField
            fullWidth
            type="search"
            label="Songs"
            variant="standard"
            inputRef={searchRef}
          />
          <button hidden type="submit" onClick={(e) => { onSearch(e); }}>Submit</button>
        </Box>
        <Grid>
          {genres.map((genre, number) => (
            <div key={number}>
              <Typography variant="body2" component="div" sx={{ borderBottom: '1px solid black', display: 'inline-block', fontSize: '10rem' }}>{genre?.name}</Typography>
              <Grid sx={{ display: 'flex', flexDirection: 'row'}}>
                {playlists.length && playlists.map((item) => (
                  <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginRight: '2rem' }}>
                    <img src={item.images[0].url} alt="N/A" style={{'width': '40rem'}}/>
                    <Typography variant="body2" component="div" sx={{ fontSize: '5rem' }}>{item.name}</Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          ))}
        </Grid>
      </main>

      <BottomNav />

    </div>
  );
}

export async function getServerSideProps() {
  const tokenProp = await getToken();
  const genresProp = await getGenres(tokenProp);
  const playlistsProp = await getPlaylists(tokenProp);
  return { props: { tokenProp, genresProp, playlistsProp } };
}

// LEGACY CODE - DO NOT DELETE YET
// const initializeMusic = async () => {
//   // getting token
//   const tokenResult = await fetch('api/spotify/getToken');
//   const tokenData = await tokenResult.json();
//   const token = tokenData.access_token;
//   tempToken = token;
//   setTokenId(tempToken);
//   console.log('state tokenId:', tokenId);
//   console.log('token:', tempToken);
//   // getting genres
//   const genreResult = await fetch('api/spotify/getGenre', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       token,
//     }),
//   });
//   const genreData = await genreResult.json();
//   tempGenre = genreData.categories.items;
//   setGenres(tempGenre);
//   setGenres(tempGenre);
//   console.log('state genres:', genres);
//   console.log('genres:', tempGenre);
//   // get playlist by genre
//   const playlistResult = await fetch('api/spotify/getPlaylists', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify({
//       token,
//       genre: 'toplists',
//     }),
//   });
//   const playlistData = await playlistResult.json();
//   tempPlaylists = playlistData.playlists.items;
//   setPlaylist(tempPlaylists);
//   console.log('state playlist:', playlist);
//   console.log('playlists:', tempPlaylists);
// };

// useEffect(() => {
//   initializeMusic();
//   setTimeout(() => {
//     console.log('then state test:', test);
//     console.log('then state token:', tokenId);
//     console.log('then state genres:', genres);
//     console.log('then state playlists:', playlist);
//   }, 1000);
// }, []);
