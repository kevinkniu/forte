import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { useSession } from 'next-auth/react';

import trackListStyles from '../../styles/TrackList.module.css';
import updateUserSong from '../api/users/addUserSongs';


export default function TrackListEntry({ track }) {
  // ANDY
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;

  async function addSong(song) {
    await updateUserSong(sessionObj.id, song);
  }

  return (
    <ListItem button className={trackListStyles.trackListEntry} onClick={() => addSong(track)}>
      <img
        src={track.album.images[0].url}
        alt="album-cover"
      />
      <div className={trackListStyles.trackListEntryInfo}>
        <Typography noWrap>{track.name}</Typography>
        <Typography component="span">{track.artists[0].name}</Typography>
      </div>
    </ListItem>
  );
}
