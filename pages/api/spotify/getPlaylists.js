export default async function getPlaylists(token) {
  const playlistsResult = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=10', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const playlistsData = await playlistsResult.json();
  return playlistsData.playlists.items;
}
