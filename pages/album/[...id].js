import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { AppContext } from '../_app';
import getTracks from '../api/spotify/getTracks';
import getToken from '../api/spotify/getToken';

function albumTracks() {
  const { currentPlaylist } = useContext(AppContext);
  const [ allTracks, setAllTracks ] = useState();

  async function getTracksProps() {
    const tokenProp = await getToken();
    const results = await getTracks(tokenProp, currentPlaylist.tracks.href);
    console.log('results', results);
    setAllTracks(results);
  }

  useEffect(() => {
    getTracksProps();
  }, []);

  return (
    <main>
      <Box>
        {console.log(currentPlaylist)};
        {currentPlaylist.description}
      </Box>
    </main>
  );
}

export default albumTracks;
