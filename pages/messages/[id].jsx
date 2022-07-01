import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Typography, IconButton, Button, TextField, InputAdornment, ListItemAvatar, ListItemText, Avatar, List, ListItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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
  }, [load, messageRecieved, room]);

  // console.log('These are our messages', allMessages);

  const renderMessages = (messagesArray) => (
    messagesArray.map((item) => {
      const { userName, userProfilePic, userSpotifyId, timestamp } = item.mapValue.fields;
      const userMessage = item.mapValue.fields.message;

      if (userSpotifyId.stringValue === sessionObj.id) {
        return (
          <ListItem sx={{ display: 'flex', justifyContent: 'flex-end', color: '#FFF', bgcolor: '#673ab7', width: '80%', borderRadius: 16, margin: 1.75 }}>
            <ListItemText primary={userMessage.stringValue} />
            <ListItemAvatar>
              <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 25, height: 25 }} />
            </ListItemAvatar>
          </ListItem>
        );
      }

      return (
        <ListItem alignItems="center" sx={{ bgcolor: '#E8E8E8', width: '80%', borderRadius: 16, margin: 1.75 }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton sx={{ position: 'relative', left: -100 }}>
          <ArrowBackIosNewIcon onClick={() => { Router.push('/messages'); }} />
        </IconButton>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={sessionObj.image} alt="" sx={{ width: 25, height: 25 }} />
          <Typography sx={{ fontWeight: 'bold' }}>{sessionObj.name}</Typography>
        </Box>
      </Box>
      <Box sx={{ overflow: 'scroll' }}>
        <List sx={{ width: '100%' }}>
          {renderMessages(allMessages)}
        </List>
      </Box>
      <MessagesContainer>
        <TextField
          id="input-with-icon-textfield"
          label="Message..."
          variant="filled"
          multiline={true}
          fullWidth={true}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <Button onClick={handlePost} variant="contained" size="small" endIcon={<SendIcon />} sx={{ mb: 8 }}>
          Send
        </Button>
      </MessagesContainer>
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


{/* <Grid container>
        <Grid item xs={6}>
          <IconButton>
            <ArrowBackIosNewIcon onClick={() => { Router.push('/messages'); }} />
          </IconButton>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Avatar src={sessionObj.image} alt="" sx={{ width: 25, height: 25 }} />
          <Typography sx={{ fontWeight: 'bold' }}>{sessionObj.name}</Typography>
        </Grid>
      </Grid> */}
