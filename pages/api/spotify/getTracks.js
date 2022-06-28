// '37i9dQZF1DXcBWIGoYBM5M' find enpoint for this id to get tracks
export default async function getTracks(token, tracksEndPoint) {
  const limit = 10;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + token}
  });
  console.log('tracks', tracksEndPoint);
  const data = await result.json();
  return data.items;
}
