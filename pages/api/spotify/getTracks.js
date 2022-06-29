export default async function getTracks(token, tracksEndPoint) {
  const limit = 50;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  console.log('tracks', tracksEndPoint);
  const data = await result.json();
  return data.items;
}
