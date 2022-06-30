import { db } from '../../../../firebase';

export default async function getAllMessages(req, res) {
  // console.log('THIS IS OUR QUERY', req.query);
  const id = req.query.roomId[0];
  const results = await db.collection(`rooms/${id}`).get();

  const data = await results.json();
  // console.log(data.docs, 'THIS IS DATA.DOC');
  // console.log(data, 'THIS IS DATA');
  res.status(200).json(data.docs);
}
