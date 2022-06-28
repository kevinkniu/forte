import { useState, useEffect } from 'react';
import addRoomToUser from './addRoomToUser';

export default async function getRoomId(mySpotify, friendSpotify) {
  // const [roomId, setRoomId] = useState('');
  console.log('MY SPOTIFY OBJ', mySpotify);
  console.log('FRIEND SPOTIFY OBJ', friendSpotify);
  const response = await fetch(`/api/messages/checkMessages?mySpotifyId=${mySpotify.id}&userSpotifyId=${friendSpotify.id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();

  if (!result.length) {
    const newRoom = await fetch('/api/messages/createRoom', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        mySpotify,
        friendSpotify,
        messages: [],
      }),
    });
    const newRoomId = await newRoom.json();
    // setRoomId(newRoomId);

    addRoomToUser(mySpotify.id, friendSpotify.id, newRoomId);
    addRoomToUser(friendSpotify.id, mySpotify.id, newRoomId);

    getRoomId(mySpotify, friendSpotify);
  }

  console.log(result, 'THESE ARE THE RESULTS');
  const roomid = result[0]._delegate._document.data.value.mapValue.fields.roomId.stringValue;
  return roomid;
}
