export default async function getPlaylists(token) {
  const releasesResult = await fetch('https://api.spotify.com/v1/browse/new-releases?limit=10', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const releasesData = await releasesResult.json();
  return releasesData.albums.items;
}
