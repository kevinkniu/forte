import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default function addRoomToUser(req, res) {
  const { mySpotifyId, roomId, id, name, image } = req.body;

  db.collection('users').doc(mySpotifyId).collection('messages').doc(id)
    .set({
      roomId,
      name,
      image,
    });

  res.status(200).json('added room');
}
