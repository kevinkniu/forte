export default async function getTrack(token, trackEndPoint) {
  const result = await fetch(`${trackEndPoint}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  console.log('tracks', trackEndPoint);
  const data = await result.json();
  return data;
}
