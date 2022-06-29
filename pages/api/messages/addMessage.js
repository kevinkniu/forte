import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default async function addMessage(req, res) {
  const { message, room, sessionObj } = req.body.data;
  const messageObj = {
    message,
    userName: sessionObj.name,
    userProfilePic: sessionObj.image,
    userSpotifyId: sessionObj.id,
    timestamp: firebase.firestore.Timestamp.now(),
  };

  // console.log('MESSAGE OBJ', messageObj);

  const userDocRef = doc(db, 'rooms', room);

  await updateDoc(userDocRef, {
    messages: arrayUnion(messageObj),
  });

  res.status(200).json('added message');
}
