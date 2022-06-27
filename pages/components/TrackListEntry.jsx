import React from 'react';
import trackListStyles from '../../styles/TrackList.module.css';

export default function TrackListEntry({ track }) {
  return (
    <li className={trackListStyles.trackListEntry}>
      <img
        src={track.album.images[0].url}
        alt="album-cover"
      />
      <div className={trackListStyles.trackListEntryInfo}>
        <p>{track.name}</p>
        <span>{track.artists[0].name}</span>
      </div>
    </li>
  );
}
