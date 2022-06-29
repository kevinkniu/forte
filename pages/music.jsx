import Link from 'next/link';
import Head from 'next/head';
import { useRef, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
  const { data: getSession } = useSession();
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
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  // useEffect(() => {
  //   setGenres(genresProp);
  //   setPlaylists(playlistsProp);
  // }, []);

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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 8 }}>
          <Link href="/search">
            <Box sx={{ ml: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 5 }}>
              Search for songs
            </Box>
          </Link>
          <Box sx={{ alignContent: 'center', justifyContent: 'center', width: { xs: 350, sm: 500, md: 700 }, px: 1 }}>
            {genres.map((genre) => (
              <Box key={genre.id} sx={{ alignContent: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ display: 'inline-block', fontSize: '20px' }}>{genre.name}</Typography>
                <Slider {...settings}>
                  {playlists.length && playlists.map((item) => (
                    <Grid container spacing={0} direction="column" alignContent="center" justifyContent="center" textAlign="center">
                      <Card elevation={0} onClick={() => updatePlaylist(item)}>
                        <Link href={`/album/${item.id}`}>
                          <img src={item.images[0].url} alt="N/A" style={{ width: '100px', margin: 'auto' }} />
                        </Link>
                        <Typography variant="body2" component="div" sx={{ fontSize: 12 }}>{item.name}</Typography>
                      </Card>
                    </Grid>
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
  const allGenres = await getGenres(tokenProp);
  const genresProp = allGenres.slice(0, 5);
  // const playlistsProp = [];
  // genresProp.forEach((genre) => {
  //   const tempPlaylist = getPlaylists(tokenProp, genre.id);
  //   playlistsProp.push(tempPlaylist);
  // });
  const playlistsProp = await getPlaylists(tokenProp, genresProp[0].id);
  return { props: { tokenProp, genresProp, playlistsProp } };
}
