import React, { useState } from 'react';
import getToken from '../api/spotify/getToken';
import getArtist from '../api/spotify/getArtist';

export default function Artist({ artistProp }) {
  return (<h1>Hello Artist id</h1>);
}

export async function getServerSideProps({ query }) {
  const tokenProp = await getToken();
  const artistProp = await getArtist(tokenProp, query.id);

  return {
    props: { artistProp },
  };
}
