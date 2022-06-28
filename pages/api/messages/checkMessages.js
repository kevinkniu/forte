import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  //console.log(req.query, 'REQ QUERY');
  const { mySpotifyId, userSpotifyId } = req.query;
  // console.log('mySpotifyID:', mySpotifyId);
  // console.log('userSpotifyID:', userSpotifyId);
  const temp = await db.collection(`users/${mySpotifyId}/messages`).where(firebase.firestore.FieldPath.documentId(), '==', userSpotifyId).get();
  // const userData = await db.collection('users').doc(mySpotifyId)
  //  .collection('messages').doc(userSpotifyId)
  //   .get();
  // const userData = await db.collection('users').where('id', '==', mySpotifyId).get();

  // const collectionData = await userData
  //   .collection('messages')
  //   .where('roomId', '==', userSpotsifyId)
  //   .get();
  // const data = await userData.json();
  // console.log('tempData:', temp.docs);
  // console.log('USER DATA', userData);
  res.status(200).json(temp.docs);
}
