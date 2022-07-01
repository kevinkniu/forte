import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button, Avatar, List, ListItem, Box, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Router from 'next/router';
import axios from 'axios';
import getRoomId from '../../utils/getRoomId';
import BottomNav from '../components/BottomNav';

export default function Messages() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const [friendInfo, setFriendInfo] = useState([]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
    axios.get(`/api/messages/getAllChatRooms?spotifyId=${sessionObj.id}`)
      .then((rooms) => {
        const filtered = rooms.data.filter((room) => {
          if (Object.keys(room._delegate._document.data.value.mapValue.fields).length === 0) {
            return false;
          }
          return true;
        });
        const tempInfo = [];
        filtered.forEach(async (friend) => {
          const { id, name, image, roomId } = friend._delegate._document.data.value.mapValue.fields;
          const result = await axios.get(`/api/messages/getAllMessages?roomId=${roomId.stringValue}`);
          const lastMessageObj = result.data[0]
            ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values.pop();
          const lastMessageString = lastMessageObj ? lastMessageObj.mapValue.fields.message.stringValue : 'No Messages';
          tempInfo.push({
            id: id.stringValue,
            name: name.stringValue,
            image: image.stringValue,
            lastMessage: lastMessageString,
          });
          setFriendInfo([...tempInfo]);
        });
      })
      .catch((err) => console.log(err));
  }, [status]);

  const routeToFriendMessage = async (friend) => {
    const roomId = await getRoomId(sessionObj, friend);
    Router.push(`/messages/${roomId}`);
  };
  return (
    <div>
      <Typography sx={{ fontSize: 36, fontWeight: 700, mt: 2 }} align="center">
        Messages
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        p: 1,
        m: 1,
        width: '100%' }}
      >
        <Button variant="text" sx={{ color: '#6E4FE2' }} onClick={() => { Router.push('/friends'); }}>Friends</Button>
        <Button variant="text" sx={{ color: '#6E4FE2' }} onClick={() => { Router.push('/messages'); }}>Messages</Button>
      </Box>
      <List>
        { friendInfo.map((friendObj) => (
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
  );
}

// <ListItemText primary={friendObj.name} secondary={friendObj.lastMessage} />
