import { updateDoc, arrayRemove, doc } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function deleteUserEvent(id, event) {
  const userDocRef = doc(db, 'users', id);
  await updateDoc(userDocRef, {
    events: arrayRemove(event[0]),
  });

  const userData = await db.collection('events').where('__name__', '==', event[0]).where('userID', '==', id).get();
  userData.docs.forEach((userDoc) => {
    userDoc.ref.delete();
  });
}
