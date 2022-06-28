import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function updateUserGenre(userID, genre) {
  const docRef = doc(db, 'users', userID);
  await updateDoc(docRef, {
    genres: arrayUnion(genre),
  });
}