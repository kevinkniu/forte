import { useState, useEffect } from 'react';

export default async function getRoomId(mySpotify, friendSpotify) {
  console.log('MY SPOTIFY OBJ', mySpotify);
  console.log('FRIEND SPOTIFY OBJ', friendSpotify);
  const response = await fetch(`/api/messages/checkMessages?mySpotifyId=${mySpotify.id}&userSpotifyId=${friendSpotify.id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();
  console.log(result);

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
    const roomData = await newRoom;
    console.log(roomData, 'this is the roomdata');
  }
  /*
  inside room firebase collection
  create a message field
  save the roomId

  .add roomid with document id of userSpotifyId into myUserProfile
  .add roomid with document id of mySpotidyId into user'sUserProfile
  recursive call getRoomId(mySpotifyId, userSpotifyId)
  */

 // const roomid = result[0]._delegate._document.data.value.mapValue.fields.roomId.stringValue;
  return;
}
