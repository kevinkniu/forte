import React from 'react';
import List from '@mui/material/List';
import TrackListEntry from './TrackListEntry';
import trackListStyles from '../styles/TrackList.module.css';

export default function TrackList({ tracks }) {
  return (
    <List className={trackListStyles.trackList}>
      {tracks.map((track) => (
        <TrackListEntry key={track.id} track={track} />
      ))}
    </List>
  );
}
