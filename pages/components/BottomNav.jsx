import { useContext } from 'react';
import Router from 'next/router';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import { AppContext } from '../_app';

const NewBottomNavigationAction = styled(BottomNavigationAction)(`
  MuiBottomNavigationAction-root {
    color: '#FFFFFF';
  }
  &.Mui-selected {
    color: #B09AF7;
  }
`);

export default function BottomNav() {
  const { value, setValue } = useContext(AppContext);
  const { asPath } = Router.useRouter();

  return (
    <Box sx={asPath === '/' ? 'hidden' : { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1500, boxShadow: 20 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ bgcolor: '#121212', height: 60 }}
      >
        <NewBottomNavigationAction sx={{ color: '#FFFFFF' }} label="Home" icon={<HomeIcon />} onClick={() => { Router.push('/home'); }} />
        <NewBottomNavigationAction sx={{ color: '#FFFFFF' }} label="Friends" icon={<PeopleIcon />} onClick={() => { Router.push('/friends'); }} />
        <NewBottomNavigationAction sx={{ color: '#FFFFFF' }} label="Music" icon={<LibraryMusicIcon />} onClick={() => { Router.push('/music'); }} />
        <NewBottomNavigationAction sx={{ color: '#FFFFFF' }} label="Me" icon={<PersonIcon />} onClick={() => { Router.push('/profile'); }} />
      </BottomNavigation>
    </Box>
  );
}
