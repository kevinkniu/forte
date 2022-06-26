import { db } from '../../../firebase';

export default async function queryUserData(userID) {
  const collectionArray = [];
  const id = userID.query.id[0];
  const result = await db.collection('users').where('id', '==', id).get();

  const querySnapshot = result;
  querySnapshot.forEach((doc) => {
    collectionArray.push(doc.data());
  });
  return collectionArray;
}
