import firebase from 'firebase/compat/app';
import { doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  console.log(req.method);
  if (req.method === 'GET') {
    const eventData = await db.collection('events').where(firebase.firestore.FieldPath.documentId(), '==', req.query.id[0]).get();
    res.status(200).json(eventData.docs);
  }
  if (req.method === 'POST') {
    const { userID } = req.body;
    const docRef = doc(db, 'events', req.query.id[0]);
    const userDocRef = doc(db, 'users', userID);
    await deleteDoc(docRef);
    await updateDoc(userDocRef, {
      events: arrayRemove(docRef.id),
    });
    res.status(200).json('deleted!');
  }
}
