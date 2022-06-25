import Head from 'next/head';
import Image from 'next/image';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import BottomNav from './components/BottomNav';

export default function Home() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const searchRef = useRef();

  const onSearch = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
  };

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
