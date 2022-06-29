import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
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
  const [allMessages, setAllMessages] = useState('');
  const [messageRecieved, setMessageReceived] = useState('');

  const router = useRouter();

  socket.on('connect', () => {
    console.log('Successfully connected!');
  });

  const handlePost = () => {
    socket.emit('send_message', { message, room, sessionObj });
  };

  useEffect(() => {
    setRoom(router.query.id);
    socket.emit('join_room', room);
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket, room]);

  useEffect(() => {
    const getAllMessagesFromChat = async () => {
      const response = await fetch(`/api/messages/getAllMessages/${room}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();
      setAllMessages(result);
    };
  }, [allMessages]);

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
      {allMessages ? allMessages.map((item) => (
        <p>{item.message}</p>
      )) : null}
      <p>{messageRecieved}</p>
      <BottomNav />
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  border: 1px solid blue;
`;

const MessagesContainer = styled.div`
  border: 1px solid green;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  border 1px solid red;
`;
