import React from 'react';
import List from '@mui/material/List';
import ArtistListEntry from './ArtistListEntry';
import artistListStyles from '../../styles/ArtistList.module.css';

export default function ArtistList({ artists }) {
  return (
    <List className={artistListStyles.artistList}>
      {artists.map((artist) => (
          <ArtistListEntry key={artist.id} artist={artist} />
      ))}
    </List>
  );
}
