import axios from 'axios';
import addRoomToUser from './addRoomToUser';

export default async function getRoomId(mySpotify, friendSpotify) {
  const response = await fetch(`/api/messages/checkMessages?mySpotifyId=${mySpotify.id}&userSpotifyId=${friendSpotify.id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();
  // console.log(result, 'this is the result from the fetch for the room ID');

  if (!result.length) {
    axios.post('/api/messages/createRoom', {
      mySpotify,
      friendSpotify,
      messages: [],
    }, {
      headers: { 'Content-type': 'application/json' },
    })
      .then((id) => {
        // console.log(id, 'this id was just made');
        addRoomToUser(mySpotify.id, friendSpotify, id.data);
        addRoomToUser(friendSpotify.id, mySpotify, id.data);
      })
      .then(() => getRoomId(mySpotify, friendSpotify))
      .catch((err) => console.log(err));
  } else {
    const roomid = result[0]._delegate._document.data.value.mapValue.fields.roomId.stringValue;
    return roomid;
  }
}
