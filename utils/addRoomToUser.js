export default async function addRoomToUser(mySpotifyId, userSpotifyId, roomId) {
  await fetch('/api/messages/addRoomToUser', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      mySpotifyId,
      userSpotifyId,
      roomId,
    }),
  });
}
