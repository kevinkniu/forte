import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../_app';
import { Grid, Typography, Card } from '@mui/material';
import getTracks from '../api/spotify/getTracks';
import getToken from '../api/spotify/getToken';

function albumTracks() {
  const { currentPlaylist } = useContext(AppContext);
  const [allTracks, setAllTracks] = useState(currentPlaylist);
  const [getId, setGetId] = useState('0');

  function getIdFunction(id) {
    setGetId(id);
  }

  async function getTracksProps() {
    const tokenProp = await getToken();
    const results = await getTracks(tokenProp, currentPlaylist.tracks.href);
    setAllTracks(results);
  }

  useEffect(() => {
    getTracksProps();
  }, []);

  return (
    <main>
      <Box>
        {console.log(allTracks)}
        {allTracks.length ?
          <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
            <img src={allTracks[getId].track.album.images[0].url} alt="N/A" style={{ 'width': '50px' }}/>
            <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
              <Grid sx={{ fontSize: '20px' }}>
                {allTracks[getId].track.name}
              </Grid>
              <Grid sx={{ fontSize: '12px' }}>
                {allTracks[getId].track.artists[0].name}
              </Grid>
            </Grid>
          </Grid> :
          <Grid></Grid>
        }
        {allTracks.length && allTracks.map((track, index) => (
          <div key={`track${index}`} onClick={() => getIdFunction(index)}>
            <Grid sx={{ display: 'flex', flexDirection: 'row', marginBottom: '4px', overflow: 'auto'}}>
              {console.log(getId)}
              <img src={track.track.album.images[0].url} alt="N/A" style={{ 'width': '50px' }}/>
              <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                <Grid sx={{ fontSize: '12px' }}>
                  {track.track.name}
                </Grid>
                <Grid sx={{ fontSize: '8px', font: '#C0C0C0' }}>
                  {track.track.artists[0].name}
                </Grid>
                <Grid sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Grid sx={{ fontSize: '6px', font: '#C0C0C0', marginRight: '6px' }}>
                    Likes
                  </Grid>
                  <Grid sx={{ fontSize: '6px', font: '#C0C0C0' }}>
                    Duration
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        ))}
      </Box>
    </main>
  );
}

export default albumTracks;
