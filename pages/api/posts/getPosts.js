import { db } from '../../../firebase';

export default async function handler(req, res) {
  const userData = await db.collection('posts').orderBy('timestamp', 'desc').get();
  res.status(200).json(userData.docs);
}
