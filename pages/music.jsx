import Head from 'next/head';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BottomNav from './components/BottomNav';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config';

export default function Music() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();

  const [tokenId, setTokenId] = useState('');
  const [genres, setGenres] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  // const [tracks, setTracks] = useState([]);
  // const [track, setTrack] = useState([]);

  const clientId = SPOTIFY_CLIENT_ID;
  const clientSecret = SPOTIFY_CLIENT_SECRET;

  const onSearch = (e) => {
    e.preventDefault();
  };

  const getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      },
      body: 'grant_type=client_credentials',
    });

    const data = await result.json();

    setTokenId(data.access_token);
    return data.access_token;
  };

  const getGenres = async (token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      },
    });

    const data = await result.json();

    setGenres(data.categories?.items);
    return data.categories?.items;
  };

  const getPlaylistByGenre = async (token, genreId) => {
    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();

    setPlaylist(data.playlists?.items);
    return data.playlists?.items;
  };

  useEffect(() => {
    getToken();
    getGenres(tokenId);
    getPlaylistByGenre(tokenId, 'toplists');

    // const getTracks = async (token, tracksEndPoint) => {
    //   const limit = 10;

    //   const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    //     method: 'GET',
    //     headers: { 'Authorization' : 'Bearer ' + token}
    //   });

    //   const data = await result.json();

    //   setTracks(data.items);
    //   console.log('tracks', data.items);
    //   return data.items;
    // };
    // getTracks(tokenId, 'https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks');

    // const getTrack = async (token, trackEndPoint) => {
    //   const result = await fetch(`${trackEndPoint}`, {
    //     method: 'GET',
    //     headers: { 'Authorization' : 'Bearer ' + token}
    //   });

    //   const data = await result.json();

    //   setTrack(data);
    //   return data;
    // };
    // getTrack(tokenId, 'https://api.spotify.com/v1/tracks/2KukL7UlQ8TdvpaA7bY3ZJ');
  }, []);

  return (
    <div>
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
          <Grid>
            {genres.map((genre) => (
              <Grid>
                <Typography variant="h4" gutterBottom component="div" sx={{ borderBottom: '1px solid black', display: 'inline-block', fontSize: '10rem' }}>{genre?.name}</Typography>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  {playlist.length && playlist.map((item) => (
                    <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginRight: '2rem' }}>
                      <img src={`${item.images[0].url}`} style={{'width': '40rem'}}/>
                      <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: '5rem' }}>{item.name}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </main>

      <BottomNav />

    </div>
  );
}

// import Head from 'next/head';
// import Image from 'next/image';
// import { useRef, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
// import TextField from '@mui/material/TextField';
// import Box from '@mui/material/Box';
// import SearchIcon from '@mui/icons-material/Search';
// import BottomNav from './components/BottomNav';
// import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config';

// export default function Home() {
//   const { getSession } = useSession();
//   const sessionObj = getSession?.user;
//   const searchRef = useRef();

//   const onSearch = (e) => {
//     e.preventDefault();
//     console.log(searchRef.current.value);
//   };

//   useEffect(() => {
//     const clientId = SPOTIFY_CLIENT_ID;
//     const clientSecret = SPOTIFY_CLIENT_SECRET;
//     const getToken = async () => {
//       const result = await fetch('https://accounts.spotify.com/api/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//           'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
//         },
//         body: 'grant_type=client_credentials',
//       });

//       const data = await result.json();
//       console.log('token:', data.access_token);
//       return data.access_token;
//     };
//     getToken();
//   }, []);

//   return (
//     <div>
//       <Head>
//         <title>forte</title>
//       </Head>

//       <main>
//         <h1 align="center">
//           This is a music page.
//         </h1>
//         <Box
//           component="form"
//           sx={{ display: 'flex', mx: 5 }}
//         >
//           <SearchIcon sx={{ alignSelf: 'flex-end', mr: 1 }} />
//           <TextField
//             fullWidth
//             type="search"
//             label="Songs"
//             variant="standard"
//             inputRef={searchRef}
//           />
//           <button hidden type="submit" onClick={(e) => { onSearch(e); }}>Submit</button>
//         </Box>
//       </main>

//       <BottomNav />

//     </div>
//   );
// }
