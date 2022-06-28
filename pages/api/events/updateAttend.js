import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { userID, eventID, change } = req.body;
  const userDocRef = doc(db, 'users', userID);
  if (change === 'toRemove') {
    await updateDoc(userDocRef, {
      events: arrayRemove(eventID),
    });
  }
  if (change === 'toAdd') {
    await updateDoc(userDocRef, {
      events: arrayUnion(eventID),
    });
  }
  res.status(200).json('done!');
}
