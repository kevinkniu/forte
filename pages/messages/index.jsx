import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import BottomNav from '../components/BottomNav';

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

export default function Messages() {
  const { getSession } = useSession();
  const sessionObj = getSession?.user;

  const renderFriends = (friendsArray) => (
    friendsArray.map((friend) => (
      <FriendsContainer key={friend.id} onClick={() => Router.push(`/messages/${friend.name.toLowerCase().replace(/ /g, '-')}/${friend.id}`)}>
        <PhotoContainer>
          <ProfilePhoto src={friend.profPic} alt="" />
        </PhotoContainer>
        <ProfileDetails>
          <Username>{friend.name}</Username>
          <Message>Message</Message>
        </ProfileDetails>
      </FriendsContainer>
    ))
  );

  return (
    <div>
      <h1 align="center">
        Messages
      </h1>
      <button type="button" onClick={() => { Router.push('/friends'); }}>Friends</button>
      <button type="button">Messages</button>
      {renderFriends(dummydata)}
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

const ProfilePhoto = styled.img`
height: 5rem;
width: 5rem;
border-radius: 50%;
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
