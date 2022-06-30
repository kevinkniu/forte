import { db } from '../../../firebase';

export default async function getAllChatRooms(req, res) {
  const { spotifyId } = req.query;

  const results = await db.collection('users').doc(spotifyId).collection('messages').get();

  // console.log('RESULTS FROM GET ROOMS', results);

  res.status(200).json(results.docs);
}
