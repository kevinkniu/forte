import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { mySpotify, friendSpotify, messages } = req.body;
  const users = [mySpotify, friendSpotify];
  const { id } = await db.collection('rooms').add({
    messages,
    users,
  });
  // const newRoomData = await newRoom;
  console.log(id);
  // console.log('NEW ROOM', newRoom.id);
  res.status(200).json(id);
}
