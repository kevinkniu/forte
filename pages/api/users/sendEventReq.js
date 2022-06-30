import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { type, targetUserID, myUserID } = req.body;
  const myRef = doc(db, 'users', myUserID);
  const userRef = doc(db, 'users', targetUserID);
  // if (!type) {
  //   await updateDoc(userRef, {
  //     eventRequests: arrayUnion(myUserID),
  //   });
  //   await updateDoc(myRef, {
  //     sentEventRequests: arrayUnion(targetUserID),
  //   });
  // }
  // if (type) {
  //   await updateDoc(userRef, {
  //     eventRequests: arrayRemove(myUserID),
  //   });
  //   await updateDoc(myRef, {
  //     sentEventRequests: arrayRemove(targetUserID),
  //   });
  // }
  res.status(200).json('done!');
}
