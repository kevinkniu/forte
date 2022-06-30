import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, TextField, InputAdornment, ListItemAvatar, ListItemText, Avatar, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import { collection, getFirestore, where, orderBy, query, onSnapshot } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { db, app } from '../../firebase';
import BottomNav from '../components/BottomNav';

const socket = io.connect('http://localhost:3001');
export default function Chats() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [messageRecieved, setMessageReceived] = useState('');
  const [load, setLoad] = useState(false);

  const router = useRouter();

  const roomLink = db.collection('rooms').where(firebase.firestore.FieldPath.documentId(), '==', router.query.id);
  const messageStream = onSnapshot(roomLink, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log('messageStream:', doc);
    });
  });

  socket.on('connect', () => {
    console.log('Successfully connected!');
  });

  const handlePost = async () => {
    await socket.emit('send_message', { message, room, sessionObj });
    setLoad(!load);
    setMessage('');
  };

  useEffect(() => {
    setRoom(router.query.id);
    socket.emit('join_room', room);
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
      // console.log(data.message, 'this is the message from socketIO');
    });
    axios.get(`/api/messages/getAllMessages?roomId=${router.query.id}`)
      .then((results) => {
        // console.log(results.data, 'these should be all the messages in an array');
        setAllMessages(results.data[0]._delegate._document.data.value.mapValue.fields.messages.arrayValue.values);
      })
      .catch((err) => console.log(err));
  }, [load, messageRecieved, room]);

  // console.log('These are our messages', allMessages);

  const renderMessages = (messagesArray) => (
    messagesArray.map((item) => {
      const { userName, userProfilePic, userSpotifyId, timestamp } = item.mapValue.fields;
      const userMessage = item.mapValue.fields.message;

      if (userSpotifyId === sessionObj.id) {
        return (
          <ListItem alignItems="flex-end" sx={{ bgcolor: '#673ab7' }}>
            <ListItemText primary={userMessage.stringValue} />
            <ListItemAvatar>
              <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 25, height: 25 }} />
            </ListItemAvatar>
          </ListItem>
        );
      }

      return (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 25, height: 25 }} />
          </ListItemAvatar>
          <ListItemText primary={userMessage.stringValue} />
        </ListItem>
      );
    })
  );

  return (
    <ChatContainer>
      <h1 align="center">
        chats
      </h1>
      <div>
        {messageStream}
      </div>
      <Button variant="contained" size="small" onClick={() => { Router.push('/messages'); }}>go back to messages</Button>
      <MessagesContainer>
        {/* <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        /> */}
        <TextField
          id="input-with-icon-textfield"
          label="Message..."
          variant="filled"
          multiline={true}
          fullWidth={true}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="end">
          //       <Button onClick={handlePost} variant="contained" endIcon={<SendIcon />}>
          //         Send
          //       </Button>
          //     </InputAdornment>
          //   ),
          // }}
        />
        <Button onClick={handlePost} variant="contained" size="small" endIcon={<SendIcon />}>
          Send
        </Button>
      </MessagesContainer>
      {/* {!allMessages.length ? renderMessages(allMessages) : <b>loading messages</b>} */}
      <List sx={{ width: '100%' }}>
        {renderMessages(allMessages)}
      </List>
      <BottomNav />
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  border: 1px solid blue;
  overflow: scroll;
`;

const MessagesContainer = styled.div`
  border: 1px solid green;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  border 1px solid red;
`;
