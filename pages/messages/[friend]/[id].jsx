import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import BottomNav from '../../components/BottomNav';

const socket = io.connect('http://localhost:3001');
export default function Chats() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messageRecieved, setMessageReceived] = useState('');

  const router = useRouter();

  socket.on('connect', () => {
    console.log('Successfully connected!');
  });

  const handlepost = () => {
    socket.emit('send_message', { message, room });
  };

  useEffect(() => {
    setRoom(router.query.id);
    socket.emit('join_room', room);
    socket.on('receive_message', (data) => {
      setMessageReceived(data.message);
    });
  }, [socket, room]);

  return (
    <ChatContainer>
      <h1 align="center">
        chats
      </h1>
      <button type="button" onClick={() => { Router.push('/messages'); }}>go back to messages</button>
      <MessagesContainer>
        <input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="button" onClick={handlepost}>Send Message</button>
      </MessagesContainer>
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
