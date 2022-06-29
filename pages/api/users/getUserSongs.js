import { db } from '../../../firebase';

export default async function queryUserSongs(userID) {
  const collectionArray = [];
  const result = await db.collection('users').where('id', '==', userID).get();

  const querySnapshot = result;
  querySnapshot.forEach((doc) => {
    collectionArray.push(doc.data().songs);
  });
  return collectionArray;
}
