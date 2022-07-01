import { useContext } from 'react';
import Router from 'next/router';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@mui/material/styles';
import { AppContext } from '../_app';

// 'linear-gradient(#E5DCFD, #B09AF7)'

const useStyles = makeStyles({
  root: {
    background: '#FFFFFF',
  },
  selected: {
    color: '#00A57A',
  },
});

const NewBottomNavigationAction = styled(BottomNavigationAction)(`
  color: '#C4C4C4';
  &.Mui-selected {
    color: #5D43BF;
    font-weight: 600;
  }
`);

export default function BottomNav() {
  const { value, setValue } = useContext(AppContext);
  const { asPath } = Router.useRouter();

  const classes = useStyles();

  return (
    <Box sx={asPath === '/' ? 'hidden' : { position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1500, boxShadow: 20 }} elevation={3}>
      <BottomNavigation
        className={classes.root}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <NewBottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => { Router.push('/home'); }} />
        <NewBottomNavigationAction label="Friends" icon={<PeopleIcon />} onClick={() => { Router.push('/friends'); }} />
        <NewBottomNavigationAction label="Music" icon={<LibraryMusicIcon />} onClick={() => { Router.push('/music'); }} />
        <NewBottomNavigationAction label="Me" icon={<PersonIcon />} onClick={() => { Router.push('/profile'); }} />
      </BottomNavigation>
    </Box>
  );
}
