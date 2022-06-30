import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import BottomNav from '../components/BottomNav';
import { AppContext } from '../_app';
import getReleaseTracks from '../api/spotify/getReleaseTracks';
// import getTrack from '../api/spotify/getTrack';
import getToken from '../api/spotify/getToken';

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

export default function releaseTracks() {
  const { currentRelease } = useContext(AppContext);
  const [allTracks, setAllTracks] = useState(currentRelease);
  const [releaseImage] = useState(currentRelease.images[0].url);

  console.log(currentRelease);

  async function getTracksProps() {
    const tokenProp = await getToken();
    const results = await getReleaseTracks(tokenProp, currentRelease.href);
    console.log('results:', results);
    // const track = await getTrack(tokenProp, currentPlaylist.tracks.href);
    setAllTracks(results);
    // console.log('track', track);
    // setTrackOne(track);
  }

  useEffect(() => {
    getTracksProps();
  }, []);

  return (
    <div>
      <main>
        <Box sx={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', marginBottom: '70px' }}>
          <Box sx={{ display: 'flex', pb: 3, borderBottom: 1, borderColor: '#8996A6' }}>
            <img src={releaseImage} alt="N/A" style={{ width: '150px', height: '150px', borderRadius: '4px' }} />
            <Box sx={{ ml: 1 }}>
              <Typography sx={{ fontSize: '20px', fontWeight: '600' }}>
                {currentRelease.name || '/userholder.png'}
              </Typography>
              <Typography sx={{ fontSize: '12px', color: '#8996A6' }}>
                {currentRelease.artists[0].name}
              </Typography>
            </Box>
          </Box>
          {allTracks.length && allTracks.map((track, index) => (
            <Box fullwidth key={index} sx={{ borderBottom: 1, borderColor: '#8996A6' }}>
              <Link href={`/track/${track.id}`}>
                <Grid sx={{ display: 'flex', flexDirection: 'row', marginBottom: '6px', overflow: 'auto', justifyContent: 'space-between' }}>
                  <Grid sx={{ display: 'flex', flexDirection: 'column', m: 0.5 }}>
                    <Typography sx={{ fontSize: '1rem', font: '#121435', fontWeight: '600' }}>
                      {track.name.length > 33 ? `${track.name.slice(0, 30)}...` : track.name}
                    </Typography>
                    <Typography sx={{ fontSize: '10px', color: '#8996A6' }}>
                      {millisToMinutesAndSeconds(track.duration_ms)}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <PlayCircleOutlineIcon sx={{ color: '#44566C' }} />
                  </Grid>
                </Grid>
              </Link>
            </Box>
          ))}
        </Box>
      </main>

      <BottomNav />
    </div>
  );
}
