export default async function addRoomToUser(
  mySpotifyId,
  userSpotify,
  roomId,
) {
  await fetch('/api/messages/addRoomToUser', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      mySpotifyId,
      roomId,
      id: userSpotify.id,
      name: userSpotify.name,
      image: userSpotify.image,
    }),
  });
}
