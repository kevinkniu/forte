import { db } from '../../../firebase';

export default async function getAllChatRooms(req, res) {
  console.log('PARAMS', req.params);
  console.log('QUERY', req.query);
  // const spotifyId = req.params;
  // console.log(spotifyId);
  const results = await db.collection('users').doc(req.query.spotifyId).collection('messages').get();

  // console.log(data.data, 'THIS IS DATA.DATA');
  // console.log(data.docs, 'THIS IS DATA.DOC');
  // console.log(data, 'THIS IS DATA');
  res.status(200).json(results.docs);
}
