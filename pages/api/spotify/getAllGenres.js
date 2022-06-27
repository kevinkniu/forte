export default async function getAllGenres(token) {
  const genreResult = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  const genreData = await genreResult.json();
  return genreData;
}
