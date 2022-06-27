import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { currentUserID } = req.body;
  const docRef = doc(db, 'events', req.query.id[0]);
  const userDocRef = doc(db, 'users', currentUserID);
  await deleteDoc(docRef);
  await updateDoc(userDocRef, {
    events: arrayRemove(docRef.id),
  });

  res.status(200).json('deleted!');
}
