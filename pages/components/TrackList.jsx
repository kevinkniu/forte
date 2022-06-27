import React from 'react';
import TrackListEntry from './TrackListEntry';
import trackListStyles from '../../styles/TrackList.module.css';

export default function TrackList({ tracks }) {
  return (
    <ul className={trackListStyles.trackList}>
      {tracks.map((track) => (
        <TrackListEntry key={track.id} track={track} />
      ))}
    </ul>
  );
}
