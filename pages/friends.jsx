import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { Button, Avatar } from '@mui/material';
import styled from 'styled-components';
import Router from 'next/router';
import { AppContext } from './_app';
import BottomNav from './components/BottomNav';

const dummydata = [
  {
    id: '22paoydtvhtdv6w2xfoziovby',
    name: 'Esmy Xu',
    profPic: 'https://i.scdn.co/image/ab6775700000ee85a892735df8a1324f906d7a34',
  },
  {
    id: 'o001k7jmdq3wdg3hklndxjotq',
    name: 'Andy Luu',
    profPic: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.6435-1/42317090_2330550456971517_4823046255326265344_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=0c64ff&_nc_ohc=MzkhNOjHUVQAX8vbFA8&_nc_ht=scontent-iad3-1.xx&edm=AP4hL3IEAAAA&oh=00_AT80ipfo_KZcpuRhnSFtIp41iYU5z16alzCAH3hFXDjKwg&oe=62DC19A7',
  },
  {
    id: 'resowner92',
    name: 'Neil Johnson',
    profPic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=1485456691670202&height=300&width=300&ext=1658766891&hash=AeSq3Duc6nWchK4KAUg',
  },
];

export default function Friends() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const [friends, setFriends] = useState([]);
  const { setValue, currentUser, setCurrentUser } = useContext(AppContext);

  const initializeFriends = async () => {
    setValue(1);
    const response = await fetch(`/api/users/${sessionObj?.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    const user = result[0]._delegate._document.data.value.mapValue.fields;
    setCurrentUser(user);
    setFriends(result[0]._delegate._document.data.value.mapValue.fields.friends.arrayValue.values);
  };

  useEffect(() => {
    if (!currentUser) {
      if (status !== 'authenticated') {
        return;
      }
      initializeFriends();
    } else {
      setFriends(currentUser.friends.arrayValue.values);
    }
  }, [status]);
  console.log(currentUser);

  const renderFriends = (friendsArray) => (
    friendsArray.map((friend) => {
      axios.get(`/api/friends/getFriends?id=${friend.stringValue}`)
        .then((results) => {
          console.log('the gangs all here', results);
        })
        .catch((err) => console.log(err));
      return (<div>hello</div>);
      // <FriendsContainer key={friend.id}>
      //   <PhotoContainer>
      //     <Avatar src={friend.profPic} alt="" sx={{ width: 75, height: 75 }} />
      //   </PhotoContainer>
      //   <ProfileDetails>
      //     <Username>{friend.name}</Username>
      //     <Message>Message</Message>
      //   </ProfileDetails>
      // </FriendsContainer>
    })
  );

  return (
    <div>
      <h1 align="center">
        This is a friends page.
      </h1>
      <Button variant="contained">Friends</Button>
      <Button variant="contained" onClick={() => { Router.push('/messages'); }}>Messages</Button>
      {renderFriends(friends)}
      <BottomNav />
    </div>
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
