import { updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function deleteUserSong(userID, song) {
  const docRef = doc(db, 'users', userID);
  // await updateDoc(docRef, {
  //   songs: arrayRemove(song),
  // });
}
