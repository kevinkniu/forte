import React from 'react';
import getToken from '../api/spotify/getToken';
import getTrack from '../api/spotify/getTrack';


export default function Track() {
  return <h1>Hello Track Page</h1>
}

export async function getServerSideProps({ query }) {
  const tokenProp = await getToken();
  const trackProp = await getTrack(tokenProp, query.id);

  return {
    props: { trackProp },
  };
}
