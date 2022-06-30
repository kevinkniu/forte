import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { type, targetUserID, myUserID } = req.body;
  const myRef = doc(db, 'users', myUserID);
  const userRef = doc(db, 'users', targetUserID);
  // if (type === 'accept') {
  //   await updateDoc(userRef, {
  //     sentEventRequests: arrayRemove(myUserID),
  //   });
  //   await updateDoc(myRef, {
  //     events: arrayUnion(targetUserID),
  //   });
  //   await updateDoc(myRef, {
  //     eventRequests: arrayRemove(targetUserID),
  //   });
  // }
  // if (type === 'delete') {
  //   await updateDoc(myRef, {
  //     eventRequests: arrayRemove(targetUserID),
  //   });
  //   await updateDoc(userRef, {
  //     sentEventRequests: arrayRemove(myUserID),
  //   });
  // }
  res.status(200).json('done!');
}
