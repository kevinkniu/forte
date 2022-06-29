import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { type, myUserID, eventID } = req.body;
  const myRef = doc(db, 'users', myUserID);
  if (type === 'attend') {
    await updateDoc(myRef, {
      events: arrayUnion(eventID),
    });
    await updateDoc(myRef, {
      eventRequests: arrayRemove(eventID),
    });
  }
  if (type === 'delete') {
    await updateDoc(myRef, {
      eventRequests: arrayRemove(eventID),
    });
  }
  res.status(200).json('done!');
}
