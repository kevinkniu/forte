import { db } from '../../../../firebase';

export default async function getAllMessage(req, res) {
  const id = req.query.roomId[0];
  const results = await db.collection(`rooms/${id}`).get();

  const data = await results.json();
  console.log(data.data, 'THIS IS DATA.DATA');
  console.log(data.docs, 'THIS IS DATA.DOC');
  console.log(data, 'THIS IS DATA');
  res.status(200).json('added room');
}
