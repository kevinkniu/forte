import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { mySpotify, friendSpotify, messages } = req.body;
  const users = [mySpotify, friendSpotify];
  const newRoom = await db.collection('rooms').add({
    messages,
    users,
  });
  console.log('NEW ROOM', newRoom);
  console.log('THIS IS OUR ROOM ID', res.id);
  res.status(200).json(newRoom);
}
