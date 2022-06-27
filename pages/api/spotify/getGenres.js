export default async function getTokenTest(token) {
  const genreResult = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const genreData = await genreResult.json();
  return genreData.categories.items;
}
