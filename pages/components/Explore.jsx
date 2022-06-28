import { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNav from './BottomNav';
import { AppContext } from '../_app';
import ExploreCard from './ExploreCard';

export default function Explore() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [myGenres, setMyGenres] = useState([]);
  const [explore, setExplore] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { currentUser } = useContext(AppContext);

  const exploreUsers = async (genres) => {
    const response = await fetch('/api/users/exploreUsers', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        genres,
      }),
    });
    const result = await response.json();
    setExplore(result);
  };

  const initializeExplore = async () => {
    const tempGenres = [];
    currentUser.genres.arrayValue.values.map((genre) => (
      tempGenres.push(genre.stringValue)
    ));
    setMyGenres(tempGenres);
    exploreUsers(tempGenres);
    setLoaded(true);
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    initializeExplore();
  }, [currentUser]);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', mx: 5, mb: 1, mt: 2, alignItems: 'center', justifyContent: 'center' }}>
          <h2>People you should meet</h2>
        </Box>
        <Box sx={{ display: loaded ? 'none' : '', color: '#673ab7' }}>
          <CircularProgress color="inherit" />
        </Box>

        {explore.map((user, number) => {
          if (user._delegate._document.data.value.mapValue.fields.id.stringValue
            !== sessionObj.id) {
            return (
              <div key={number}>
                <ExploreCard myGenres={myGenres} user={user} />
              </div>
            );
          }
          return null;
        })}

      </Box>

      <BottomNav />

    </div>
  );
}
