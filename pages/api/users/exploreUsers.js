import { db } from '../../../firebase';

export default async function handler(req, res) {
  const { genres } = req.body;
  const userData = await db.collection('users').where('genres', 'array-contains-any', genres).get();
  res.status(200).json(userData.docs);
}
