import { db } from '../../../firebase';

export default function handler(req, res) {
  const { id, name, email, profPic, genres, songs, posts, recent, friends } = req.body;
  db.collection('users').set(id).add({
    id,
    name,
    email,
    profPic,
    genres,
    songs,
    posts,
    recent,
    friends,
  });
  res.status(200).json('added user!');
}
