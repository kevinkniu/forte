import Head from 'next/head';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import BottomNav from './components/BottomNav';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config';

export default function Home() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
  };

  useEffect(() => {
    const clientId = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;
    const getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
        body: 'grant_type=client_credentials',
      });

      const data = await result.json();
      console.log('token:', data.access_token);
      return data.access_token;
    };
    getToken();
  }, []);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
        <h1 align="center">
          This is a music page.
        </h1>
        <Box
          component="form"
          sx={{ display: 'flex', mx: 5 }}
        >
          <SearchIcon sx={{ alignSelf: 'flex-end', mr: 1 }} />
          <TextField
            fullWidth
            type="search"
            label="Songs"
            variant="standard"
            inputRef={searchRef}
          />
          <button hidden type="submit" onClick={(e) => { onSearch(e); }}>Submit</button>
        </Box>
      </main>

      <BottomNav />

    </div>
  );
}
