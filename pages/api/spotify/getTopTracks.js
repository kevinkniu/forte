export default async function getTopTracks(token, id) {
  const result = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data.tracks;
}
