import { db } from '../../../firebase';

export default async function getFriends(req, res) {
  console.log(req.query, 'this is the req query');
  const { id } = req.query;

  const results = await db.collection('users').doc(id).get();
  // console.log(data.docs, 'THIS IS DATA.DOC');
  // console.log(data, 'THIS IS DATA');
  res.status(200).json(results.docs);
}
