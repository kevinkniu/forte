import Link from 'next/link';
import Head from 'next/head';
import { useRef, useEffect, useState, useContext } from 'react';
import { getSession, useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Grid, Typography, Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BottomNav from './components/BottomNav';
import getToken from './api/spotify/getToken';
import getGenres from './api/spotify/getGenres';
import getPlaylists from './api/spotify/getPlaylists';
// import getTracks from '../api/spotify/getPlaylists';
import { AppContext } from './_app';

export default function Music({ tokenProp, genresProp, playlistsProp }) {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();
  const [tokenID, setTokenID] = useState(tokenProp);
  const [genres, setGenres] = useState(genresProp);
  const [playlists, setPlaylists] = useState(playlistsProp);
  const [tracks, setTracks] = useState([]);
  const [track, setTrack] = useState([]);
  const { currentPlaylist, setCurrentPlaylist } = useContext(AppContext);

  const updatePlaylist = (item) => {
    console.log(item);
    setCurrentPlaylist(item);
  };

  const onSearch = (e) => {
    e.preventDefault();
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Link href="/search">
            <Grid sx={{ display: 'flex' }}>
              <SearchIcon sx={{ alignSelf: 'flex-end', mr: 1 }} />
              <TextField
                type="search"
                label="Songs"
                variant="standard"
                inputRef={searchRef}
              />
              <button hidden type="submit" onClick={(e) => { onSearch(e); }}>Submit</button>
            </Grid>
          </Link>
          <Box sx={{ alignContent: 'center', justifyContent: 'center', width: 350, px: 1 }}>
            {genres.map((genre) => (
              <Box key={genre.id}>
                <Typography variant="body2" sx={{ display: 'inline-block', fontSize: '20px' }}>{genre?.name}</Typography>
                <Slider {...settings}>
                  {playlists.length && playlists.map((item) => (
                    <Box sx={{ alignItems: 'center', justify: 'center' }}>
                      <img src={item.images[0].url} alt="N/A" style={{ width: '100px' }} />
                      <Typography variant="body2" component="div" sx={{ fontSize: '12px' }}>{item.name}</Typography>
                    </Box>
                  ))}
                </Slider>
              </Box>
            ))}
          </Box>
        </Box>
      </main>

      <BottomNav />

    </div>
  );
}

export async function getServerSideProps() {
  const tokenProp = await getToken();
  const genresProp = await getGenres(tokenProp);
  const playlistsProp = await getPlaylists(tokenProp, genresProp.id);
  return { props: { tokenProp, genresProp, playlistsProp } };
}
