import React from 'react';
import searchListStyles from '../../styles/SearchList.module.css';

export default function SearchListEntry({ track }) {
  return (
    <li className={searchListStyles.searchListEntry}>
      <img src={track.album.images[2].url} />
      <div className={searchListStyles.searchListEntryInfo}>
        <p>{track.name}</p>
        <span>{track.artists[0].name}</span>
      </div>
    </li>
  );
}
