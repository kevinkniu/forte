import { updateDoc, arrayRemove, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function deleteUserEvent(id, event) {
  const userDocRef = doc(db, 'users', id);
  await updateDoc(userDocRef, {
    events: arrayRemove(event[0]),
  });
}
