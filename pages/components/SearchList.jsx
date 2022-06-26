import React from 'react';
import SearchListEntry from './SearchListEntry';
import searchListStyles from '../../styles/SearchList.module.css';

export default function SearchList({ tracks }) {
  return (
    <ul className={searchListStyles.searchList}>
      {tracks.map((track) => (
        <SearchListEntry track={track} />
      ))}
    </ul>
  );
}
