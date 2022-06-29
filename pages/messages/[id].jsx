import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button, TextField, InputAdornment, Avatar, List, ListItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
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
  }, [load, messageRecieved, socket, room]);

  // console.log('These are our messages', allMessages);

  const renderMessages = (messagesArray) => (
    messagesArray.map((item) => {
      const { userName, userProfilePic, userSpotifyId, timestamp } = item.mapValue.fields;
      const userMessage = item.mapValue.fields.message;
      // console.log('MESSAGE OBJ', { userName, userProfilePic, userSpotifyId, userMessage, timestamp });

      return (
        <div>
          <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 75, height: 75 }} />
          <p>{userMessage.stringValue}</p>
        </div>
      );
    })
  );

  return (
    <ChatContainer>
      <h1 align="center">
        chats
      </h1>
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
      {renderMessages(allMessages)}
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
