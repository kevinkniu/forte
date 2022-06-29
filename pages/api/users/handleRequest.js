import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { type, targetUserID, myUserID } = req.body;
  const myRef = doc(db, 'users', myUserID);
  const userRef = doc(db, 'users', targetUserID);
  if (type === 'accept') {
    await updateDoc(userRef, {
      friends: arrayUnion(myUserID),
    });
    await updateDoc(userRef, {
      sentFriendRequests: arrayRemove(myUserID),
    });
    await updateDoc(myRef, {
      friends: arrayUnion(targetUserID),
    });
    await updateDoc(myRef, {
      friendRequests: arrayRemove(targetUserID),
    });
  }
  if (type === 'delete') {
    await updateDoc(myRef, {
      friendRequests: arrayRemove(targetUserID),
    });
    await updateDoc(userRef, {
      sentFriendRequests: arrayRemove(myUserID),
    });
  }
  res.status(200).json('done!');
}
