export default async function addRoomToUser(
  mySpotifyId,
  userSpotify,
  roomId,
) {
  // console.log(mySpotifyId, 'this is the spotifyID of current User');
  // console.log(userSpotify, 'this is the userSpotify');
  // console.log(roomId, 'this is the roomid that was made and should be stored ');
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
