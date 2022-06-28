import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { type, targetUserID, myUserID } = req.body;
  const userRef = doc(db, 'users', targetUserID);
  if (!type) {
    await updateDoc(userRef, {
      friendRequests: arrayUnion(myUserID),
    });
  }
  if (type) {
    await updateDoc(userRef, {
      friendRequests: arrayRemove(myUserID),
    });
  }
  res.status(200).json('done!');
}
