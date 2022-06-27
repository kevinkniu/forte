import React from 'react';
import artistListStyles from '../../styles/ArtistList.module.css';

export default function ArtistListEntry({ artist }) {
  return (
    <li className={artistListStyles.artistListEntry}>
      <img
        src={
          artist.images.length === 0
            ? '/userholder.png'
            : artist.images[0].url
        }
        alt="artist-pic"
      />
      <p>{artist.name}</p>
    </li>
  );
}
