import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import getToken from '../api/spotify/getToken';
import getTrack from '../api/spotify/getTrack';

export default function Track({ tokenProp, trackProp }) {
  return (
    <div>
      <SpotifyPlayer
        token={tokenProp}
        uris={[trackProp.uri]}
      />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const tokenProp = await getToken();
  const trackProp = await getTrack(tokenProp, query.id);

  return {
    props: { tokenProp, trackProp },
  };
}
