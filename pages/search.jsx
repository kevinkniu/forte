import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import BottomNav from './components/BottomNav';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../config';

import SearchList from './components/SearchList';
import ArtistList from './components/ArtistList';

export default function Search() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();

  const [searchKey, setSearchKey] = useState('');
  const [token, setToken] = useState('');
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [type, setType] = useState('track');

  // const onSearch = (e) => {
  //   e.preventDefault();
  //   console.log(searchRef.current.value);
  // };

  function handleChange(e) {
    setSearchKey(e.target.value);
  }

  async function searchTrack(e) {
    e.preventDefault();
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchRef.current.value,
        type: 'track',
      },
    });
    console.log(data.tracks.items);
    setTracks(data.tracks.items);
  }

  async function searchKeyword(keyword) {
    const tracksData = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: keyword,
        type: 'track',
      },
    });
    setTracks(tracksData.data.tracks.items);

    const artistsData = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: keyword,
        type: 'artist',
      },
    });
    setArtists(artistsData.data.artists.items);
  }

  useEffect(() => {
    const clientId = SPOTIFY_CLIENT_ID;
    const clientSecret = SPOTIFY_CLIENT_SECRET;
    const getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: 'grant_type=client_credentials',
      });

      const data = await result.json();
      setToken(data.access_token);
      return data.access_token;
    };
    getToken();
  }, []);

  useEffect(() => {
    if (searchKey.length > 3) {
      searchKeyword(searchKey);
    } else {
      setTracks([]);
    }
  }, [searchKey]);

  return (
    <div>
      <Head>
        <title>forte</title>
      </Head>

      <main>
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
          <button hidden type="submit" onClick={searchTrack}>Submit</button>
        </Box>

        <input type="search" placeholder="Search for songs" value={searchKey} onChange={handleChange} style={{ display: 'block', margin: '16px auto', width: '80%', height: '40px' }} />

        {tracks.length === 0
          ? <p style={{ textAlign: 'center' }}>Search for your favorite song</p>
          : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-around', gap: '16px' }}>
                <span
                  onClick={() => setType('track')}
                >
                  Songs
                </span>
                <span
                  onClick={() => setType('artist')}
                >
                  Artists
                </span>
              </div>
              {
                type === 'track'
                  ? <SearchList tracks={tracks} />
                  : <ArtistList artists={artists} />
              }
            </>
          )}

      </main>

      <BottomNav />

    </div>
  );
}
