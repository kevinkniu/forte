import firebase from 'firebase/compat/app';
import { db } from '../../../firebase';

export default function addRoomToUser(req, res) {
  const { mySpotifyId, userSpotifyId, roomId } = req.body;

  db.collection('users').doc(mySpotifyId).collection('messages').doc(userSpotifyId)
    .set({
      roomId,
    });

  res.status(200).json('added room');
}
