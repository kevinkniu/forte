import React from 'react';
import ArtistListEntry from './ArtistListEntry';
import artistListStyles from '../../styles/ArtistList.module.css';

export default function ArtistList({ artists }) {
  return (
    <ul className={artistListStyles.artistList}>
      {artists.map((artist) => (
        <ArtistListEntry key={artist.id} artist={artist} />
      ))}
    </ul>
  );
}
