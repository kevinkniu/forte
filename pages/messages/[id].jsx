import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import { Box, Typography, IconButton, TextField, InputAdornment, ListItemAvatar, ListItemText, Avatar, List, ListItem } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SendIcon from '@mui/icons-material/Send';
import { io } from 'socket.io-client';
import BottomNav from '../components/BottomNav';

const socket = io.connect('http://localhost:3001');
export default function Chats() {
  const { data: getSession } = useSession();
  const sessionObj = getSession?.user;
  const [room, setRoom] = useState('');
  const [friend, setFriend] = useState({});
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [messageRecieved, setMessageReceived] = useState('');
  const [load, setLoad] = useState(false);

  const [scrollToBottom, setScrollToBottom] = useState(null);
  const [pageBottom, setPageBottom] = useState(null);

  const router = useRouter();

  socket.on('connect', () => {
    console.log('Successfully connected!');
  });

  const handlePost = async () => {
    if (message.length >= 1) {
      await socket.emit('send_message', { message, room, sessionObj });
      setLoad(!load);
      setMessage('');
    }
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

        setAllMessages(results.data[0]
          ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values);
        const usersArray = results.data[0]
          ._delegate._document.data.value.mapValue.fields.users.arrayValue.values;
        usersArray.forEach((user) => {
          const currUser = user.mapValue.fields;

          if (currUser.id.stringValue !== sessionObj.id) {
            setFriend(currUser);
          }
        });

        setScrollToBottom(document.querySelector('#scroll-to-bottom'))
        setPageBottom(document.querySelector(`#index-${results.data[0]
          ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values.length - 1}`))
      })
      .catch((err) => console.log(err));
  }, [load, messageRecieved, room]);

  const renderMessages = (messagesArray) => (
    messagesArray.map((item, index) => {
      const { userName, userProfilePic, userSpotifyId, timestamp } = item.mapValue.fields;
      const userMessage = item.mapValue.fields.message;

      if (pageBottom) {
        pageBottom.scrollIntoView();
      }

      if (userSpotifyId.stringValue === sessionObj.id) {
        return (
          <Box key={index} id={'index-' + index} sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <ListItem sx={{ width: 'auto' }}>
              <ListItemText primary={userMessage.stringValue} sx={{ color: '#FFF', bgcolor: '#673ab7', borderRadius: 16, padding: 1.5 }} />
              <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 40, height: 40 }} />
              </ListItemAvatar>
            </ListItem>
          </Box>
        );
      }

      return (
        <Box key={index} id={'index-' + index} sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <ListItem sx={{ width: 'auto' }}>
            <ListItemAvatar sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar src={userProfilePic.stringValue} alt="" sx={{ width: 40, height: 40 }} />
            </ListItemAvatar>
            <ListItemText primary={userMessage.stringValue} sx={{ bgcolor: '#E8E8E8', width: '80%', borderRadius: 16, padding: 1.5 }} />
          </ListItem>
        </Box>
      );
    })
  );

  if (scrollToBottom && pageBottom) {
    scrollToBottom.addEventListener('click', function() {
      pageBottom.scrollIntoView()
    });
  }

  return (
    <div>
      <Box position="static" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 2, boxShadow: 2, scrollBehavior: 'smooth' }}>
        <IconButton sx={{ flexGrow: 1 }}>
          <ArrowBackIosNewIcon onClick={() => { Router.push('/messages'); }} />
        </IconButton>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Avatar src={friend.image ? friend.image.stringValue : null} alt="" sx={{ width: 40, height: 40, marginRight: 1.75 }} />
          <Typography sx={{ fontWeight: 'bold' }}>{friend.name ? friend.name.stringValue : null }</Typography>
        </Box>
        <IconButton sx={{ flexGrow: 1 }}>
          <ArrowBackIosNewIcon sx={{ visibility: 'hidden' }} />
        </IconButton>
      </Box>
      <Box>
        <List sx={{ height: '78.5vh', width: '100%', overflow: 'auto' }}>
          {renderMessages(allMessages)}
        </List>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 55, width: '100%', bg: '#FFF' }}>
        <TextField
          id="input-with-icon-textfield"
          label="Message..."
          variant="filled"
          multiline={true}
          maxRows={1}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePost} sx={{ lineHeight: 0, mb: 2.5 }}>
                  <SendIcon id="scroll-to-bottom" />
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
        />
      </Box>
      <BottomNav />
    </div>
  );
}
