import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default function handler(req, res) {
  const { userID, userName, profPic, eventName,
    date, location, details, photos, attendees } = req.body;
  db.collection('events').add({
    userID,
    userName,
    profPic,
    eventName,
    date: firebase.firestore.Timestamp.fromDate(new Date(date)),
    location,
    details,
    photos,
    attendees,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  res.status(200).json('posted!');
}
