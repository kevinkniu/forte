import { db } from '../../../firebase';

export default async function handler(req, res) {
  const eventData = await db.collection('events').orderBy('timestamp', 'desc').limit(25).get();
  res.status(200).json(eventData.docs);
}
