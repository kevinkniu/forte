import { useSession } from 'next-auth/react';
import { useState, useEffect, useContext } from 'react';
import { Button, Avatar, List, ListItem, Box, ListItemAvatar, ListItemText } from '@mui/material';
import Router from 'next/router';
import axios from 'axios';
import getRoomId from '../../utils/getRoomId';
import BottomNav from '../components/BottomNav';
import { AppContext } from '../_app';

export default function Messages() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const [chatRooms, setChatRooms] = useState([]);
  const [friendInfo, setFriendInfo] = useState([]);

  // async function reRenderUser() {
  //   const response = await fetch(`/api/users/${sessionObj.id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //   });
  //   const result = await response.json();
  //   const user = result[0]._delegate._document.data.value.mapValue.fields;
  //   setCurrentUser(user);
  // }
  // useEffect(() => {
  //   if (status !== 'authenticated') {
  //     return;
  //   }
  //   reRenderUser();
  // }, [status]);

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
        setChatRooms(filtered);
        const tempInfo = [];
        const tempPromise = [];
        filtered.forEach(async (friend) => {
          const { id, name, image, roomId } = friend._delegate._document.data.value.mapValue.fields;
          const result = axios.get(`/api/messages/getAllMessages?roomId=${roomId.stringValue}`);
          tempPromise.push(result);
          await Promise.all(tempPromise)
            .then((resultData) => {
              const lastMessageObj = { ...resultData[0].data[0]
                ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values.pop() };
              const lastMessage = lastMessageObj.mapValue
                ? lastMessageObj.mapValue.fields.message.stringValue : null;
              tempInfo.push({
                id: id.stringValue,
                name: name.stringValue,
                image: image.stringValue,
                lastMessage,
              });
            });
          setFriendInfo([...tempInfo]);
        });
        // setRendered((test) => test + 1);
      })
      .catch((err) => console.log(err));
  }, [status]);

  // useEffect(() => {
  //   // setChanged(true);
  // }, [friendInfo, chatRooms, currentUser, rendered]);

  const routeToFriendMessage = async (friend) => {
    // console.log(friend);
    const roomId = await getRoomId(sessionObj, friend);
    Router.push(`/messages/${roomId}`);
  };
  return (
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
