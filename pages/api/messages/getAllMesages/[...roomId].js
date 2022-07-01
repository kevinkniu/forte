import { db } from '../../../../firebase';

export default async function getAllMessages(req, res) {
  const id = req.query.roomId[0];
  const results = await db.collection(`rooms/${id}`).get();

  const data = await results.json();
  res.status(200).json(data.docs);
}
