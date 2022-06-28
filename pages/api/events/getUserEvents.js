import { db } from '../../../firebase';

export default async function queryUserEvents(userID) {
  const collectionArray = [];
  const result = await db.collection('events').where('userID', '==', userID).get();

  const querySnapshot = result;
  querySnapshot.forEach((doc) => {
    collectionArray.push(doc.data());
  });
  return collectionArray;
}
