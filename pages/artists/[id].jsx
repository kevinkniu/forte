import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import TrackList from '../components/TrackList';
import getToken from '../api/spotify/getToken';
import getArtist from '../api/spotify/getArtist';
import getTopTracks from '../api/spotify/getTopTracks';
import artistStyles from '../../styles/Artist.module.css';

export default function Artist({ artistProp, topTracksProp }) {
  const router = useRouter();
  const colors = ['#5F3DC4', '#66A80F', '#D6336C', '#37b24d', '#FCC419', '#E8590C', '#3B5BDB', '#f03e3e', '#9c36b5', '#0ca678'];

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>forte</title>
      </Head>

      <header className={artistStyles.header}>
        <ArrowBackIosNewIcon
          onClick={() => router.back()}
          className={artistStyles.backIcon}
        />
        <figure className={artistStyles.artistImgContainer}>
          <img
            src={artistProp.images[0].url}
            alt={artistProp.name}
          />
        </figure>
        <Typography
          variant="h4"
          component="h1"
        >
          {artistProp.name}
        </Typography>
      </header>

      <main className={artistStyles.main}>
        <Stack
          className={artistStyles.genres}
        >
          {artistProp.genres.map((genre, index) => (
            <Chip
              label={genre}
              component="span"
              sx={{ backgroundColor: colors[index] }}
            />
          ))}
        </Stack>

        <Box className={artistStyles.topTracks}>
          <Typography
            variant="h6"
            component="h3"
          >
            Top Tracks
          </Typography>
          <TrackList tracks={topTracksProp} />
        </Box>
      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const tokenProp = await getToken();
  const artistProp = await getArtist(tokenProp, query.id);
  const topTracksProp = await getTopTracks(tokenProp, query.id);

  return {
    props: { artistProp, topTracksProp },
  };
}
