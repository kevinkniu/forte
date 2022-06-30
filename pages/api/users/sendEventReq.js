import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  console.log('requested: ', req.body);
  const { type, userID, targetUser, eventID } = req.body;
  const myRef = doc(db, 'users', userID);
  const userRef = doc(db, 'users', targetUser.id);
  if (!type) {
    await updateDoc(userRef, {
      eventRequests: arrayRemove(eventID),
    });
    await updateDoc(myRef, {
      sentEventRequests: arrayRemove(eventID),
    });
  }
  if (type) {
    await updateDoc(userRef, {
      eventRequests: arrayUnion(eventID),
    });
    await updateDoc(myRef, {
      sentEventRequests: arrayUnion(eventID),
    });
  }
  res.status(200).json('done!');
}
