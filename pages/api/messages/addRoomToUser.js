import { db } from '../../../firebase';

export default function addRoomToUser(req, res) {
  const { mySpotifyId, roomId, id, name, image } = req.body;

  db.collection('users').doc(mySpotifyId).collection('messages').doc(id)
    .set({
      id,
      name,
      image,
      roomId,
    });

  res.status(200).json('added room');
}
