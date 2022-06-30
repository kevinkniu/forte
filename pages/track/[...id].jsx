import React from 'react';
import { useRouter } from 'next/router';
import SpotifyPlayer from 'react-spotify-web-playback';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
import getToken from '../api/spotify/getToken';
import getTrack from '../api/spotify/getTrack';
import trackStyles from '../../styles/Track.module.css';

const data = [
  {
    name: 'Spencer Han',
    date: '06-28-2022',
    body: 'Good!',
    upvotes: 6,
    url: '',
  },
  {
    name: 'John Ong',
    date: '06-28-2022',
    body: 'Break my soul!',
    upvotes: 5,
    url: '',
  },
  {
    name: 'John Ong',
    date: '06-28-2022',
    body: 'Break my soul!',
    upvotes: 5,
    url: '',
  }
];

export default function Track({ tokenProp, trackProp }) {
  const { data: getSession } = useSession();
  const router = useRouter();
  const sessionObj = getSession?.user;

  return (
    <div>
      <header className={trackStyles.header}>
        <ArrowBackIosNewIcon
          className={trackStyles.icon}
          onClick={() => router.back()}
        />
        <Typography
          variant="h6"
          component="h1"
        >
          {trackProp.name}
        </Typography>
        <FavoriteBorderIcon
          className={trackStyles.icon}
        />
      </header>

      <main>
        <figure>
          <img
            className={trackStyles.albumCover}
            src={trackProp.album.images[1].url}
            alt="album-cover"
          />
        </figure>

        <Typography
          className={trackStyles.artist}
        >
          {trackProp.artists[0].name}
        </Typography>

        <Paper elevation={2} className={trackStyles.info}>
          <div>
            <span>Popularity</span>
            <span>{trackProp.popularity}</span>
          </div>
          <div>
            <span>Likes</span>
            <span>99999+</span>
          </div>
          <div>
            <span>Comments</span>
            <span>35987</span>
          </div>
        </Paper>

        <Grid sx={{ margin: '16px' }}>
          <SpotifyPlayer
            token={sessionObj?.tokenID}
            uris={[trackProp.uri]}
            autoPlay={true}
            styles={{
              display: 'flex',
              activeColor: '#333',
              bgColor: '#fff',
              color: '#333',
              loaderColor: '#333',
              sliderColor: '#8264F1',
              trackArtistColor: '#8996A6',
              trackNameColor: 'black',
              sliderHandleBorderRadius: 5,
            }}
          />
        </Grid>

        <div className={trackStyles.comments}>
          <div className={trackStyles.commentsHeader}>
            <p>Comments (35987)</p>
            <span>Add comment</span>
          </div>

          <div className={trackStyles.commentList}>
            <ul>
              {data.map(one => (
                <li>
                  <div className={trackStyles.commentAvatar}>
                    {<img src='/userholder.png' />}
                  </div>
                  <div className={trackStyles.commentContent}>
                    <div className={trackStyles.commentTitle}>
                      <div className={trackStyles.commentInfo}>
                        <p>{one.name}</p>
                        <p>{one.date}</p>
                      </div>
                      {/* <p>Upvotes: {one.upvotes}</p> */}
                    </div>
                    <div className={trackStyles.commentBody}>
                      <p>{one.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </main>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const tokenProp = await getToken();
  const trackProp = await getTrack(tokenProp, query.id);

  return {
    props: { tokenProp, trackProp },
  };
}
