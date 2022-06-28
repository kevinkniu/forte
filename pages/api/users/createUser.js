import { db } from '../../../firebase';

export default function handler(req, res) {
  const { id, name, email, profPic, genres, songs, posts, recent,
    friends, events, rooms } = req.body;
  db.collection('users').doc(id).set({
    id,
    name,
    email,
    profPic,
    genres,
    songs,
    posts,
    recent,
    friends,
    events,
    rooms,
  });
  res.status(200).json('added user!');
}
