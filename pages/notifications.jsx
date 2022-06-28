import Head from 'next/head';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState, useEffect, useContext } from 'react';
import { AppBar, Box, Toolbar, Typography, Grid, Badge, Button, Avatar } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EventIcon from '@mui/icons-material/Event';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Router from 'next/router';
import BottomNav from './components/BottomNav';
import { AppContext } from './_app';
import FriendRequest from './components/FriendRequest';

export default function Notifications() {
  const { data: getSession, status } = useSession();
  const sessionObj = getSession?.user;
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const [view, setView] = useState('friends');

  const initializeUser = async () => {
    const response = await fetch(`/api/users/${sessionObj?.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    const user = result[0]._delegate._document.data.value.mapValue.fields;
    setCurrentUser(user);
  };

  useEffect(() => {
    if (!currentUser) {
      if (status !== 'authenticated') {
        return;
      }
      initializeUser();
    }
  }, [status]);

  return (
    <div>
      <Box>
        <AppBar position="static" sx={{ bgcolor: '#673ab7' }}>
          <Toolbar>
            <Grid container justifyContent="flex-start">
              <ArrowBackIosNewIcon color="inherit" sx={{ mx: 1 }} onClick={() => { Router.push('/home'); }} />
            </Grid>
            <Grid container justifyContent="flex-end">
              <Badge badgeContent={currentUser && currentUser.friendRequests.arrayValue.values.length} color="primary" sx={{ mx: 2 }}>
                <PersonAddIcon color="inherit" onClick={() => { setView('friends'); }} />
              </Badge>
              <Badge badgeContent={currentUser && currentUser.eventRequests.arrayValue.values.length} color="primary" sx={{ mx: 2 }}>
                <EventIcon color="inherit" onClick={() => { setView('events'); }} />
              </Badge>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Box sx={{ mb: 8 }}>
          {view === 'friends' && (
            currentUser?.friendRequests.arrayValue.values.length > 0
              ? currentUser?.friendRequests.arrayValue.values.map((request, number) => (
                <div key={number}>
                  <FriendRequest request={request} />
                </div>
              ))
              : 'No Friend Requests.'
          )}
          {view === 'events' && (
            currentUser?.eventRequests.arrayValue.values.length > 0
              ? currentUser?.eventRequests.arrayValue.values.map((request, number) => (
                <div key={number}>
                  <div>
                    An Event Request.
                  </div>
                </div>
              ))
              : 'No Event Requests.'
          )}
        </Box>
      </main>
      <BottomNav />
    </div>
  );
}
