import { db } from '../../../firebase';

export default async function handler(req, res) {
  const postData = await db.collection('posts').orderBy('timestamp', 'desc').limit(25).get();
  res.status(200).json(postData.docs);
}
