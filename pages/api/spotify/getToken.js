import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '../../../config';

export default async function getToken() {
  const tokenResult = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET),
    },
    body: 'grant_type=client_credentials',
  });
  const tokenData = await tokenResult.json();
  const token = tokenData.access_token;
  return token;
}
