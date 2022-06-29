export default async function getReleaseTracks(token, tracksEndPoint) {
  const result = await fetch(`${tracksEndPoint}/tracks?limit=50`, {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + token },
  });
  const data = await result.json();
  return data.items;
}
