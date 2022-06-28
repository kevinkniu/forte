import React from 'react';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import artistListStyles from '../../styles/ArtistList.module.css';

export default function ArtistListEntry({ artist }) {
  return (
    <ListItem button className={artistListStyles.artistListEntry}>
      <img
        src={
          artist.images.length === 0
            ? '/userholder.png'
            : artist.images[0].url
        }
        alt="artist-pic"
      />
      <Typography>{artist.name}</Typography>
    </ListItem>
  );
}
