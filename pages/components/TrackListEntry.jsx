import React from 'react';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import trackListStyles from '../../styles/TrackList.module.css';

export default function TrackListEntry({ track }) {
  return (
    <Link href={`/track/${track.id}`}>
      <ListItem button className={trackListStyles.trackListEntry}>
        <img
          src={track.album.images[0].url}
          alt="album-cover"
        />
        <div className={trackListStyles.trackListEntryInfo}>
          <Typography noWrap sx={{ fontWeight: '600' }}>{track.name.length > 30 ? `${track.name.slice(0, 25)}...` : track.name}</Typography>
          <Typography component="span">{track.artists[0].name}</Typography>
        </div>
        <div>
          <PlayCircleOutlineIcon sx={{ color: '#44566C' }} />
        </div>
      </ListItem>
    </Link>
  );
}
