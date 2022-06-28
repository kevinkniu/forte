import { useState, useEffect } from 'react';
// import { AppContext } from '../pages/_app';

export default async function getRoomId(mySpotifyId, userSpotifyId) {
  console.log('I am here in the getRoomId');
  // const { currentUser } = useContext(AppContext);
  // const [roomId, setRoomId] = useState('');
  // const [userName, setUserName] = useState('');
  // const [userProfPic, setUserProfPic] = useState('');

  const response = await fetch(`/api/messages/checkMessages?mySpotifyId=${mySpotifyId}&userSpotifyId=${userSpotifyId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const result = await response.json();
  const roomid = result[0]._delegate._document.data.value.mapValue.fields.roomId.stringValue;

  if (!roomid.length) {
    /*
    inside room firebase collection
    create a message field
    save the roomId

    .add roomid with document id of userSpotifyId into myUserProfile
    .add roomid with document id of mySpotidyId into user'sUserProfile
    recursive call getRoomId(mySpotifyId, userSpotifyId)
    */

  }

  return roomid;
}
