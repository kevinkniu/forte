import { db } from '../../../firebase';

export default function handler(req, res) {
  const { id, name, email, profPic, genres, songs, posts, events, recent,
    friends, rooms, friendRequests, sentFriendRequests,
    eventRequests, sentEventRequests } = req.body;
  db.collection('users').doc(id).set({
    id,
    name,
    email,
    profPic,
    genres,
    songs,
    posts,
    events,
    recent,
    friends,
    rooms,
    friendRequests,
    sentFriendRequests,
    eventRequests,
    sentEventRequests,
  });
  res.status(200).json('added user!');
}
