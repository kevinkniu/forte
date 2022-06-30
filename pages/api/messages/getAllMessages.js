import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default async function getAllMessages(req, res) {
  const id = req.query.roomId;
  const results = await db.collection('rooms').where(firebase.firestore.FieldPath.documentId(), '==', id).get();

  res.status(200).json(results.docs);
}
