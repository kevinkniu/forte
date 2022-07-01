import { updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function deleteUserGenre(userID, genre) {
  const docRef = doc(db, 'users', userID);
  await updateDoc(docRef, {
    genres: arrayRemove(genre.stringValue),
  });
}
