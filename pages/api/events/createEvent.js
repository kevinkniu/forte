import firebase from 'firebase/compat/app';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { userID, userName, profPic, eventName,
    date, location, details, photos, attendees } = req.body;
  const userRef = doc(db, 'users', userID);
  const timestamp = firebase.firestore.Timestamp.now();
  const event = {
    userID,
    userName,
    profPic,
    eventName,
    date: firebase.firestore.Timestamp.fromDate(new Date(date)),
    location,
    details,
    photos,
    attendees,
    timestamp,
  };
  db.collection('events').add(event)
    .then((docRef) => {
      updateDoc(userRef, {
        events: arrayUnion(docRef.id),
      });
    });
  res.status(200).json('posted!');
}
