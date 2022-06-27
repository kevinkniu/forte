import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default function handler(req, res) {
  const { userID, name, email, profPic, message, photos } = req.body;
  db.collection('posts').add({
    userID,
    name,
    email,
    profPic,
    message,
    photos,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  res.status(200).json('posted!');
}
