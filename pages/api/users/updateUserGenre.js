// import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
// import { db } from '../../../firebase';

// export default async function updateUserGenre(currentUser, genre) {
//   console.log(currentUser);
//   const id = currentUser.id.stringValue;
//   console.log(currentUser.id.stringValue);
//   // console.log(id);
//   console.log(genre);
//   // const docRef = doc(db, 'users', id);
//   // console.log(docRef);

//   const docRef = doc(db, 'users', 'hnWnxlRoc0TyieS0LBPx');
//   console.log(docRef);
//   await updateDoc(docRef, {
//     genres: arrayUnion(genre),
//   });

//   // const result = await db.collection('users').where('id', '==', id).get();
//   // console.log(result);

//   // const querySnapshot = result;
//   // querySnapshot.forEach((q) => {
//   //   console.log(q.data());
//   // });
// }
