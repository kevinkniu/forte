import { useSession } from 'next-auth/react';
import { useState, useEffect, forceUpdate } from 'react';
import { Button, Avatar, List, ListItem, Box, ListItemAvatar, ListItemText } from '@mui/material';
import Router from 'next/router';
import axios from 'axios';
import getRoomId from '../../utils/getRoomId';
import BottomNav from '../components/BottomNav';

export default function Messages() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const [chatRooms, setChatRooms] = useState([]);
  const [friendInfo, setFriendInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
    setLoaded(true);
    axios.get(`/api/messages/getAllChatRooms?spotifyId=${sessionObj.id}`)
      .then((rooms) => {
        const filtered = rooms.data.filter((room) => {
          if (Object.keys(room._delegate._document.data.value.mapValue.fields).length === 0) {
            return false;
          }
          return true;
        });
        setChatRooms(filtered);
        // setRenderRooms((results) => results + 1);
        const tempInfo = [];
        filtered.forEach(async (friend) => {
          const { id, name, image, roomId } = friend._delegate._document.data.value.mapValue.fields;
          const result = await axios.get(`/api/messages/getAllMessages?roomId=${roomId.stringValue}`);
          console.log('result in renderFriends:', result);
          const lastMessageObj = { ...result.data[0]
            ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values.pop() };
          const lastMessage = lastMessageObj.mapValue.fields.message.stringValue;
          tempInfo.push({
            id: id.stringValue,
            name: name.stringValue,
            image: image.stringValue,
            lastMessage,
          });
        });
        setFriendInfo(tempInfo);
        forceUpdate();
      })
      .catch((err) => console.log(err));
  }, [status]);

  useEffect(() => {
    setChanged(true);
    // console.log('performed rerender');
  }, [friendInfo]);

  const routeToFriendMessage = async (friend) => {
    // console.log(friend);
    const roomId = await getRoomId(sessionObj, friend);
    Router.push(`/messages/${roomId}`);
  };
  return (
    loaded && (
      <div>
        <h1 align="center">
          Messages
        </h1>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
          width: '100%' }}
        >
          <Button variant="text" onClick={() => { Router.push('/friends'); }}>Friends</Button>
          <Button variant="text" onClick={() => { Router.push('/messages'); }}>Messages</Button>
        </Box>
        <List>
          { changed && friendInfo.map((friendObj) => (
            <ListItem key={friendObj.id} onClick={() => routeToFriendMessage(friendObj)}>
              <ListItemAvatar>
                <Avatar src={friendObj.image} alt="" sx={{ width: 70, height: 70, mr: 1.75 }} />
              </ListItemAvatar>
              <Box>
                <ListItemText primary={friendObj.name} secondary={friendObj.lastMessage} />
              </Box>
            </ListItem>
          ))}
        </List>
        <BottomNav />
      </div>
    )
  );
}
