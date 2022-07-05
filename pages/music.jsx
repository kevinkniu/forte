import Link from 'next/link';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Card } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BottomNav from '../components/BottomNav';
import getToken from './api/spotify/getToken';
import getPlaylists from './api/spotify/getPlaylists';
import getNewReleases from './api/spotify/getNewReleases';
import { AppContext } from './_app';

export default function Music({ releasesProp, playlistsProp }) {
  const { setCurrentPlaylist, setCurrentRelease, setValue } = useContext(AppContext);

  const updatePlaylist = (item) => {
    setCurrentPlaylist(item);
  };

  const updateRelease = (item) => {
    setCurrentRelease(item);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    setValue(2);
  }, []);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          Find your jam.
        </h1>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 8 }}>
          <Link href="/search">
            <Box sx={{ ml: 1, p: 1.5, bgcolor: '#f5f5f5', borderRadius: 5 }}>
              Search for songs
            </Box>
          </Link>
          <h1>New Releases</h1>
          <Box sx={{ alignContent: 'center', justifyContent: 'center', width: { xs: 350, sm: 500, md: 700 }, px: 1, mb: 5 }}>
            <Slider {...settings}>
              {releasesProp.length && releasesProp.map((item, number) => (
                <Grid key={number} container spacing={0} direction="column" alignContent="center" justifyContent="center" textAlign="center">
                  <Card elevation={0} onClick={() => updateRelease(item)}>
                    <Link href={`/release/${item.id}`}>
                      <img src={item.images[0].url} alt="N/A" style={{ width: '150px', margin: 'auto' }} />
                    </Link>
                    <Typography variant="body2" component="div" sx={{ fontSize: 12 }}>{item.name}</Typography>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Box>
          <h1>Top Playlists</h1>
          <Box sx={{ alignContent: 'center', justifyContent: 'center', width: { xs: 350, sm: 500, md: 700 }, px: 1 }}>
            <Slider {...settings}>
              {playlistsProp.length && playlistsProp.map((item, number) => (
                <Grid key={number} container spacing={0} direction="column" alignContent="center" justifyContent="center" textAlign="center">
                  <Card elevation={0} onClick={() => updatePlaylist(item)}>
                    <Link href={`/album/${item.id}`}>
                      <img src={item.images[0].url} alt="N/A" style={{ width: '150px', margin: 'auto' }} />
                    </Link>
                    <Typography variant="body2" component="div" sx={{ fontSize: 12 }}>{item.name}</Typography>
                  </Card>
                </Grid>
              ))}
            </Slider>
          </Box>
        </Box>
      </main>

      <BottomNav />

    </div>
  );
}

export async function getServerSideProps() {
  const tokenProp = await getToken();
  const releasesProp = await getNewReleases(tokenProp);
  const playlistsProp = await getPlaylists(tokenProp);
  return { props: { tokenProp, releasesProp, playlistsProp } };
}
