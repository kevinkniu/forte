import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { Grid, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Router from 'next/router';
import BottomNav from '../components/BottomNav';
import { AppContext } from '../_app';
import getTracks from '../api/spotify/getTracks';
import getToken from '../api/spotify/getToken';

const millisToMinutesAndSeconds = (millis) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);

  return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
};

export default function albumTracks() {
  const { currentPlaylist } = useContext(AppContext);
  const [allTracks, setAllTracks] = useState([]);

  async function getTracksProps() {
    const tokenProp = await getToken();
    const tracks = await getTracks(tokenProp, currentPlaylist.tracks.href);
    console.log('tracks:', tracks);
    setAllTracks(tracks);
  }

  useEffect(() => {
    getTracksProps();
  }, []);

  return (
    <div>
      <main>
        <Box sx={{ paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px', marginBottom: '70px' }}>
          <Box sx={{ py: 2 }}>
            <ArrowBackIosNewIcon sx={{ color: '#5D43BF' }} onClick={() => { Router.push('/music'); }} />
          </Box>
          <Box>
            {allTracks.map((track, index) => (
              <Box fullwidth key={index} sx={{ borderBottom: 1, borderColor: '#CDCFD2', paddingTop: '12px', mb: 1.75 }}>
                <Link href={track?.track?.id ? `/track/${track?.track?.id}` : '/music'}>
                  <Grid sx={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', overflow: 'auto', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Grid sx={{ display: 'flex' }}>
                      <img src={track.track?.album?.images[0]?.url || '/userholder.png'} alt="N/A" style={{ width: '55px', height: '55px', borderRadius: '4px' }} />
                      <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', marginLeft: '10px' }}>
                        <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>
                          {track?.track?.name.length > 33 ? `${track?.track?.name.slice(0, 30)}...` : track?.track?.name}
                        </Typography>
                        <Typography sx={{ fontSize: '13px', color: '#757575' }}>
                          {track?.track?.artists[0].name || 'Removed Song'}
                        </Typography>
                        <Typography sx={{ fontSize: '10px', color: '#8996A6' }}>
                          {millisToMinutesAndSeconds(track?.track?.duration_ms) || ''}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <PlayCircleOutlineIcon sx={{ color: '#44566C' }} />
                    </Grid>
                  </Grid>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </main>

      <BottomNav />
    </div>
  );
}
