import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const docRef = doc(db, 'events', req.query.id[0]);
  await deleteDoc(docRef);
  res.status(200).json('deleted!');
}
