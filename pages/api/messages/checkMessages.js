import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { mySpotifyId, userSpotifyId } = req.query;
  const result = await db.collection(`users/${mySpotifyId}/messages`).where(firebase.firestore.FieldPath.documentId(), '==', userSpotifyId).get();

  res.status(200).json(result.docs);
}
