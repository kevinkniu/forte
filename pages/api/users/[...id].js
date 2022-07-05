import { db } from '../../../firebase';

export default async function handler(req, res) {
  const id = req.query.id[0];
  const userData = await db.collection('users').where('id', '==', id).get();
  res.status(200).json(userData.docs);
}

