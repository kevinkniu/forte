import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function updateUserSong(userID, song) {
  const docRef = doc(db, 'users', userID);
  // await updateDoc(docRef, {
  //   songs: arrayUnion(song),
  // });
}
