export default async function getArtist(token, id) {
  const result = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });

  const data = await result.json();
  return data;
}
