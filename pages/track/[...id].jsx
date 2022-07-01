import analyze from 'rgbaster';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SpotifyPlayer from 'react-spotify-web-playback';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
import getToken from '../api/spotify/getToken';
import getTrack from '../api/spotify/getTrack';

import BottomNav from '../components/BottomNav';
import updateUserSong from '../api/users/addUserSongs';
import trackStyles from '../../styles/Track.module.css';

const data = [
  {
    name: 'Esmy Xu',
    date: '2022-06-28',
    body: 'I come back to this song every once and a while bc it seems like the world had a different light!',
    upvotes: 6,
    url: 'https://i.scdn.co/image/ab6775700000ee85a892735df8a1324f906d7a34',
  },
  {
    name: 'John Ong',
    date: '2022-06-28',
    body: "What I love about is that it feels familiar. Like a voice I would hear in my home town. It's not the greatest voice I've ever heard, it's not glamorous or larger than life, but it feels like me and my best friend riding bikes on a Summer evening, joking about skipping town and seeing the world. Somehow that means more than what singing legends can offer me.",
    upvotes: 5,
    url: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=667637673271813&height=300&width=300&ext=1658933944&hash=AeT60TalF_3HYAf3xfs',
  },
  {
    name: 'Andy Luu',
    date: '2022-06-28',
    body: 'Break my soul!',
    upvotes: 3,
    url: 'https://scontent-iad3-2.xx.fbcdn.net/v/t1.6435-1/42317090_2330550456971517_4823046255326265344_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=gVijmNqD3EAAX_PjdO3&_nc_ht=scontent-iad3-2.xx&edm=AP4hL3IEAAAA&oh=00_AT_1hIgPeZdgCm3qcZNMsVjDnEpfyiI_HyuygUMMDrnZOA&oe=62E00E27',
  },
];

export default function Track({ trackProp }) {
  const router = useRouter();
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;

  const [isFavorite, setFavorite] = useState(false);
  const [cardColor, setCardColor] = useState('');

  async function getBgColor() {
    const result = await analyze(trackProp.album.images[1].url);
    const priColor = result[0].color;
    const bgColor = priColor.slice(0, 3) + 'a(' + priColor.slice(4, priColor.length - 1) + ',0.8)';
    setCardColor(priColor.slice(0, 3) + 'a(' + priColor.slice(4, priColor.length - 1) + ',0.8)');
    document.querySelector('#bg').style.backgroundColor = bgColor;
  }

  async function addSong(song) {
    await updateUserSong(sessionObj.id, song);
  }

  function handleFavorite() {
    setFavorite(true);
    addSong(trackProp);
  }

  useEffect(() => {
    getBgColor();
  });

  return (
    <div id="bg">
      <header className={trackStyles.header}>
        <ArrowBackIosNewIcon
          className={trackStyles.icon}
          onClick={() => router.back()}
        />
        <Typography
          variant="h6"
          component="h1"
          noWrap
        >
          {trackProp.name}
        </Typography>
        {isFavorite ? <FavoriteIcon className={trackStyles.icon} /> : (
          <FavoriteBorderIcon
            onClick={handleFavorite}
            className={trackStyles.icon}
          />
        )}

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
        <Typography
          className={trackStyles.trackInfo}
          noWrap
        >
          {trackProp.album.name} / {trackProp.album.release_date}
        </Typography>

        <Grid sx={{ margin: '40px' }}>
          <SpotifyPlayer
            token={sessionObj?.tokenID}
            uris={[trackProp.uri]}
            autoPlay={true}
            persistDeviceSelection={true}
            initialVolume={0}
            styles={{
              display: 'flex',
              activeColor: '#333',
              bgColor: '#fff',
              color: '#121435',
              loaderColor: '#333',
              sliderColor: '#5D43BF',
              sliderHandleColor: '#00A57A',
              trackArtistColor: '#8996A6',
              trackNameColor: 'black',
              sliderHandleBorderRadius: 5,
            }}
          />
        </Grid>

        <div
          className={trackStyles.comments}
          style={{ backgroundColor: cardColor, opacity: '0.8' }}
        >
          <div className={trackStyles.commentsHeader}>
            <p>Comments ({data.length})</p>
            <span>Add comment</span>
          </div>

          <div className={trackStyles.commentList}>
            <ul>
              {data.map((one, index) => (
                <li key={index}>
                  <div className={trackStyles.commentAvatar}>
                    <img src={one.url} alt="" />
                  </div>

                  <div className={trackStyles.commentContent}>
                    <div className={trackStyles.commentInfo}>
                      <p className={trackStyles.commentName}>{one.name}</p>
                      <p className={trackStyles.commentDate}>{one.date}</p>
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

      <BottomNav />
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
