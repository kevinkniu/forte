import { db } from '../../../firebase';

export default function handler(req, res) {
  const { id, name, email, profPic, genres, songs, posts, recent } = req.body;
  db.collection('users').add({
    id,
    name,
    email,
    profPic,
    genres,
    songs,
    posts,
    recent,
  });
  res.status(200).json('added user!');
}
