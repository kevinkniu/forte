import { useContext } from 'react';
import Router from 'next/router';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import { AppContext } from '../_app';

export default function BottomNav() {
  const { value, setValue } = useContext(AppContext);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: 1 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => { Router.push('/home'); }} />
        <BottomNavigationAction label="Friends" icon={<PeopleIcon />} onClick={() => { Router.push('/friends'); }} />
        <BottomNavigationAction label="Music" icon={<LibraryMusicIcon />} onClick={() => { Router.push('/music'); }} />
        <BottomNavigationAction label="Me" icon={<PersonIcon />} onClick={() => { Router.push('/profile'); }} />
      </BottomNavigation>
    </Box>
  );
}
