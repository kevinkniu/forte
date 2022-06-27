export default async function getTokenTest(token) {
  const playlistsResult = await fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=10', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const playlistsData = await playlistsResult.json();
  return playlistsData.playlists.items;
}
