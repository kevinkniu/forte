import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Button, Avatar, List, ListItem, Box } from '@mui/material';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import getRoomId from '../../utils/getRoomId';
import BottomNav from '../components/BottomNav';

export default function Messages() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const [chatRooms, setChatRooms] = useState([]);
  const [renderRooms, setRenderRooms] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [userRoomId, setUserRoomId] = useState('');
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
    setLoaded(true);
  }, [status]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }
    axios.get(`/api/messages/getAllChatRooms?spotifyId=${sessionObj.id}`)
      .then((rooms) => {
        // console.log('THESE ARE THE ROOMSS FROM USEEFFECT', rooms.data);
        const filtered = rooms.data.filter((room) => {
          // console.log(Object.keys(room._delegate._document.data.value.mapValue.fields).length, 'this is the delegate');
          if (Object.keys(room._delegate._document.data.value.mapValue.fields).length === 0) {
            return false;
          }
          return true;
        });
        // console.log(filtered, 'these are the roomdata and we need to filter these');
        setChatRooms(filtered);
        setRenderRooms((results) => results + 1);
      })
      .catch((err) => console.log(err));
  }, [status]);

  useEffect(() => {
    // console.log('THESE ARE OUR CHATROOMS', chatRooms);
  }, [chatRooms, renderRooms]);

  const routeToFriendMessage = async (friend) => {
    console.log(friend);
    const roomId = await getRoomId(sessionObj, friend);
    Router.push(`/messages/${roomId}`);
  };

  // const getLastMessage = async (roomId, sessionObj, friend) => {
  //   const userRoom = await getRoomId(sessionObj, friend);
  //   setUserRoomId(userRoom);
  //   if (!userRoom) {
  //     axios.get(`/api/messages/getAllMessages?roomId=${userRoom}`)
  //       .then((results) => {
  //         console.log(results.data, 'these should be all the messages in an array');
  //         setAllMessages(results.data[0]
  //           ._delegate._document.data.value.mapValue.fields.messages.arrayValue.values);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const renderFriends = (friendsArray) => (
    friendsArray.map((friend) => {
      const { id, name, image, roomId } = friend._delegate._document.data.value.mapValue.fields;
      const friendObj = {
        id: id.stringValue,
        name: name.stringValue,
        image: image.stringValue,
      };
      // getLastMessage(roomId, sessionObj, friend);
      return (
        <ListItem key={friend.id} onClick={() => routeToFriendMessage(friendObj)}>
          <PhotoContainer>
            <Avatar src={image.stringValue} alt="" sx={{ width: 75, height: 75 }} />
          </PhotoContainer>
          <ProfileDetails>
            <Username>{name.stringValue}</Username>
            <Message>Message</Message>
          </ProfileDetails>
        </ListItem>
      );
    })
  );

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
          <Button variant="text">Friends</Button>
          <Button variant="text" onClick={() => { Router.push('/messages'); }}>Messages</Button>
        </Box>
        <List>
          {renderFriends(chatRooms)}
          {/* {renderFriends(dummydata)} */}
        </List>
        <BottomNav />
      </div>
    )
  );
}

const FriendsContainer = styled.div`
  display: flex;
  margin: 1rem;
`;

const PhotoContainer = styled.div`
margin-right: 1rem;
`;

const ProfileDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Username = styled.p`
  margin: 0;
  font-weight: bold;
`;

const Message = styled.p`
  margin: 0;
`;
